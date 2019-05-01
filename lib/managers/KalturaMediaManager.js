
var url = require('url');
var util = require('util');

var stitcher = require('../../bin/Release/TsStitcher.node');
var conv = require('binstring');

var vidiun = module.exports = require('../VidiunManager');
vidiun.tsPreparer = require('../media/VidiunTsPreparer');
vidiun.tsPreparer.setLogger(VidiunLogger);

/**
 * @service media
 * 
 * The service is responsible for creating and returning ad, pre and post segments to the player
 */
var VidiunMediaManager = function(){
};
util.inherits(VidiunMediaManager, vidiun.VidiunManager);

VidiunMediaManager.TS_PACKET_LENGTH = 188;
VidiunMediaManager.FILE_CHUNK_SIZE = 2500 * VidiunMediaManager.TS_PACKET_LENGTH;

VidiunMediaManager.PBA_CALL_AGAIN = 0;
VidiunMediaManager.PBA_GET_NEXT_CHUNK = 1;
VidiunMediaManager.PBA_CLONE_CURRENT_CHUNK = 2;

VidiunMediaManager.ALIGN_LEFT = 0;
VidiunMediaManager.ALIGN_MIDDLE =	1;
VidiunMediaManager.ALIGN_RIGHT = 	2;

VidiunMediaManager.CHUNK_TYPE_INVALID  =	-1;
VidiunMediaManager.CHUNK_TYPE_TS_HEADER =       0;
VidiunMediaManager.CHUNK_TYPE_PRE_AD = 	 1;
VidiunMediaManager.CHUNK_TYPE_POST_AD = 	 2;
VidiunMediaManager.CHUNK_TYPE_AD = 		 5;
VidiunMediaManager.CHUNK_TYPE_FILLER = 	 4;


VidiunMediaManager.SLATE_TYPE_FILLER = 'filler';

VidiunMediaManager.SLATE_STATE_NO = 0;
VidiunMediaManager.SLATE_STATE_STITCH_POST = 1;
VidiunMediaManager.SLATE_STATE_YES = 2;

VidiunMediaManager.MAX_DVR_LENGTH = 24 * 60 * 60;


/**
 * Create the segment and write it to response
 */
VidiunMediaManager.prototype.outputStitchedSegment = function(outputLayout, outputState, curChunk, preAdKey, adKeys, fillerKey, postAdKey, response, callCount) {
	if (!curChunk) {
		// not much to do about this since we already returned the response headers
		response.log('failed to get chunk from memcache');
		response.end();
		return;
	}
	
	response.debug('Call count: ' + callCount);
	if(VidiunConfig.config.media.maxOutputStitchSegmentCalls && callCount > VidiunConfig.config.media.maxOutputStitchSegmentCalls){
		response.log('exceeded max calls');
		response.end();
		return;		
	}
	do {
		var processResult = stitcher.processChunk(
			outputLayout,
			curChunk,
			outputState);

		if (processResult.chunkOutputEnd > 0) {
			response.log('Writing ' + processResult.chunkOutputStart + '..' + processResult.chunkOutputEnd);
			var curSlice = curChunk.slice(processResult.chunkOutputStart, processResult.chunkOutputEnd);
			response.write(curSlice);
		}

		if (processResult.outputBuffer) {
			response.log('Writing extra buffer of size ' + processResult.outputBuffer.length);
			response.write(processResult.outputBuffer);
		}

		if (processResult.action == VidiunMediaManager.PBA_CLONE_CURRENT_CHUNK)
		{
			response.log('Cloning chunk buffer');
			var chunkClone = new Buffer(curChunk.length);
			curChunk.copy(chunkClone);
			curChunk = chunkClone;
		}
	} while (processResult.action != VidiunMediaManager.PBA_GET_NEXT_CHUNK);

	curChunk = null;		// no longer need the chunk

	var chunkIndex = Math.floor(outputState.chunkStartOffset / VidiunMediaManager.FILE_CHUNK_SIZE);
	var videoKey = null;

	switch (outputState.chunkType) {
	case VidiunMediaManager.CHUNK_TYPE_PRE_AD:
		videoKey = preAdKey + '-' + chunkIndex;
		break;
	case VidiunMediaManager.CHUNK_TYPE_FILLER:
		videoKey = fillerKey + '-' + chunkIndex;
		break;
	case VidiunMediaManager.CHUNK_TYPE_POST_AD:
		videoKey = postAdKey + '-' + chunkIndex;
		break;
	case VidiunMediaManager.CHUNK_TYPE_TS_HEADER:
		videoKey = preAdKey + '-header';
		break;		
	default:
		for(var i=0; i<adKeys.length; i++){
			if(VidiunMediaManager.CHUNK_TYPE_AD + i == outputState.chunkType){
				videoKey = adKeys[i] + '-' + chunkIndex; 
				break;
			}			
		}
		if(!videoKey){
			response.debug('Request completed');
			response.end();
			return;			
		}
	}

	response.log('Getting ' + videoKey);
	var This = this;
	VidiunCache.getBinary(videoKey, function (curChunk) {
		outputState.chunkStartOffset = chunkIndex * VidiunMediaManager.FILE_CHUNK_SIZE;
		callCount++;
		This.outputStitchedSegment(outputLayout, outputState, curChunk, preAdKey, adKeys, fillerKey, postAdKey, response, callCount);
	});
};

