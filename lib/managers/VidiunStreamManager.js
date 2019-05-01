var fs = require('fs');
var os = require('os');
var util = require('util');

var id3Reader = require('../../bin/Release/TsId3Reader.node');

var vidiun = module.exports = require('../VidiunManager');
vidiun.mediaInfo = require('../media/VidiunMediaInfo');
vidiun.ffmpegParams = require('../media/VidiunFfmpegParams');
vidiun.m3u8Parser = require('../protocol/VidiunM3U8Parser');


/**
 * Stream watcher, instantiated per rendition manifest
 * Stream watcher is responsible to pull the original manifest and build a stitched manifest.
 * The manifest is saved in cache.
 * 
 * The stream watcher will also trigger filler ts preparation, as well as pre and post ad segments preparation.
 * 
 * The watcher is responsible to make sure that all the data required for the stitching of this rendition is available in cache:
 * - encoding params
 * - media info
 * - ui conf
 * - filler media
 * 
 * 
 * @param manager VidiunStreamManager
 * @param params {url, entryId, masterUrl}
 * @param finishCallback called when watching is not required anymore
 */
var VidiunStreamWatcher = function(manager, params, finishCallback){
	this.manager = manager;
	this.finishCallback = finishCallback;
	
	this.renditionId = VidiunCache.getManifestId(params.url);
	this.uiConfConfigId = params.uiConfConfigId;
	this.url = params.url;
	this.lowestBitrate = params.lowestBitrate;
	this.entryId = params.entryId;
	this.partnerId = params.partnerId;
	this.masterUrl = params.masterUrl;
	
	this.elapsedTime = {};
	this.cuePoints = {};
	this.segmentsHistoryLimit = VidiunConfig.config.cloud.segmentsHistoryLimit;
	this.segmentsHistory = {};
	this.urlTranslations = {};
	this.firstTime = true;
	this.startTime = new Date().getTime();
	this.trackerRequired = false;
	this.firstManifestSegment = 0;
	this.latency = 0;	
	this.watcherId = VidiunUtils.getUniqueId();
	this.uiConfConfig = {};
	this.encodingId = null;
	this.cuePoint = null;
	this.maxSegmentDuration = 0;
	
	//memcache keys
	this.renditionManifestContentKey = VidiunCache.getKey(VidiunCache.MANIFEST_CONTENT_KEY_PREFIX, [this.renditionId, this.uiConfConfigId]);
	this.entryRequiredKey = VidiunCache.getKey(VidiunCache.ENTRY_REQUIRED_KEY_PREFIX, [this.entryId]);
	this.renditionManifestHandledKey = VidiunCache.getKey(VidiunCache.RENDITION_MANIFEST_HANDLED_KEY_PREFIX, [this.renditionId, this.uiConfConfigId]);
	this.cuePointsKey = VidiunCache.getKey(VidiunCache.ENTRY_CUE_POINTS_KEY_PREFIX, [this.entryId]);
	this.elapsedTimeKey = VidiunCache.getKey(VidiunCache.ENTRY_ELAPSED_TIME_KEY_PREFIX, [this.entryId]);
	this.oldestSegmentTimeKey = VidiunCache.getKey(VidiunCache.OLDEST_SEGMENT_TIME_KEY_PREFIX, [this.entryId]);
	this.encodingParamsKey = VidiunCache.getKey(VidiunCache.ENCODING_PARAMS_KEY_PREFIX, [this.renditionId]);
	this.mediaInfoKey = VidiunCache.getKey(VidiunCache.MEDIA_INFO_KEY_PREFIX, [this.renditionId]);
	this.fillerEncodingParamsKey = VidiunCache.getKey(VidiunCache.FILLER_ENCODING_PARAMS_KEY_PREFIX, [this.renditionId, this.uiConfConfigId]);
	this.fillerMediaKey = VidiunCache.getKey(VidiunCache.FILLER_MEDIA_KEY_PREFIX, [this.renditionId, this.uiConfConfigId]);
	this.fillerHandledKey = VidiunCache.getKey(VidiunCache.FILLER_HANDLED_KEY_PREFIX, [this.renditionId, this.uiConfConfigId]);
	this.uiConfConfigKey = VidiunCache.getKey(VidiunCache.UI_CONF_CONFIG_KEY_PREFIX, [this.uiConfConfigId]);
	
	var This = this;
	
	VidiunLogger.log('init stream watcher for entry [' + this.entryId +'] rendition [' + this.renditionId + '] watcher id [' + this.watcherId + ']');
	// if the process crashed and restored, the cache key might exist although no one is watching this manifest
	if(params.restored){
		VidiunCache.get(this.uiConfConfigKey, function(data){
			if(data){
				This.uiConfConfig = data;
			}
			This.getManifest();
		});		
	}
	else{
		VidiunCache.getMulti([this.renditionManifestHandledKey, this.entryRequiredKey, this.uiConfConfigKey], function(data){
			if(!data[This.renditionManifestHandledKey]){
				if([data[This.uiConfConfigKey]]){
					This.uiConfConfig = data[This.uiConfConfigKey];
				}
				This.appendToEntryRequired(data[This.entryRequiredKey]);
				This.getManifest();
			}
		});
	}
};

