
var os = require('os');
var util = require('util');
var fs = require('fs');

var vidiun = module.exports = require('../VidiunManager');
vidiun.tsPreparer = require('../media/VidiunTsPreparer');
vidiun.tsPreparer.setLogger(VidiunLogger);


/**
 * @service segment
 */
var VidiunSegmentManager = function(){
};
util.inherits(VidiunSegmentManager, vidiun.VidiunManager);

VidiunSegmentManager.MAX_DVR_LENGTH = 24 * 60 * 60;

/**
 * Stitch the segment
 * 
 * @param segmentId
 * @param offset
 * @param portion
 * @param inputFiles Array
 */
VidiunSegmentManager.prototype.exec = function(segmentId, cutOffset, portion, inputFiles, callback, errorCallback){
	var leftPortion = (portion == 'left');
		
	var ffmpegBin = VidiunConfig.config.bin.binDir + '/ffmpeg';
	var ffprobeBin = VidiunConfig.config.bin.binDir + '/ffprobe';
	if(VidiunConfig.config.bin.ffmpegPath){
		ffmpegBin = VidiunConfig.config.bin.ffmpegPath;
	}
	if(VidiunConfig.config.bin.ffprobePath){
		ffprobeBin = VidiunConfig.config.bin.ffprobePath;
	}
	
	VidiunLogger.debug('tsCutter: ' + JSON.stringify({
		ffmpegBin: ffmpegBin, 
		ffprobeBin: ffprobeBin, 
		cutOffset: cutOffset, 
		leftPortion: leftPortion, 
		inputFiles: inputFiles
	}));

	vidiun.tsPreparer.cutTsFiles(ffmpegBin, ffprobeBin, cutOffset, leftPortion, inputFiles, function(err, data){
		if(err){
			VidiunLogger.log('Failed to cutTsFiles, segmentId [' + segmentId + '] ');
			errorCallback(err);
			return;
		}		
		var segmentMediaKey = VidiunCache.getKey(VidiunCache.SEGMENT_MEDIA_KEY_PREFIX, [segmentId]);
		VidiunLogger.debug('Saving [' + segmentMediaKey + '] to cache');
		vidiun.tsPreparer.savePreparedTsToMemcache(VidiunCache, segmentMediaKey, data, VidiunSegmentManager.MAX_DVR_LENGTH, function(error){
			if(error){
				VidiunLogger.log('Failed to save [' + segmentMediaKey + '] to cache');
				errorCallback(err);
				return;
			}	
			callback();
		});
		
	});
};

/**
 * Execute stitch filler
 * 
 * @param renditionId
 * @param uiConfConfigId
 * @param fillerEncodingParams
 * @param fillerSourceFilePath
 * @param fillerOutputFilePath
 */
VidiunSegmentManager.prototype.execFiller = function(partnerId, renditionId, uiConfConfigId, slateContent, fillerEncodingParams, fillerSourceFilePath, fillerOutputFilePath){	

	var ffmpegBin = VidiunConfig.config.bin.binDir + '/ffmpeg';
	if(VidiunConfig.config.bin.ffmpegPath){
		ffmpegBin = VidiunConfig.config.bin.ffmpegPath;
	}
	
	var getStitchFillerCmd = function(){
		if(fillerSourceFilePath){
			var cmd = [
				ffmpegBin,
				'-i',
				fillerSourceFilePath,
				fillerEncodingParams, 
				'-y', 
				fillerOutputFilePath
			];
			cmd = cmd.join(' ');
			return cmd;			
		}
		else{
			var cmd = [
				ffmpegBin,
				fillerEncodingParams, 
				'-y', 
				fillerOutputFilePath
			];
			cmd = cmd.join(' ');
			return cmd;
		}			
	};
	
	var This = this;	
	fs.exists(fillerOutputFilePath, function(exists){
		if(exists){
			VidiunLogger.debug('File [' + fillerOutputFilePath + '] already exists on the file system');
			This.saveFiller(renditionId, uiConfConfigId, fillerOutputFilePath);
		}
		else{
			var cmd = getStitchFillerCmd();	
			
			if(fillerSourceFilePath){
				fs.exists(fillerSourceFilePath, function(exists){
					if(exists){
						cmd.exec(function(){	
							This.saveFiller(renditionId, uiConfConfigId, fillerOutputFilePath);
						});						
					}
					else{
						This.getFlavorUrl(partnerId, slateContent, function(fillerDownloadUrl){
							if (fillerDownloadUrl === null ){
								VidiunLogger.error('Failed to get filler [' + slateContent + '] download URL');
								return;
							}

							VidiunUtils.downloadHttpUrl(fillerDownloadUrl, {filePath: fillerSourceFilePath}, function(fillerSourceFilePath){
								cmd.exec(function(){	
									This.saveFiller(renditionId, uiConfConfigId, fillerOutputFilePath);
								});
							}, function(err){
								VidiunLogger.error('Failed to download filler [' + fillerSourceFilePath + ']');
								return;								
							});
						});
					}
				});
			}
			else{
				cmd.exec(function(){	
					This.saveFiller(renditionId, uiConfConfigId, fillerOutputFilePath);
				});
			}
		}
	});
};