/**
 * 1. Prepare the metadata required for segment creation
 * 2. Generate new post segment if needed in case of passthrough mode 
 *  
 * The response of this call is cached in CDN therefore it shouldn't contain any session specific parameters in the request
 */
VidiunMediaManager.prototype.get = function(request, response, params){
	// TODO verify the call is from the CDN
	if (!params.e) {
		response.dir(params);
		response.error('Missing arguments [e]');
		this.errorMissingParameter(response);
		return;
	}
	
	params = this.decrypt(params);
	response.dir(params);
	
	var This = this;
	var segmentIndex = parseInt(params.segmentIndex);
	var outputStart = parseInt(params.outputStart);
	var outputEnd = parseInt(params.outputEnd);
	var serverAdId = JSON.parse(params.serverAdId);	
	var cuePointDuration = parseInt(params.cuePointDuration);
	var adStart = parseInt(params.adStart);
	var stitchPostSegment = parseInt(params.stitchPostSegment);
	var preSegmentId = VidiunCache.getPreSegmentId(params.cuePointId, params.renditionId);
	var postSegmentId = VidiunCache.getPostSegmentId(params.cuePointId, params.renditionId);	
	var preAdMetadataKey = VidiunCache.getKey(VidiunCache.SEGMENT_MEDIA_KEY_PREFIX, [preSegmentId], VidiunCache.METADATA_KEY_SUFFIX);	
	var fillerMetadataKey = VidiunCache.getKey(VidiunCache.FILLER_MEDIA_KEY_PREFIX, [params.renditionId, params.uiConfConfigId], VidiunCache.METADATA_KEY_SUFFIX);
	var postAdMetadataKey = VidiunCache.getKey(VidiunCache.SEGMENT_MEDIA_KEY_PREFIX, [postSegmentId], VidiunCache.METADATA_KEY_SUFFIX);
	var slatePostSegmentId = VidiunCache.getPostSegmentId(params.cuePointId, params.serverAdId + '-' + segmentIndex);
	var slatePostAdMetadataKey = VidiunCache.getKey(VidiunCache.SEGMENT_MEDIA_KEY_PREFIX, [slatePostSegmentId], VidiunCache.METADATA_KEY_SUFFIX);
	var postSegmentStitchedKey = VidiunCache.getKey(VidiunCache.POST_SEGMENT_STITCHED_KEY_PREFIX, 
			[VidiunCache.getPostSegmentStitchedId(params.cuePointId, params.adsSequenceId, segmentIndex)]);
	var prevPostSegmentStitchedKey = VidiunCache.getKey(VidiunCache.POST_SEGMENT_STITCHED_KEY_PREFIX, 
														[VidiunCache.getPostSegmentStitchedId(params.cuePointId, params.adsSequenceId, segmentIndex-1)]);
	var prev2PostSegmentStitchedKey = VidiunCache.getKey(VidiunCache.POST_SEGMENT_STITCHED_KEY_PREFIX, 
														[VidiunCache.getPostSegmentStitchedId(params.cuePointId, params.adsSequenceId, segmentIndex-2)]);
	var preAdKey = VidiunCache.getKey(VidiunCache.SEGMENT_MEDIA_KEY_PREFIX, [preSegmentId]);
	var fillerKey = VidiunCache.getKey(VidiunCache.FILLER_MEDIA_KEY_PREFIX, [params.renditionId, params.uiConfConfigId]);
	
	var adMetadataKeys = [];	
	var adKeys = [];
	
	for(var i=0; i<serverAdId.length; i++){
		adMetadataKeys.push(VidiunCache.getKey(VidiunCache.AD_MEDIA_KEY_PREFIX, [serverAdId[i].id], VidiunCache.METADATA_KEY_SUFFIX));
		adKeys.push(VidiunCache.getKey(VidiunCache.AD_MEDIA_KEY_PREFIX, [serverAdId[i].id]));
	}
	
	var cacheKeys = adMetadataKeys.concat([preAdMetadataKey, fillerMetadataKey, postAdMetadataKey]);
	
	if(stitchPostSegment){
		cacheKeys.push(slatePostAdMetadataKey);
		cacheKeys.push(prevPostSegmentStitchedKey);
		cacheKeys.push(prev2PostSegmentStitchedKey);
	}
	
	VidiunCache.getMultiBinary(cacheKeys, function(data){
		var preAdMetadata = data[preAdMetadataKey];
		var fillerMetadata = data[fillerMetadataKey];
		var postAdMetadata = data[postAdMetadataKey];
		
		if(stitchPostSegment && (data[prevPostSegmentStitchedKey] || data[prev2PostSegmentStitchedKey])){
			//post segment was already stitched, can dump original ts
			response.log('In Passthrough, dumping original ts');
			This.dumpResponse(response, params.originalUrl);
			return;
		}
		if (!preAdMetadata){
			response.log('Alert: Pre-Ad metadata is null, dumping original ts');
			This.dumpResponse(response, params.originalUrl);
			return;
		}
		
		var adsMetadata = [];
		for(var i=0; i<adMetadataKeys.length; i++){
			if(data[adMetadataKeys[i]]){
				var adMetadata = 
				{
					adChunkType: VidiunMediaManager.CHUNK_TYPE_AD + i,
					ad: data[adMetadataKeys[i]],
					fillerChunkType: VidiunMediaManager.CHUNK_TYPE_FILLER,
					filler: fillerMetadata,
					startPos: serverAdId[i].startPos,
					endPos: serverAdId[i].endPos, 
					alignment: VidiunMediaManager.ALIGN_LEFT
				};	
				adsMetadata.push(adMetadata);	
				response.log('Added ad metadata: adChunkType [' + adMetadata.adChunkType + '], startPos [' + serverAdId[i].startPos + '] endPos [' + serverAdId[i].endPos + ']');
				if(VidiunLogger.largeDataDebugEnabled){
					response.debug('Ad metadata hex for ' + i + ': ' + conv(adMetadata.ad, { out:'hex'}));
				}
			}
			else{
				delete adKeys[i];
			}
		}
		
		if(stitchPostSegment && data[slatePostAdMetadataKey] && data[slatePostAdMetadataKey].length > 0){
			response.log('Setting postAdMetadata to slatePostAdMetadata');
			postAdMetadata = data[slatePostAdMetadataKey];
			postSegmentId = slatePostSegmentId;
		}
		
		if(stitchPostSegment && !data[slatePostAdMetadataKey]){
			response.log('Calling stitchPostSegment');
			This.stitchPostSegment(response, params.originalUrl, slatePostSegmentId, adsMetadata, outputStart, adStart, cuePointDuration, function(metadata){
				if(metadata){
					VidiunCache.set(postSegmentStitchedKey, true, VidiunMediaManager.MAX_DVR_LENGTH);
					postAdMetadata = metadata;
					postSegmentId = slatePostSegmentId;
					
				}
				var postAdKey = VidiunCache.getKey(VidiunCache.SEGMENT_MEDIA_KEY_PREFIX, [postSegmentId]);
				This.serve( response, 
							preAdMetadata, postAdMetadata, adsMetadata, fillerMetadata, 
							segmentIndex, outputStart, outputEnd, 
							preAdKey, adKeys, fillerKey, postAdKey);			
			});
		}
		else{
			var postAdKey = VidiunCache.getKey(VidiunCache.SEGMENT_MEDIA_KEY_PREFIX, [postSegmentId]);
			This.serve( response, 
						preAdMetadata, postAdMetadata, adsMetadata, fillerMetadata, 
						segmentIndex, outputStart, outputEnd, 
						preAdKey, adKeys, fillerKey, postAdKey);			
		}
	});
};