VidiunStreamWatcher.MINIMUM_RUN_PERIOD = 60000;
VidiunStreamWatcher.CYCLE_INTERVAL = 2000;
	
VidiunStreamWatcher.prototype = {

	/**
	 * @type VidiunStreamManager
	 */
	manager: null,
	finishCallback: null,

	/**
	 * Check cache to see if entry still required
	 * In case the entry is required update expiration of all relevant rendition info in cache
	 */
	verifyTrackingRequired: function(){
		var This = this;

		var cacheTouchErrorCallback = function(err){
			VidiunLogger.log(err + " Cache.Touch didn't succeed - setting trackerRequired to false.");
			This.trackerRequired = false;
		};


		VidiunCache.get(this.entryRequiredKey, function(data){
			if(data && (data.indexOf(This.renditionId) != -1)){
				VidiunLogger.debug('Rendition [' + This.renditionId + '] entry [' + This.entryId + '] still required');
				This.trackerRequired = true;
				This.appendToEntryRequired(data);
				VidiunCache.touch(This.mediaInfoKey, VidiunConfig.config.cache.encodingParams, null, cacheTouchErrorCallback);
				VidiunCache.touch(This.encodingParamsKey, VidiunConfig.config.cache.encodingParams, null, cacheTouchErrorCallback);
				VidiunCache.touch(This.fillerEncodingParamsKey, VidiunConfig.config.cache.fillerMedia, null, cacheTouchErrorCallback);
				VidiunCache.touch(This.uiConfConfigKey, VidiunConfig.config.cache.fillerMedia, null, cacheTouchErrorCallback);
			}
			else{
				VidiunLogger.log('Rendition [' + This.renditionId + '] entry [' + This.entryId + '] not required any more');
				This.trackerRequired = false;
			}
		});
	},
	
	appendToEntryRequired: function(entryRequiredData){
		var This = this;
		var renditionIds = VidiunCache.extractEntryRequiredValue(entryRequiredData);
		var renditionExists = false;
		for(var i = 0; i < renditionIds.length; i++){ 
			if(renditionIds[i].trim() == this.renditionId){
				renditionExists = true;
			}
		}
		if(!renditionExists){
			var entryRequiredValue = VidiunCache.buildEntryRequiredValue(this.renditionId);
			VidiunLogger.log('Appending [' + this.renditionId + '] to entryRequired [' + this.entryRequiredKey + ']');
			VidiunCache.append(this.entryRequiredKey, entryRequiredValue, function(){
				VidiunLogger.log('Added to entry required [' + This.entryRequiredKey + '] : [' + This.renditionId + ']');
			}, function(err){
				VidiunLogger.error('Failed to append [' + This.entryRequiredKey + '] :' + err);
				VidiunCache.add(This.entryRequiredKey, entryRequiredValue, VidiunConfig.config.cache.entryRequired);
			});					
		}			
	},
	
	/**
	 * Load cue-points from cache
	 */
	loadCuePoints: function(callback){
		var This = this;
		VidiunCache.get(this.cuePointsKey, function(data){
			if(data){
				This.cuePoints = data;				
			}
			if(callback){
				callback();
			}
		}, function(err){
			if(callback){
				callback();
			}
		});
	},
	
	/**
	 * Set timestamp and offset on all the segments in segmentHistory array according to the id3 tags parsed for one of the segments in the array
	 */
	applyElapsedTimeToSegments: function(){
		if(this.elapsedTime && this.segmentsHistory[this.elapsedTime.sequence]){
			VidiunLogger.debug('[' + this.uniqueLoopId + '] Applying elapsed time to segments history for entry [' + this.entryId + '] rendition [' + this.renditionId + ']');
			var timestamp;
			var offset;
			
			timestamp = this.elapsedTime.timestamp;
			offset = this.elapsedTime.offset;
			for (var i = this.elapsedTime.sequence; this.segmentsHistory[i]; i--){
				this.segmentsHistory[i].timestamp = timestamp;
				this.segmentsHistory[i].offset = offset;
				if(this.segmentsHistory[i-1]){
					timestamp -= this.segmentsHistory[i-1].duration;
					offset -= this.segmentsHistory[i-1].duration;
				}
				else{
					VidiunLogger.debug('[' + this.uniqueLoopId + '] Segment history for index [' + (i-1) + '] is not defined setting offset/timestamp from current duration values');
					timestamp -= this.segmentsHistory[i].duration;
					offset -= this.segmentsHistory[i].duration;	
				}
			}

			timestamp = this.elapsedTime.timestamp;
			offset = this.elapsedTime.offset;
			for (var i = this.elapsedTime.sequence; this.segmentsHistory[i]; i++){
				this.segmentsHistory[i].timestamp = timestamp;
				this.segmentsHistory[i].offset = offset;
				timestamp += this.segmentsHistory[i].duration;
				offset += this.segmentsHistory[i].duration;				
			}
		}
		
		VidiunLogger.debug('[' + this.uniqueLoopId + '] Segments history ' + JSON.stringify(this.segmentsHistory));
	},
	
	/**
	 * Set segments history array
	 */
	initSegmentsHistory: function(manifest, startSegment){
		var This = this;
		var oldestSegment = null;
		var durationFromOldestSegment = 0;
		
		var currentFirstSegment = parseInt(manifest.headers['EXT-X-MEDIA-SEQUENCE']);
		VidiunLogger.debug('[' + This.uniqueLoopId + '] Last stitched firstManifestSegment: ' + this.firstManifestSegment + ' current first manifest segment: ' + currentFirstSegment);
		if(currentFirstSegment < this.firstManifestSegment && ((this.firstManifestSegment - currentFirstSegment) < manifest.segments.length)){
			VidiunLogger.log('[' + This.uniqueLoopId + '] Skipping stitch manifest for entry [' + this.entryId + '] and rendition [' + this.renditionId + ']');
			VidiunCache.touch(This.renditionManifestContentKey, VidiunConfig.config.cache.renditionManifest);
			return false;
		}
		else{
			this.firstManifestSegment = currentFirstSegment;
			if(this.adStartSegment && this.inAdSlot && (this.firstManifestSegment + manifest.segments.length < this.adStartSegment)){
				VidiunLogger.log('[' + this.uniqueLoopId + '] Re-setting inAdSlot for entry [' + this.entryId + '] and rendition [' + this.renditionId + '], firstManifestSegment ['
					+ this.firstManifestSegment + '] adStartSegment [' + this.adStartSegment + ']');
				this.inAdSlot = false;
			}
		}
		
		var lastSegmentSequence = null;
		if(manifest.segments.length > 0){						
			//set the oldest segment time in cache, cue points older than the oldest segment will
			//be deleted from cache
			oldestSegment = manifest.segments[0];
			for(var i = startSegment; i < manifest.segments.length; i++){
				lastSegmentSequence = manifest.segments[i].sequence;
				durationFromOldestSegment += manifest.segments[i].duration;
				
				//Calculate the latency based on the segments duration
				if(Math.ceil((durationFromOldestSegment/1000).toFixed(3)) < VidiunConfig.config.stream.latency)
					this.latency++;
				
				if(!this.segmentsHistory[lastSegmentSequence]){
					this.segmentsHistory[lastSegmentSequence] = manifest.segments[i];
				}				
			}
			
			for(var sequence in this.segmentsHistory){
				if(sequence < (lastSegmentSequence - this.segmentsHistoryLimit)){
					delete this.segmentsHistory[sequence];
				}
			}
		} else {
			VidiunLogger.log('[' + This.uniqueLoopId + '] No segments found, skipping stitch manifest for entry [' + this.entryId + '] and rendition [' + this.renditionId + ']');
			return false;	
		}

		this.parseSegmentWhenRequired(lastSegmentSequence, parseInt(Object.keys(this.segmentsHistory)[0]), lastSegmentSequence);
		this.applyElapsedTimeToSegments();

		if(oldestSegment && this.elapsedTime){
			var oldestSegmentTime = {
				offset: this.elapsedTime.offset - durationFromOldestSegment,
				timestamp: this.elapsedTime.timestamp - durationFromOldestSegment
			};
			VidiunLogger.log('[' + this.uniqueLoopId + '] oldestSegmentTime for entry [' + this.entryId + '] and rendition [' + this.renditionId + '] [' + JSON.stringify(oldestSegmentTime) + ']');
			VidiunCache.set(this.oldestSegmentTimeKey, oldestSegmentTime, VidiunConfig.config.cache.elapsedTime);
		}
		
		return true;
	},
	
	/**
	 * Invoke id3 tags parsing from the segment in case the current elapsed time sequence is not within segments history array
	 */
	parseSegmentWhenRequired: function(currentSequence, firstSegmentsHistorySequence, lastSegmentsHistorySequence){
		var This = this;
		if(currentSequence < firstSegmentsHistorySequence){
			return;
		}
		var elapsedTimeSet = 0;
		if(this.elapsedTime && this.elapsedTime.sequence > firstSegmentsHistorySequence && this.elapsedTime.sequence <= lastSegmentsHistorySequence ){
			elapsedTimeSet = 1;
		}
		VidiunLogger.log('[' + This.uniqueLoopId + '] Before parseSegment rendition [' + this.renditionId + '] currentSequence [' + currentSequence + '] firstSegmentsHistorySequence [' + firstSegmentsHistorySequence 
				+ ']  lastSegmentsHistorySequence [' + lastSegmentsHistorySequence + '] elapsedTime [' + JSON.stringify(This.elapsedTime) + ']' + ' elapsedTimeSet [' + elapsedTimeSet + ']');
		if(this.firstTime || !elapsedTimeSet){
			this.parseSegment(this.segmentsHistory[currentSequence], function(){
				if(This.elapsedTime && This.elapsedTime.sequence >= firstSegmentsHistorySequence && This.elapsedTime.sequence <= lastSegmentsHistorySequence ){
					return;
				}
				else{
					currentSequence--;
					This.parseSegmentWhenRequired(currentSequence, firstSegmentsHistorySequence, lastSegmentsHistorySequence);
				}
			});
		}	
	},
	
	/**
	 * Read the segments URLs, replace them with ads if needed, store the manifest to cache
	 * @param manifestContent
	 */
	stitchManifest: function(manifestContent){
		var This = this;
		VidiunLogger.log('[' + This.uniqueLoopId + '] stitchManifest: lowest bitrate = ' + this.lowestBitrate + ' for entry [' + this.entryId + '] and rendition [' + this.renditionId + '] manifest: ' + manifestContent);
		
		this.cycleStartTime = new Date().getTime();
		var newResult = [];
		var buffer = [];
		this.latency = 0;
		var preSegmentStitchParams = {};
		var postSegmentStitchParams = {};
		
		this.verifyTrackingRequired();
				
		var manifest = vidiun.m3u8Parser.parseM3U8(manifestContent, this.url);
		this.maxSegmentDuration = parseInt(manifest.headers['EXT-X-TARGETDURATION']);
		VidiunLogger.debug('[' + this.uniqueLoopId + '] Manifest after parse: ' + JSON.stringify(manifest));
		
		var startSegment = Math.max(manifest.segments.length - this.segmentsHistoryLimit , 0 );
		if(this.initSegmentsHistory(manifest, startSegment) === false
			|| !this.encodingId ){// if encoding was not defined yet by parsing the first ts, no ads could be ingested yet){
			this.keepWatching();
			return null;
		}

		this.stitchFiller();
		
		var segmentsCount = Math.min( manifest.segments.length - 1, manifest.segments.length + 1 - this.latency );		
		this.initUrlTranslations();
				
		for(var segmentIndex = 0; segmentIndex <= segmentsCount; segmentIndex++){
			VidiunLogger.debug('[' + This.uniqueLoopId + '] Segment [' + manifest.segments[segmentIndex].sequence + '] URL [' + manifest.segments[segmentIndex].url + ']');
			
			// hold a buffer of 3 segments
			buffer.push(manifest.segments[segmentIndex]);
			if(buffer.length < 3)
				continue;
			while(buffer.length > 3)
				buffer.shift();
			
			var currentSegmentUrl = buffer[0].url;
			// check whether we already mapped this buffer
			if(this.urlTranslations[currentSegmentUrl]){
				VidiunLogger.debug('[' + This.uniqueLoopId + '] Translating from urlTranslations [' + currentSegmentUrl + '] to [' + this.urlTranslations[currentSegmentUrl].url + ']');
				this.urlTranslations[currentSegmentUrl].used = true;
				newResult.push(this.urlTranslations[currentSegmentUrl]);
				continue;
			}
			
			if(segmentIndex < startSegment){
				this.resolveSegmentUrl(buffer);
				newResult.push(buffer[0]);
				continue;
			}
			
			offsetStart = this.segmentsHistory[buffer[1].sequence] ? (this.segmentsHistory[buffer[1].sequence].offset ? this.segmentsHistory[buffer[1].sequence].offset : null) : null;
			offsetEnd = offsetStart ? offsetStart + buffer[1].duration : null;
			timestampStart = this.segmentsHistory[buffer[1].sequence] ? (this.segmentsHistory[buffer[1].sequence].timestamp ? this.segmentsHistory[buffer[1].sequence].timestamp : null) : null;
			timestampEnd = timestampStart ? timestampStart + buffer[1].duration : null;
			
			VidiunLogger.log('[' + This.uniqueLoopId + '] Stitch segment [' + buffer[1].sequence + '] URL [' + currentSegmentUrl + '] offset start [' + offsetStart + 
								'] offset end [' + offsetEnd + '] timestamp start [' + timestampStart + '] timestamp end [' + timestampEnd + ']  is inAdSlot [' + this.inAdSlot + ']');

			// check whether we should start an ad
			if(!this.inAdSlot && ((offsetStart && offsetEnd) || (timestampStart && timestampEnd))){
				VidiunLogger.debug('[' + This.uniqueLoopId + '] Checking cue points ...');
				for(var cuePointId in this.cuePoints){
					if(this.checkAndInitAdStart(this.cuePoints[cuePointId], buffer, offsetStart, offsetEnd, timestampStart, timestampEnd)){
						break;
					}
				}
			}
			
			// not part of ad -> just output it
			if(!this.inAdSlot || buffer[0].sequence < this.adStartSegment){
				this.resolveSegmentUrl(buffer);
				newResult.push(buffer[0]);
				continue;
			}
					
			var curSegmentDuration = buffer[0].duration * 90;
			var nextSegmentDuration = buffer[1].duration * 90;
			
			if(this.adCurOffset == 0){
				preSegmentStitchParams = this.buildPreSegmentStitchParams(buffer);
			}
			if(this.adCurOffset + curSegmentDuration <= this.adEndOffset && this.adCurOffset + curSegmentDuration + nextSegmentDuration > this.adEndOffset){
				postSegmentStitchParams = this.buildPostSegmentStitchParams(buffer);
			}
	
			buffer[0].url = this.buildStitchedSegmentUrl(buffer, curSegmentDuration);			
			VidiunLogger.debug('[' + This.uniqueLoopId + '] Translating [' + currentSegmentUrl + '] to [' + buffer[0].url + ']');
			this.urlTranslations[currentSegmentUrl] = buffer[0];
			this.urlTranslations[currentSegmentUrl].used = true;			
			newResult.push(buffer[0]);

			if(this.adCurOffset > this.adEndOffset){
				this.inAdSlot = false;
				VidiunLogger.log('[' + This.uniqueLoopId + '] Ad finished cue-point[' + this.cuePoint.id + '] start[' + this.adStartOffset + '] end[' + this.adEndOffset + ']');
			}
			else{
				this.adCurOffset += curSegmentDuration;
				VidiunLogger.log('[' + This.uniqueLoopId + '] Cue-point [' + this.cuePoint.id + '] ad current offset [' + this.adCurOffset + ']');
			}
		}

		if (newResult.length > 0 ) {
			var newManifestContent = vidiun.m3u8Parser.buildM3U8(manifest.headers, newResult, manifest.footers);
			VidiunLogger.debug('[' + this.uniqueLoopId + '] newManifestContent: ' + newManifestContent);
			this.clearUnusedUrlTranslations();

			this.saveNewManifest(newManifestContent, [preSegmentStitchParams, postSegmentStitchParams]);
		}
	},

	/**
	 * Init urlTranslations buffer
	 * 
	 */
	initUrlTranslations: function(){
		for(var segmentUrl in this.urlTranslations){
			this.urlTranslations[segmentUrl].used = false;
		}
	},
	
	/**
	 * Delete unused segments from url translations buffer
	 * 
	 */
	clearUnusedUrlTranslations: function(){
		for(var segmentUrl in this.urlTranslations){
			if(!this.urlTranslations[segmentUrl].used){
				VidiunLogger.debug('[' + this.uniqueLoopId + '] Deleting [' + segmentUrl + '] from translations');
				delete this.urlTranslations[segmentUrl];
			}
		}
	},
	
	resolveSegmentUrl: function(buffer){
		if(!parseInt(VidiunConfig.config.stream.useCdn)){
			buffer[0].url = buffer[0].resolvedUrl;
		}
		VidiunLogger.debug('[' + this.uniqueLoopId + '] Append original segment [' + buffer[0].url + ']');
	},
	
	/**
	 * Construct ad segment URL 
	 */
	buildStitchedSegmentUrl: function(buffer, curSegmentDuration){
		var outputEnd;
		if(!parseInt(VidiunConfig.config.stream.useCdn)){
			buffer[0].url = buffer[0].resolvedUrl;
		}			
		if(this.adCurOffset > this.adEndOffset){				
			outputEnd = 0; // last segment
		}
		else{
			outputEnd = this.adCurOffset + curSegmentDuration;
		}
		var stitchSegmentParams = {
				entryId: this.entryId, 
				cuePointId: this.cuePoint.id, 
				renditionId: this.renditionId, 
				segmentIndex: buffer[0].sequence - this.adStartSegment,
				outputStart: this.adCurOffset,
				outputEnd: outputEnd,
				adStart: this.adStartOffset,
				originalUrl: buffer[0].url,
				uiConfConfigId: this.uiConfConfigId,
				cuePointDuration: this.cuePoint.duration,
				cuePointTriggeredAt: this.cuePoint.triggeredAt,
				maxSegmentDuration: this.maxSegmentDuration
			};
			
		var tokens = {sessionId: '@SESSION_ID@', sessionStartTime: '@SESSION_START_TIME@', originDc: '@ORIGIN_DC@'};			
		var url = this.manager.getPlayServerUrl('media', 'segment', this.partnerId, tokens, stitchSegmentParams);
		return url;
	},

	buildPreSegmentStitchParams: function(buffer){
		return this.buildSegmentStitchParams(buffer,
			VidiunCache.getPreSegmentId(this.cuePoint.id, this.renditionId),
			this.adStartOffset,
			'left');

	},

	buildPostSegmentStitchParams: function(buffer){
		return this.buildSegmentStitchParams(buffer,
			VidiunCache.getPostSegmentId(this.cuePoint.id, this.renditionId),
			this.adEndOffset - this.adCurOffset,
			'right');
	},

	buildSegmentStitchParams: function(buffer, segmentId, offset, portion){
		var segmentStitchParams = {
			buffer: [buffer[0].resolvedUrl, buffer[1].resolvedUrl, buffer[2].resolvedUrl]	
		};
		segmentStitchParams.segmentId = segmentId;
		segmentStitchParams.offset = offset;
		segmentStitchParams.portion = portion;
		return segmentStitchParams;
	},
	
	/**
	 * Check if cue point should start in the given segments buffer
	 * 
	 * @param cuePoint
	 * @param buffer
	 * @param offsetStart
	 * @param offsetEnd
	 * @param timestampStart
	 * @param timestampEnd
	 */
	checkAndInitAdStart: function(cuePoint, buffer, offsetStart, offsetEnd, timestampStart, timestampEnd){
		VidiunLogger.log('[' + this.uniqueLoopId + '] Checking cue point for partner [' + this.partnerId + '] entry [' + this.entryId + '] cuePoint [' + cuePoint.id + '] startTime [' + cuePoint.startTime + '] triggeredAt [' + cuePoint.triggeredAt + ']');
		// ad starts in first segment
		if( (cuePoint.startTime && offsetStart <= cuePoint.startTime && cuePoint.startTime <= offsetEnd) ||
			(cuePoint.triggeredAt && timestampStart <= cuePoint.triggeredAt*1000 && cuePoint.triggeredAt*1000 <= timestampEnd)){
			this.inAdSlot = true;
			this.cuePoint = cuePoint;
			if(cuePoint.startTime)
				this.adStartOffset = (cuePoint.startTime - offsetStart + buffer[0].duration) * 90;
			else
				this.adStartOffset = (cuePoint.triggeredAt*1000 - timestampStart + buffer[0].duration) * 90;
			this.adEndOffset = this.adStartOffset + cuePoint.duration * 90; 
			this.adCurOffset = 0;
			this.adStartSegment = buffer[0].sequence;
				
			VidiunLogger.log('[' + this.uniqueLoopId + '] Ad started cue-point [' + cuePoint.id + '] rendition [' + this.renditionId + '] start [' + this.adStartOffset + '] end [' + this.adEndOffset 
					+ '] partner [' + this.partnerId + '] entry [' + this.entryId + '] adCurOffset [' + this.adCurOffset + '] adStartSegment [' + this.adStartSegment +']');
			return true;
		}
		
		return false;
	
	},
	
	/**
	 * Save manifest to cache after pre/post segments are ready
	 */
	saveNewManifest: function(newManifestContent, prePostSegments){
		var This = this;
		var stitchingSegmentsCount = 0;
		
		for(var i=0; i<prePostSegments.length; i++ ){
			if(prePostSegments[i].segmentId){
				stitchingSegmentsCount++;
				VidiunLogger.debug('[' + This.uniqueLoopId + '] Stitching ' + prePostSegments[i].portion + ' segment for segment id [' + prePostSegments[i].segmentId +'] stitchingSegmentsCount [' + stitchingSegmentsCount + ']' );
				this.stitchSegment(prePostSegments[i].buffer, prePostSegments[i].segmentId, prePostSegments[i].offset, prePostSegments[i].portion, function(data){
					stitchingSegmentsCount--;
					VidiunLogger.debug('[' + This.uniqueLoopId + '] Done stitching segment, stitchingSegmentsCount [' + stitchingSegmentsCount + ']' );
					if(newManifestContent && !stitchingSegmentsCount){
						VidiunLogger.log('[' + This.uniqueLoopId + '] Setting ads manifest content for entry [' + This.entryId + '] callback after stitchSegment');
						VidiunCache.set(This.renditionManifestContentKey, newManifestContent, VidiunConfig.config.cache.renditionManifest);		
						This.keepWatching();
					}	
				});				
			}
		}
		
		// build the final manifest		
		if(newManifestContent && !stitchingSegmentsCount){
			VidiunLogger.log('[' + This.uniqueLoopId + '] Setting ads manifest content for entry [' + This.entryId + ']');
			VidiunCache.set(This.renditionManifestContentKey, newManifestContent, VidiunConfig.config.cache.renditionManifest);
			This.keepWatching();
		}							
	},
	
	/**
	 * Trigger filler segment stitching
	 * 
	 * @param segments
	 * @param segmentId
	 * @param offset
	 * @param portion
	 */
	stitchFiller: function(){
		var This = this;
		VidiunCache.touch(this.fillerMediaKey, VidiunConfig.config.cache.fillerMedia, function(){
			VidiunLogger.debug('Filler media [' + This.renditionId + '] already stitched');
			VidiunCache.touch(This.fillerEncodingParamsKey, VidiunConfig.config.cache.fillerMedia);
		}, function(err){
			VidiunCache.add(This.fillerHandledKey, true, VidiunConfig.config.cache.fileDownloadTimeout, function(){
				VidiunLogger.log('Stitching filler media [' + This.renditionId + '] filler [' + This.uiConfConfig.slateContent +']');
				var stitchFillerParams = {
						renditionId: This.renditionId, 
						uiConfConfigId: This.uiConfConfigId,
						slateContent: This.uiConfConfig.slateContent};
				This.manager.callPlayServerService('segment', 'stitchFiller', This.partnerId, stitchFillerParams);
			}, function (err) {
				VidiunLogger.debug('Filler media [' + This.renditionId + '] already handled');
			});
		});
	},
	
	
	/**
	 * Trigger segment stitching
	 * 
	 * @param segments
	 * @param segmentId
	 * @param offset
	 * @param portion
	 */
	stitchSegment: function(segments, segmentId, offset, portion, callback){
		var segmentParams = {
			segmentId: segmentId,
			url1: segments[0],
			url2: segments[1],
			url3: segments[2],
			offset: offset, 
			portion: portion
		};
		this.manager.callPlayServerService('segment', 'stitch', this.partnerId, segmentParams, null, callback);
	},

	
	/**
	 * Trigger the next manifest watch, in few seconds
	 */
	keepWatching: function(){
		if(!this.manager.run){
			return;
		}

		// sleep until next cycle
		var curTime = new Date().getTime();
		var sleepTime = Math.max(0, this.cycleStartTime + VidiunStreamWatcher.CYCLE_INTERVAL - curTime);
		var This = this;
		setTimeout(function(){
			This.getManifest();
		}, sleepTime);
	},
	
	/**
	 * Fetch the manifest from the cdn and call the manifest handler
	 */
	getManifest: function(){
		this.uniqueLoopId = VidiunUtils.getUniqueId();
		VidiunLogger.log('[' + this.uniqueLoopId + '] getting manifest for [' + this.entryId + '] rendition [' + this.renditionId + '] watcher id [' + this.watcherId + '] uiconf [' + this.uiConfConfigId + ']');
		VidiunCache.set(this.renditionManifestHandledKey, true, VidiunConfig.config.cache.watcherHandled);
		
		//verify if entry is still required
		this.verifyTrackingRequired();

		if(new Date().getTime() > (this.startTime + VidiunStreamWatcher.MINIMUM_RUN_PERIOD) && !this.trackerRequired){
			this.removeRenditionFromCache();
			VidiunLogger.log('Done ' + this.entryId);
			if(this.finishCallback && typeof this.finishCallback === 'function'){
				this.finishCallback();
			}
			return;
		}

		var This = this;
		VidiunUtils.getHttpUrl(this.url, null, function(manifestContent){
			VidiunLogger.log('[' + This.uniqueLoopId + '] Manifest fetched [' + This.entryId + '] [' + This.url + ']');
			
			This.loadCuePoints(function(){
				VidiunLogger.log('[' + This.uniqueLoopId + '] Stitch manifest [' + This.entryId + '] rendition [' + This.renditionId + '] elapsedTime [' + JSON.stringify(This.elapsedTime) + ']');
				This.stitchManifest(manifestContent);
			});
		}, function(err){
			VidiunLogger.error('[' + This.uniqueLoopId + '] Failed to fetch manifest [' + This.url + ']: ' + err );
			if(new Date().getTime() < (This.startTime + VidiunStreamWatcher.MINIMUM_RUN_PERIOD)){
				This.keepWatching();
			} else {
				VidiunLogger.log('[' + This.uniqueLoopId + '] time: ' + new Date().getTime() + ' mimmum threshhold : ' + (This.startTime + VidiunStreamWatcher.MINIMUM_RUN_PERIOD));
				This.removeRenditionFromCache();
				if (This.finishCallback && typeof This.finishCallback === 'function') {
					VidiunLogger.log('After deleting rendition :' + This.renditionManifestHandledKey + ' finish callback was valid');
					This.finishCallback();
				}
			}
		});
	},

	removeRenditionFromCache: function(){
		VidiunLogger.log('[' + this.uniqueLoopId + '] Deleting all relevant keys form cache for rendition :' + this.renditionId);
		VidiunCache.del(this.renditionManifestContentKey);
		VidiunCache.del(this.renditionManifestHandledKey);
		VidiunCache.del(this.encodingParamsKey);
		VidiunCache.del(this.mediaInfoKey);
		VidiunCache.del(this.fillerEncodingParamsKey);
		VidiunCache.del(this.fillerMediaKey);
		VidiunCache.del(this.fillerHandledKey);
		VidiunCache.removeRenditionIdFromEntryRequiredValue(this.entryRequiredKey, this.renditionId);
	},

	/**
	 * Fetch the segment from the cdn an parse its metadata
	 */
	parseSegment: function(segment, callback){		
		VidiunLogger.log('[' + this.uniqueLoopId + '] Parse segment entry [' + this.entryId + '] rendition [' + this.renditionId +'] segment [' + segment.sequence + '] url [' + segment.resolvedUrl + ']');
		
		var This = this;
		VidiunUtils.downloadHttpUrlForce(segment.resolvedUrl, true, this.firstTime, function(buffers, localPath){
			if(This.firstTime){
				This.parseEncodingParams(localPath);
				This.firstTime = false;
			}
			
			This.parseId3Tags(This.entryId, segment, Buffer.concat(buffers));
			if(callback){
				callback();
			}			
		}, function(err){
			VidiunLogger.error('[' + This.uniqueLoopId + '] Error in parse segment entry [' + this.entryId + '] segment [' + segment.sequence + '] url [' + segment.resolvedUrl + ']: ' + err);
		});
	},

	/**
	 * Build encoding params based on the first segment
	 * @param localPath
	 */
	parseEncodingParams: function(localPath){
		var This = this;
		
		if(VidiunConfig.config.bin && VidiunConfig.config.bin.mediaInfoPath){
			vidiun.mediaInfo.bin = VidiunConfig.config.bin.mediaInfoPath;
		}
		
		vidiun.mediaInfo.parse(localPath, function(mediaInfo){

			encodingParams = vidiun.ffmpegParams.buildEncodingParams(mediaInfo, false, false);
			var fillerEncodingParams = null;
			if(This.uiConfConfig.slateContent){
				fillerEncodingParams = encodingParams;
			}
			else{
				blackEncodingParams = vidiun.ffmpegParams.buildBlackInputParams(mediaInfo);
				fillerEncodingParams = blackEncodingParams + ' ' + encodingParams;
			}
			
			This.encodingId = VidiunCache.getEncodingId(encodingParams);
			VidiunLogger.debug('[' + This.uniqueLoopId + '] Encoding params for rendition [' + This.renditionId + '] and encodingId [ ' + This.encodingId + '] from file [' + localPath + ']: ' + encodingParams);
			
			VidiunCache.set(This.mediaInfoKey, mediaInfo, VidiunConfig.config.cache.encodingParams);
			VidiunCache.set(This.encodingParamsKey, encodingParams, VidiunConfig.config.cache.encodingParams);
			VidiunCache.set(This.fillerEncodingParamsKey, fillerEncodingParams, VidiunConfig.config.cache.fillerMedia);
		});
	},

	
	/**
	 * Save sync-point data to cache
	 * @param entryId
	 * @param segment object {sequence, url, resolvedUrl, duration}
	 * @param syncPoint VidiunSyncPoint
	 */
	handleSyncPoint: function(entryId, segment, syncPoint){
		VidiunLogger.log('[' + this.uniqueLoopId + '] Entry [' + entryId + '] segment [' + segment.sequence + '] segment pts [' + segment.pts + ']');
		VidiunLogger.debug('[' + this.uniqueLoopId + '] ' + JSON.stringify(syncPoint));

		var offsetInSegment = (syncPoint.pts - segment.pts) / 90;
		var segmentOffset = syncPoint.offset - offsetInSegment;
		var segmentTimestamp = syncPoint.timestamp - offsetInSegment;
		
		this.elapsedTime = {
			sequence: segment.sequence,
    		duration: segment.duration,
			offset: segmentOffset,
			timestamp: segmentTimestamp // in milliseconds since 1970
		};
		
		if(this.lowestBitrate){
			VidiunCache.set(this.elapsedTimeKey, this.elapsedTime, VidiunConfig.config.cache.elapsedTime);
		}		
	},

	
	/**
	 * Parse id3 tags from segment metadata
	 * 
	 * @param entryId
	 * @param segment object {sequence, url, resolvedUrl, duration}
	 * @param buffer Array <segment>
	 */
	parseId3Tags: function(entryId, segment, buffer){
		var parsed = id3Reader.parseBuffer(buffer);
		VidiunLogger.log('[' + this.uniqueLoopId + '] Entry [' + entryId + '] segment [' + segment.sequence + ']');
		
		if(!parsed.id3tags.length){
			return;
		}

		segment.pts = parsed.videoPts ? parsed.videoPts : parsed.audioPts;
		for (var i = 0; i < parsed.id3tags.length; i++) {
			var id3tag = parsed.id3tags[i];
			if (id3tag.PTS && id3tag.TEXT && id3tag.TEXT.TEXT) {
				var syncPoint = JSON.parse(id3tag.TEXT.TEXT);
				syncPoint.pts = id3tag.PTS;
				if ((syncPoint.timestamp || syncPoint.offset) && syncPoint.pts) { 
					this.handleSyncPoint(entryId, segment, syncPoint);
				}
			}
		}
	}
};

/**
 * @service stream
 * 
 */
var VidiunStreamManager = function(){
};
util.inherits(VidiunStreamManager, vidiun.VidiunManager);

/**
 * Start watching rendition manifest
 * 
 * @action stream.watch
 * 
 * @param url
 * @param entryId
 * @param masterUrl
 */
VidiunStreamManager.prototype.watch = function(request, response, params){
	params = this.parsePlayServerParams(response, params, ['url', 'entryId', 'masterUrl', 'partnerId']);
	if(!params)
		return;
	
	response.dir(params);
	
	this.callRestorableAction('stream', 'watchRendition', params);

	response.debug('Handled');
	this.okResponse(response, 'OK', 'text/plain');
};


/**
 * Restorable action, run as long as the entry watch is required
 * 
 * @param params {url, entryId, masterUrl}
 * @param finishCallback called when the watch is not needed anymore and the restoreable action could be unstored
 */
VidiunStreamManager.prototype.watchRendition = function(params, finishCallback){
	VidiunLogger.log('watch Rendition for entry ' + params.entryId);
	VidiunLogger.dir(params);
	new VidiunStreamWatcher(this, params, finishCallback);
};

module.exports.VidiunStreamManager = VidiunStreamManager;
