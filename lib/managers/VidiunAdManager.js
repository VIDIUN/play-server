
var os = require('os');
var util = require('util');
var fs = require('fs');

var vidiun = module.exports = require('../VidiunManager');
vidiun.tsPreparer = require('../media/VidiunTsPreparer');
vidiun.tsPreparer.setLogger(VidiunLogger);

/**
 * @service ad
 */
var VidiunAdManager = function(){
	var ffmpegQueueCounterKey = VidiunCache.getKey(VidiunCache.FFMPEG_QUEUE_COUNTER, [this.hostname]);
	VidiunCache.add(ffmpegQueueCounterKey, 0, VidiunConfig.config.cache.cuePoint * 2, 
		function(){ VidiunLogger.log('Init key [' + ffmpegQueueCounterKey + '] successfuly.') }, 
		function(err){}
	);
};
util.inherits(VidiunAdManager, vidiun.VidiunManager);

/**
 * Save the ad media to cache
 * 
 * @param serverAdId
 * @param adPath
 */
VidiunAdManager.prototype.save = function(serverAdId, adPath){

	var serverAdKey = VidiunCache.getKey(VidiunCache.AD_MEDIA_KEY_PREFIX, [serverAdId]);
	var adTsPath = VidiunUtils.buildFilePath('ad_ts', serverAdId);
	
	var writeTsFile = function(data){
		VidiunUtils.createFilePath(adTsPath, function(){
			var fd = fs.createWriteStream(adTsPath);
			fd.on('finish', function () {
				  VidiunLogger.log('Ad ts saved to file system [' + adTsPath + ']');
			});
			
			VidiunUtils.writeToFileByLength(fd, data.metadata);
			VidiunUtils.writeToFileByLength(fd, data.data);
			VidiunUtils.writeToFileByLength(fd, data.header);

			fd.end();					
		});
	};
	
	var readTsFile = function(callback, errorCallback){		
		var readAllItems = function(fd, callback, errorCallback){
			var data = {};
			VidiunUtils.readFromFileByLength(fd, function(metadata){
				data.metadata = metadata;
				VidiunUtils.readFromFileByLength(fd, function(dataVal){
					data.data = dataVal;
					VidiunUtils.readFromFileByLength(fd, function(header){
						data.header = header;
						callback(data);
					}, errorCallback);
				}, errorCallback);				
			}, errorCallback);		
		};
				
		fs.open(adTsPath, 'r', function(err, fd){
			if(err){
				errorCallback(err);
				return;
			}
			readAllItems(fd, function(data){
				fs.close(fd);
				callback(data);
			}), function(err){
				fs.close(fd);
				callback(data);
			};
		});
	};
	
	fs.exists(adTsPath, function(exists){
		if(exists){
			VidiunLogger.debug('Ad prepared ts at [' + adTsPath + '] already exists on the file system');
			readTsFile(function(data){
				VidiunLogger.debug('Saving to cache [' + serverAdKey + ']');
				vidiun.tsPreparer.savePreparedTsToMemcache(VidiunCache, serverAdKey, data, VidiunConfig.config.cache.adMedia, function(error){
					if(error){
						VidiunLogger.error('Failed to save in cache [' + serverAdKey + ']: ' + error);
						return;
					}			
					VidiunCache.set(VidiunCache.getKey(VidiunCache.METADATA_READY_KEY_PREFIX, [serverAdId]), true, VidiunConfig.config.cache.adMedia);
				});							
			}, function(err){
				VidiunLogger.error('Failed to get ts data from file system [' + adTsPath + ']: ' + err);
				return;
			});
		}
		else{
			var ffprobePath = VidiunConfig.config.bin.binDir + '/ffprobe';
			if(VidiunConfig.config.bin.ffprobePath){
				ffprobePath = VidiunConfig.config.bin.ffprobePath;
			}

			VidiunLogger.debug('Saving path[' + adPath + '] server-ad [' + serverAdKey + ']');
			
			vidiun.tsPreparer.prepareTsFiles(ffprobePath, [adPath], function(err, data){
				if(err){
					VidiunLogger.error('Failed in prepareTsFiles for [' + serverAdKey + ']: ' + err);
					return;	
				}
				//permanently save ts's on file system
				writeTsFile(data);
			
				VidiunLogger.debug('Saving to cache [' + serverAdKey + ']');
				vidiun.tsPreparer.savePreparedTsToMemcache(VidiunCache, serverAdKey, data, VidiunConfig.config.cache.adMedia, function(error){
					if(error){
						VidiunLogger.error('Failed to save in cache [' + serverAdKey + ']: ' + error);
						return;
					}			
					VidiunCache.set(VidiunCache.getKey(VidiunCache.METADATA_READY_KEY_PREFIX, [serverAdId]), true, VidiunConfig.config.cache.adMedia);
				});				
			});			
		}		
	});
};


/**
 * Executes ffmpef 
 * 
 * @param serverAdId
 * @param sourcePath
 * @param encodingParams
 */