/**
 * 1. Call buildLayout to create segment layout
 * 2. Call outputStitchedLayout to create the segment based on the layout and write it to response
 */
VidiunMediaManager.prototype.serve = function(	response, 
												preAdMetadata, postAdMetadata, adsMetadata, fillerMetadata, 
												segmentIndex, outputStart, outputEnd, 
												preAdKey, adKeys, fillerKey, postAdKey){
	if(VidiunLogger.largeDataDebugEnabled){
		response.debug('Filler metadata hex: '  + conv(fillerMetadata, { out:'hex'}));
	}		
	if(VidiunLogger.largeDataDebugEnabled){
		response.debug('Pre-Ad metadata hex: ' + conv(preAdMetadata, { out:'hex'}));
	}					
	if (!adsMetadata.length){
		response.log('Ad metadata is null');
	}
	else{
		response.debug('Ad metadata length ' + adsMetadata.length);
		if(postAdMetadata && VidiunLogger.largeDataDebugEnabled){
			response.debug('Post-Ad metadata hex: ' + conv(postAdMetadata, { out:'hex'}));
		}
		// build the layout of the output TS
		var outputLayout = stitcher.buildLayout(
								preAdMetadata,
								postAdMetadata,
								adsMetadata,
								segmentIndex,
								outputStart,
								outputEnd);
				
		// free the metadata buffers, we don't need them anymore
		preAdMetadata = null;
		adsMetadata = null;
		fillerMetadata = null;
		postAdMetadata = null;

		// output the TS
		response.writeHead(200, {
			'Content-Type': 'video/MP2T',
			'Cache-Control': VidiunConfig.config.media.cdnCacheScope + ', max-age=' + VidiunConfig.config.media.cdnMaxAge + ', max-stale=0',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
			});
		this.outputStitchedSegment(outputLayout, {}, new Buffer(0), preAdKey, adKeys, fillerKey, postAdKey, response, 0);
	}
};