/**
 * Prepare filler ts and save to memcache
 * 
 * @param renditionId
 * @param uiConfConfigId
 * @param fillerOutputFilePath
 */
VidiunSegmentManager.prototype.saveFiller = function(renditionId, uiConfConfigId, fillerOutputFilePath){	
	var ffprobeBin = VidiunConfig.config.bin.binDir + '/ffprobe';
	if(VidiunConfig.config.bin.ffprobePath){
		ffprobeBin = VidiunConfig.config.bin.ffprobePath;
	}
	
	vidiun.tsPreparer.prepareTsFiles(ffprobeBin, [fillerOutputFilePath], function(err, data){
		if(err){
			VidiunLogger.error('Failed to prepareTsFiles for filler media');
			return;
		}		
		var fillerMediaKey = VidiunCache.getKey(VidiunCache.FILLER_MEDIA_KEY_PREFIX, [renditionId, uiConfConfigId]);
		VidiunLogger.debug('Saving [' + fillerMediaKey + '] to cache');
		vidiun.tsPreparer.savePreparedTsToMemcache(VidiunCache, fillerMediaKey, data, VidiunSegmentManager.MAX_DVR_LENGTH, function(error){
			if(error){
				VidiunLogger.error('Failed to save [' + fillerMediaKey + '] to cache');
				return;
			}		
		});		
	});
};

/**
 * Stitch filler segment and save to cache
 * 
 * @action segment.stitchFiller
 * @param renditionId
 * @param slateContent
 */
VidiunSegmentManager.prototype.stitchFiller = function(request, response, params){
	params = this.parsePlayServerParams(response, params, ['renditionId', 'uiConfConfigId']);
	if(!params)
		return;
	
	response.dir(params);
	
	var This = this;
	var fillerEncodingParamsKey = VidiunCache.getKey(VidiunCache.FILLER_ENCODING_PARAMS_KEY_PREFIX, [params.renditionId, params.uiConfConfigId]);
	VidiunCache.get(fillerEncodingParamsKey, function(fillerEncodingParams){

		response.debug('Handled');
		This.okResponse(response, 'OK', 'text/plain');
		
		if(!fillerEncodingParams){
			return;
		}
			
		var encodingId = fillerEncodingParams.md5();
		var fileName = 'black-' + encodingId;
		var fillerSourceFilePath = null;
		if(params.slateContent){
			fileName = params.slateContent + '-' + encodingId;
			fillerSourceFilePath = VidiunConfig.config.cloud.sharedBasePath + '/filler/' + params.slateContent;
		}
		var fillerOutputPath = VidiunConfig.config.cloud.sharedBasePath + '/filler/' + fileName;		
		This.execFiller(params.partnerId, params.renditionId, params.uiConfConfigId, params.slateContent, fillerEncodingParams, fillerSourceFilePath, fillerOutputPath);
	});
};


/**
 * Stitch pre and post ad segment and save to cache
 * 
 * @action segment.stitch
 * @param segmentId
 * @param url1
 * @param url2
 * @param url3
 * @param offset
 * @param portion
 */
VidiunSegmentManager.prototype.stitch = function(request, response, params){
	params = this.parsePlayServerParams(response, params, ['segmentId', 'url1', 'url2', 'url3', 'offset', 'portion']);
	if(!params)
		return;
	
	response.dir(params);
	
	var This = this;
	var urls = [params.url1, params.url2, params.url3];
	var localPaths = [];
	for(var i = 0; i < urls.length; i++){
		localPaths[i] = VidiunConfig.config.cloud.sharedBasePath + '/segments/' + urls[i].md5();
	}
	VidiunUtils.downloadMultiHttpUrls(urls, localPaths, function(localPaths){
		if(response.headersSent){
			response.debug('Headers where alreay sent to the client, attempting to exec stich segment, original request probably got timed out!!!');
			This.exec(params.segmentId, params.offset, params.portion, localPaths, function(){
				VidiunCache.set(VidiunCache.getKey(VidiunCache.METADATA_READY_KEY_PREFIX, [params.segmentId]), true, VidiunConfig.config.cache.adMedia);
			}, function(err){
				response.error('Failed to stitch segment: ' + err);
			});
		}
		else{
			if(!This.run){
				response.log('Canceled');
				This.okResponse(response, 'Stopped', 'text/plain');
				return;
			}
			This.exec(params.segmentId, params.offset, params.portion, localPaths, function(){
				VidiunCache.set(VidiunCache.getKey(VidiunCache.METADATA_READY_KEY_PREFIX, [params.segmentId]), true, VidiunConfig.config.cache.adMedia, function(){
					response.debug('Handled');
					This.okResponse(response, 'OK', 'text/plain');								
				}, function(err){
					This.errorResponse(response, 500, err);
				});
			}, function(err){
				This.errorResponse(response, 500, err);
			});
		}
	}, 
	function(err){
		This.errorResponse(response, 500, err);
	});
};

module.exports.VidiunSegmentManager = VidiunSegmentManager;