VidiunAdManager.prototype.exec = function(serverAdId, sourcePath, encodingParams, retry){
	var adPath = VidiunUtils.buildFilePath('ad_transcode', serverAdId);
	var This = this;
	fs.exists(adPath, function(exists) {
	        if (exists) {
        	    VidiunLogger.debug('File [' + adPath + '] already exists on the file system');
       		    This.save(serverAdId, adPath);
	        }
        	else {
	            var ffmpegPath = VidiunConfig.config.bin.binDir + '/ffmpeg';
        	    if (VidiunConfig.config.bin && VidiunConfig.config.bin.ffmpegPath) {
                	ffmpegPath = VidiunConfig.config.bin.ffmpegPath;
	            }
            
        	    var maxFfmpegProcesses = 20;
	            if(VidiunConfig.config.ad.ffmpeg_max_processes){
        	        maxFfmpegProcesses = parseInt(VidiunConfig.config.ad.ffmpeg_max_processes);
	            }	

        	    var sleepInterval = 2;
	            if(VidiunConfig.config.ad.sleepInterval){
        	        sleepInterval = parseInt(VidiunConfig.config.ad.sleepInterval);
	            }
		    var maxRetry = 50;
                    if(VidiunConfig.config.ad.ffmpegMaxRetry){
                        maxRetry = parseInt(VidiunConfig.config.ad.ffmpegMaxRetry);
                    }


        	    var tempPath = VidiunConfig.config.cloud.sharedBasePath + '/tmp/' + VidiunUtils.getUniqueId();
	            var cmd = [ffmpegPath, '-i', sourcePath, encodingParams, '-y', tempPath];
        	    cmd = cmd.join(' ');

		    var ffmpegQueueCounterKey = VidiunCache.getKey(VidiunCache.FFMPEG_QUEUE_COUNTER, [This.hostname]);
	            VidiunCache.incr(ffmpegQueueCounterKey, 1,
        	        function (data) {
			    VidiunCache.touch(ffmpegQueueCounterKey, VidiunConfig.config.cache.cuePoint * 2);
                	    var slot = data % maxFfmpegProcesses;
	                    var ffmpegSlotKey = VidiunCache.getKey(VidiunCache.FFMPEG_SLOT, [slot, This.hostname]);
	                    VidiunCache.add(ffmpegSlotKey, 1, VidiunConfig.config.cache.cuePoint / 2,
        	                function () {
                	            VidiunLogger.log('Locked [' + ffmpegSlotKey + ']. Running ffmpeg cmd: [' + cmd + ']')
                        	    cmd.exec(function (output) {
                                	VidiunCache.del(ffmpegSlotKey);
	                                VidiunLogger.log('Moving temp file[' + tempPath + '] to [' + adPath + ']');
        	                        VidiunUtils.createFilePath(adPath, function () {
                	                    fs.rename(tempPath, adPath,
                        	                function () {
                                	            This.save(serverAdId, adPath);
                                        	},
	                                        function (error) {
        	                                    VidiunLogger.error('Failed to transcode [' + sourcePath + '] encoding params [' + encodingParams + '],' + error);
                	                        });
                        	        });
	                            });
        	                },
                	        function (err) {
				    if (retry < maxRetry) {
	                        	    VidiunLogger.error('Failed to lock [' + ffmpegSlotKey + '] for sourcePath [' + sourcePath + '] retry count [' + retry + ']. Retrying in [' + sleepInterval*retry + '] seconds.')
		                            setTimeout(function () {This.exec(serverAdId, sourcePath, encodingParams, retry + 1);}, sleepInterval*1000*retry);
				    } else {
					VidiunLogger.error('Failed to lock [' + ffmpegSlotKey + '] for sourcePath [' + sourcePath + '] after [' + maxRetry + '] retries. Quitting');
				    }
        	                }
	                    );
                	},
        	        function (err) {
                 	   VidiunLogger.error('Error getting [' + ffmpegQueueCounterKey + ']. Init key value and retrying in [' + sleepInterval + '] seconds.');
	        	   VidiunCache.add(ffmpegQueueCounterKey, 0, VidiunConfig.config.cache.cuePoint * 2,
                		function(){ VidiunLogger.log('Init key [' + ffmpegQueueCounterKey + '] successfuly.') },
		                function(err){}
			        );
	                   setTimeout(function () {This.exec(serverAdId, sourcePath, encodingParams, retry + 1);}, sleepInterval * 1000);
	                });
        	}
	    })
	}


/**
 * Stitch ad
 * 
 * @action ad.stitch
 * 
 * @param serverAdId
 * @param url
 * @param headers
 * @param renditionId
 */
VidiunAdManager.prototype.stitch = function(request, response, params){
	params = this.parsePlayServerParams(response, params, ['serverAdId', 'renditionId', 'sharedFilePath']);
	if(!params)
		return;
	
	response.dir(params);

	var This = this;
		
	var encodingKey = VidiunCache.getKey(VidiunCache.ENCODING_PARAMS_KEY_PREFIX, [params.renditionId]);
	VidiunCache.get(encodingKey, function(encodingParams){
		response.debug('handled');
		This.okResponse(response, 'OK', 'text/plain');
			
		This.exec(params.serverAdId, params.sharedFilePath, encodingParams, 1);
	}, function(err){
		response.error(err);
		This.errorResponse(response, 500, err);
	});

};


module.exports.VidiunAdManager = VidiunAdManager;