/**
 * Create new post segment in case of passthrough
 * 
 */
VidiunMediaManager.prototype.stitchPostSegment = function(response, originalUrl, segmentId, adsMetadata, outputStart, adStart, cuePointDuration, callback){
	var filePath = VidiunConfig.config.cloud.sharedBasePath + '/segments/' + originalUrl.md5();
	VidiunUtils.downloadHttpUrl(originalUrl, {filePath: filePath}, function(filePath){
		var ffprobeBin = VidiunConfig.config.bin.binDir + '/ffprobe';
		if(VidiunConfig.config.bin.ffprobePath){
			ffprobeBin = VidiunConfig.config.bin.ffprobePath;
		}
		
		var cutOffset = adsMetadata[adsMetadata.length-1].endPos - outputStart;
		if(cutOffset < 0){
			cutOffset = 0;
		}
		var maxCutOffset = adStart + cuePointDuration*90 - outputStart;
		if(maxCutOffset < 0){
			response.log('Already in post segment, no need to stitch');
			callback(null);
			return;
		}
		
		response.log('Calling rightCutOnIFrame with cutOffset [' + cutOffset + '] maxCutOffset [' + maxCutOffset + ']');
		vidiun.tsPreparer.rightCutOnIFrame(ffprobeBin, cutOffset, maxCutOffset, [filePath], function(err, data){
			if(err){
				response.log('Failed to rightCutOnIFrame, segmentId [' + segmentId + '] ');
				callback(null);
				return;
			}
			if(!data){
				response.log('iFrame for cut not found in the segment');
				callback(null);
				return;
			}
			var segmentMediaKey = VidiunCache.getKey(VidiunCache.SEGMENT_MEDIA_KEY_PREFIX, [segmentId]);
			response.debug('Saving [' + segmentMediaKey + '] to cache');
			vidiun.tsPreparer.savePreparedTsToMemcache(VidiunCache, segmentMediaKey, data, VidiunMediaManager.MAX_DVR_LENGTH, function(error){
				if(error){
					response.log('Failed to save [' + segmentMediaKey + '] to cache');
					callback(null);
					return;
				}
				callback(data.metadata);
			});
		});
	}, function(err){
		response.log('Failed to download original ts');
		callback(null);
	});	
};

/**
 * 1. Decide if can play ad break for this session
 * 2. Find current ads in ad sequence that should be returned for this session
 * 3. Validate passthrough
 * 4. In case the segment should be stitched
 * 		a. call adIntegration.sendBeacons
 * 		b. redirect to media.get to return stitched segment
 */
VidiunMediaManager.prototype.stitchSegment = function(request, response, params, serverAdIdKey){

	var This = this;
	var outputStart = parseInt(params.outputStart);
	var outputEnd = parseInt(params.outputEnd);
	var adStart = parseInt(params.adStart);
	var segmentIndex = parseInt(params.segmentIndex);	
	var cuePointDuration = parseInt(params.cuePointDuration);
	var maxSegmentDuration = parseInt(params.maxSegmentDuration);
	var serverAdId = [];
	var adsSequence = [];
	var currentAdsIdx = [];
	var lastAdIdx = 0;
	var sequenceDuration = adStart;
	var iterationDuration = adStart;
	var startSequenceIndex = 0;
	var startPos = adStart;
	var endPos = adStart;
	VidiunCache.get(serverAdIdKey, function(serverAdIds){
		if (!serverAdIds){
			response.log('Alert: serverAdIds not found in cache for key ' + serverAdIdKey + ' , redirecting to original ts');
			This.redirectResponse(response, params.originalUrl);
		}		
		else{
			serverAdIds = VidiunCache.extractSessionServerAdIdValue(serverAdIds);
			response.debug('serverAdIds: ' + JSON.stringify(serverAdIds));
			
			This.decideCanPassthrough(response, params.uiConfConfigId, serverAdIds, cuePointDuration, adStart, outputStart, outputEnd, maxSegmentDuration, function(slateState){
				if(slateState == VidiunMediaManager.SLATE_STATE_YES){
					response.log('Passthrough for ' + serverAdIdKey + ' , redirecting to original ts');
					This.redirectResponse(response, params.originalUrl);	
					return;
				}
				
				for(var i = 0; i<= serverAdIds.length; i++){
					if(!serverAdIds[i]){
						continue;
					}
					if((iterationDuration + serverAdIds[i].duration) <= outputStart){
						sequenceDuration += serverAdIds[i].duration;
						startSequenceIndex++;
					}
					iterationDuration += serverAdIds[i].duration;
					startPos = endPos;
					endPos += serverAdIds[i].duration; 
					adsSequence.push({id:serverAdIds[i].id, startPos:startPos, endPos:endPos, sequence:i});
					response.debug('iteration: ' + i + ' iterationDuration: ' + iterationDuration + ' startSequenceIndex: ' + startSequenceIndex);
					lastAdIdx = i;
				}
					
				response.debug('ads sequence: ' + JSON.stringify(adsSequence) + ' startSequenceIndex: ' + startSequenceIndex);
				for(var j = startSequenceIndex; adsSequence[j] && (adsSequence[j].startPos <= outputEnd || !outputEnd); j++){
					currentAdsIdx.push(adsSequence[j].sequence);
					serverAdId.push({id:adsSequence[j].id, startPos:adsSequence[j].startPos, endPos:adsSequence[j].endPos});
				}	
				
				if(outputEnd == 0 && currentAdsIdx.length == 0){
					currentAdsIdx.push(lastAdIdx);
				}
				
				if(outputEnd == 0){
					response.log('Completed ad break for partner [' + params.partnerId + '] entry [' + params.entryId + '] cue-point [' + params.cuePointId + '] session [' + params.sessionId + ']');	
				}
				
				if(serverAdId.length == 0){
					if(segmentIndex == 0 && adsSequence[0]){
						//set serverAdIds for pre ad segment
						serverAdId.push({id:adsSequence[0].id, startPos:adsSequence[0].startPos, endPos:adsSequence[0].endPos});				
					}
					else if(adsSequence[adsSequence.length - 1] && outputStart > adsSequence[adsSequence.length - 1].endPos){
						//set serverAdIds for post ad segments
						serverAdId.push({id:adsSequence[adsSequence.length - 1].id, startPos:adsSequence[adsSequence.length - 1].startPos, endPos:adsSequence[adsSequence.length - 1].endPos});			
					}
					else{
						response.debug('No ad match to ad sequence');
					}
				}
				response.debug('Handling server ad Ids: ' + JSON.stringify(serverAdId));
				params.serverAdId = JSON.stringify(serverAdId);
				var trackingId = VidiunCache.getKey(VidiunCache.TRACKING_KEY_PREFIX, [params.cuePointId, params.sessionId]);
				var sessionIdForSendBeacon = params.sessionId;
				delete params.sessionId;
				delete params.sessionStartTime;
				delete params.originDc;
				params.stitchPostSegment = slateState;
				params.adsSequenceId = VidiunCache.buildAdsSequenceId(serverAdIds);
				
				var redirectUrl = This.getPlayServerUrl('media', 'get', params.partnerId, null, params);
				This.redirectResponse(response, redirectUrl);
					
				//track beacons			
				var sendBeaconParams = {
						trackingId: trackingId,
						adSequence: JSON.stringify(currentAdsIdx),
						totalDuration: sequenceDuration,
						outputStart: outputStart,
						outputEnd: outputEnd,
						adStart: adStart,
						sessionId: sessionIdForSendBeacon
				};
				
				This.callPlayServerService('adIntegration', 'sendBeacon', params.partnerId, sendBeaconParams);				
			});
		}
	}, function (err){
			response.log('Alert: serverAdIds not found in cache for key ' + serverAdIdKey + ' redirecting to original ts , err is:' + err);
			This.redirectResponse(response, params.originalUrl);
	});
};

/**
 * Check if all the metadata is ready for ads required for this session for all the flavors in the entry
 * This check is performed on first stitched segment request from the player
 * The result is saved in cache
 */
VidiunMediaManager.prototype.decideCanPlayAd = function(response, entryId, cuePointId, sessionId, renditionId, sessionStartTime, originDc, cuePointTriggeredAt, callback){
	response.log('Calculating canPlayAd flag for cue point [' + cuePointId + '] session [' + sessionId + ']');
	
	var preparationTime = Math.floor(Date.now() / 1000) - sessionStartTime;
	var dcChanged = (originDc !== VidiunUtils.getCurrentDc());
	var entryRequiredKey = VidiunCache.getKey(VidiunCache.ENTRY_REQUIRED_KEY_PREFIX, [entryId]);
	
	VidiunCache.get(entryRequiredKey, function(entryRequired) {
            var renditionIds = [];
            var mediaInfoKeys = [];
            var allSessionServerAdIdsKeys = [];
            if(entryRequired){
                renditionIds = VidiunCache.extractEntryRequiredValue(entryRequired);
                for(var i = 0; i < renditionIds.length; i++){
                    if(renditionIds[i].trim().length){
                        mediaInfoKeys.push(VidiunCache.getKey(VidiunCache.MEDIA_INFO_KEY_PREFIX, [renditionIds[i]]));
                    }
                }
                VidiunCache.getMulti(mediaInfoKeys, function(mediaInfos) {
                    if (!mediaInfos) {
                        callback('no', '9:mediaInfo not found in cache, redirecting to original ts');
                        return;
                    }
                    for(var mediaInfoId in mediaInfos) {
                        if (!mediaInfos[mediaInfoId]) {
                            response.debug('Skipping mediaInfoId [' + mediaInfoId + '], due to undefined entry in mediaInfos');
                            continue;
                        }
                        var renditionFromMediaInfo = VidiunCache.getRenditionIdFromMediaInfo(mediaInfoId);
                        allSessionServerAdIdsKeys.push(VidiunCache.getKey(VidiunCache.SERVER_AD_ID_KEY_PREFIX, [cuePointId, renditionFromMediaInfo, sessionId]));
                    }

                    VidiunCache.getMulti(allSessionServerAdIdsKeys, function(allSessionServerAdIds){
                        if(!allSessionServerAdIds || Object.keys(allSessionServerAdIds).length == 0){
                            callback('no', '1:Session Server Ad Ids not found in cache, redirecting to original ts: requested after ' + preparationTime + ' seconds, dc changed: ' + dcChanged);
                            return;
                        }
                        else{
                            var metadataKeys = [];
                            var preSegmentId = VidiunCache.getPreSegmentId(cuePointId, renditionId);
                            metadataKeys.push(VidiunCache.getKey(VidiunCache.METADATA_READY_KEY_PREFIX, [preSegmentId]));
                            for(var sessionServerAdIdKey in allSessionServerAdIds){
                                if(!allSessionServerAdIds[sessionServerAdIdKey]){
                                    if (cuePointTriggeredAt && cuePointTriggeredAt <= sessionStartTime) {
                                        callback('no', '8:Session started at ' + sessionStartTime + ' after cuePoint at ' + cuePointTriggeredAt + ', redirecting to original ts: requested after ' + preparationTime + ' seconds, dc changed: ' + dcChanged);
                                    } else {
                                        callback('no', '2:Session Server Ad ids missing for key ' + sessionServerAdIdKey + ', redirecting to original ts: requested after ' + preparationTime + ' seconds, dc changed: ' + dcChanged);
                                    }
                                    return;
                                }
                                else{
                                    var serverAdIds = VidiunCache.extractSessionServerAdIdValue(allSessionServerAdIds[sessionServerAdIdKey]);
                                    for(var i = 0; i<= serverAdIds.length; i++){
                                        if(!serverAdIds[i]){
                                            continue;
                                        }
                                        metadataKeys.push(VidiunCache.getKey(VidiunCache.METADATA_READY_KEY_PREFIX, [serverAdIds[i].id]));
                                    }
                                }
                            }
                            VidiunCache.getMulti(metadataKeys, function(data){
                                for(var i=0; i<metadataKeys.length; i++){
                                    if(!(data[metadataKeys[i]])){
                                        callback('no', '3:Metadata missing for ' + metadataKeys[i] + ', redirecting to original ts');
                                        return;
                                    }
                                }
                                callback('yes', null);
                                return;
                            }, function(err){
                                callback('no', '5:Error getting metadata status from cache, redirecting to original ts');
                                return;
                            });
                        }

                    }, function (err){
                        callback('no', '6:Server Ad Ids not found in cache, redirecting to original ts: requested after ' + preparationTime + ' seconds, dc changed: ' + dcChanged);
                        return;
                    });
                }, function(err) {
                    callback('no', '9:mediaInfo not found in cache, redirecting to original ts');
                    return;
                })
            }
        }, function(err){
            callback('no', '7:entryRequired not found in cache, redirecting to original ts');
            return;
    	});
};

/**
 * Check if current session is in passthrough mode and should return an original ts
 */
VidiunMediaManager.prototype.decideCanPassthrough = function(response, uiConfConfigId, serverAdIds, cuePointDuration, adStart, outputStart, outputEnd, maxSegmentDuration, callback){
	var doDecideCanPassthrough = function(){
		var totalDuration = 0;
		for(var i = 0; i<= serverAdIds.length; i++){
			if(!serverAdIds[i]){
				continue;
			}
			totalDuration += serverAdIds[i].duration;
		}
		cuePointDuration *= 90;
		var adEnd = adStart + totalDuration;
		response.debug('Total Ads duration: ' + totalDuration + ', Cue-point duration: ' + cuePointDuration + ', ad end: ' + adEnd);
		
		if(cuePointDuration <= totalDuration){
			response.debug('No Passthrough, cue point duration is not greater than ads duration');
			callback(VidiunMediaManager.SLATE_STATE_NO);
			return;
		}
				
		if(adEnd > outputEnd && outputEnd > 0){
			response.debug('No Passthrough, still not in the ads break end');
			callback(VidiunMediaManager.SLATE_STATE_NO);				
		}
		else if((adEnd > outputStart && (adEnd <= outputEnd || outputEnd ==0)) 
			    ||(adEnd > outputStart-maxSegmentDuration*90000 && adEnd <= outputStart)){ 
			response.debug('Prepare for Passthrough, can stitch post segment');
			callback(VidiunMediaManager.SLATE_STATE_STITCH_POST); 				
		}
		else{
			callback(VidiunMediaManager.SLATE_STATE_YES);
			response.debug('Can Passthrough');
		}				
	};
	
	var uiConfConfigKey = VidiunCache.getKey(VidiunCache.UI_CONF_CONFIG_KEY_PREFIX, [uiConfConfigId]);
	VidiunCache.get(uiConfConfigKey, function(uiConfConfig){
		response.debug('uiConfConfig: ' + JSON.stringify(uiConfConfig));
		if(uiConfConfig && uiConfConfig.slateType == VidiunMediaManager.SLATE_TYPE_FILLER){
			response.debug('No Passthrough, slate type set to filler');
			callback(VidiunMediaManager.SLATE_STATE_NO);
		}
		else{
			doDecideCanPassthrough();
		}
		
	}, function(err){
		response.error('Failed to get uiConf from cache for ' + uiConfConfigId);
		doDecideCanPassthrough();
	});	
};

/**
 * Returns the segment media from cache.
 * This call performes session specific calculations and redirects the response:
 * 1. to media.get in case ad ts can be stitched
 * 2. to original ts in case of passthrough or in cases when ad is not ready
 * 
 * @action media.segment
 */
VidiunMediaManager.prototype.segment = function(request, response, params){
	var This = this;
	if (!params.e) {
		response.dir(params);
		response.error('Missing arguments [e]');
		this.errorMissingParameter(response);
		return;
	}
	
	params = this.decrypt(params);
	response.dir(params);
	
	var requiredParams = [
		'cuePointId', 
		'renditionId', 
		'segmentIndex',
		'outputStart',
		'outputEnd',
		'sessionId',
		'adStart',
		'originalUrl',
		'uiConfConfigId'
	];	

	var missingParams = this.getMissingParams(params, requiredParams);
	if(missingParams.length){
		response.error('Missing arguments [' + missingParams.join(', ') + ']');
		this.errorMissingParameter(response);
		return;
	}
	var segmentFetchedKey =  VidiunCache.getKey(VidiunCache.SEGMENT_FETCHED_PREFIX, [params.sessionId]);
	VidiunCache.set(segmentFetchedKey, 'true', VidiunConfig.config.cache.sessionCuePoint*2)

	var serverAdIdKey = VidiunCache.getKey(VidiunCache.SERVER_AD_ID_KEY_PREFIX, [params.cuePointId, params.renditionId, params.sessionId]);	
	var canPlayAdKey = VidiunCache.getKey(VidiunCache.CAN_PLAY_AD_KEY_PREFIX, [params.cuePointId, params.sessionId]);
	var cuePointTriggeredAt = 0;
	if (params.cuePointTriggeredAt)
		cuePointTriggeredAt = parseInt(params.cuePointTriggeredAt);
	
	var doDecideCanPlayAd = function(){
		This.decideCanPlayAd(response, params.entryId, params.cuePointId, params.sessionId, params.renditionId, parseInt(params.sessionStartTime), params.originDc, cuePointTriggeredAt, function(shouldStitch, redirectError){
			VidiunCache.set(canPlayAdKey, shouldStitch, VidiunConfig.config.cache.sessionCuePoint);			
			if(shouldStitch == 'yes'){
				response.log('canPlayAd for params [' + JSON.stringify(params) + '] set to [' + shouldStitch + ']');
				This.stitchSegment(request, response, params, serverAdIdKey);
			}
			else{
				response.log('canPlayAd for params [' + JSON.stringify(params) + '] set to [' + shouldStitch + '] error [' + redirectError + ']');
				This.redirectResponse(response, params.originalUrl);					
			}
		});		
		
	};
	
	VidiunCache.get(canPlayAdKey, function(canPlayAd){
		if(!canPlayAd){
			doDecideCanPlayAd();
		}
		else if(canPlayAd == 'yes'){
			This.stitchSegment(request, response, params, serverAdIdKey);	
		}
		else{
			response.log('canPlayAd set to false, redirecting to original ts');
			This.redirectResponse(response, params.originalUrl);
		}
	}, function (err){
		doDecideCanPlayAd();
	});
};

module.exports.VidiunMediaManager = VidiunMediaManager;
