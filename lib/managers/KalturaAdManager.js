
var os = require('os');
var util = require('util');
var fs = require('fs');

var kaltura = module.exports = require('../KalturaManager');
kaltura.tsPreparer = require('../media/KalturaTsPreparer');
kaltura.tsPreparer.setLogger(KalturaLogger);

/**
 * @service ad
 */
var KalturaAdManager = function(){
};
util.inherits(KalturaAdManager, kaltura.KalturaManager);

/**
 * Save the ad media to cache
 * 
 * @param serverAdId
 * @param adPath
 */
KalturaAdManager.prototype.save = function(serverAdId, adPath){

	var serverAdKey = KalturaCache.getAdMedia(serverAdId);
	
	var ffprobePath = KalturaConfig.config.bin.binDir + '/ffprobe';
	if(KalturaConfig.config.bin.ffprobePath){
		ffprobePath = KalturaConfig.config.bin.ffprobePath;
	}

	KalturaLogger.debug('Saving path[' + adPath + '] server-ad [' + serverAdKey + ']');
	kaltura.tsPreparer.prepareTsFiles(ffprobePath, [adPath], function(err, data){
		if(err){
			KalturaLogger.error('Failed in prepareTsFiles for [' + serverAdKey + ']: ' + err);
			return;	
		}
		KalturaLogger.debug('Saving to cache' + serverAdKey + ']');
		kaltura.tsPreparer.savePreparedTsToMemcache(KalturaCache.binserverSet, serverAdKey, data, KalturaConfig.config.cache.adMedia, function(error){
			if(error){
				KalturaLogger.error('Failed to save in cache [' + serverAdKey + ']: ' + err);
				return;
			}			
			KalturaCache.set(KalturaCache.getMetadataReady(serverAdId), true, KalturaConfig.config.cache.adMedia);
		});
		
	});
};


/**
 * Executes ffmpef 
 * 
 * @param serverAdId
 * @param sourcePath
 * @param encodingParams
 */
KalturaAdManager.prototype.exec = function(serverAdId, sourcePath, encodingParams){
	var adPath = KalturaConfig.config.cloud.sharedBasePath + '/ad_transcode/' + serverAdId;
	var This = this;
	fs.exists(adPath, function(exists){
		if(exists){
			KalturaLogger.debug('File [' + adPath + '] already exists on the file system');
			This.save(serverAdId, adPath);
		}
		else{
			var ffmpegPath = KalturaConfig.config.bin.binDir + '/ffmpeg';
			if(KalturaConfig.config.bin && KalturaConfig.config.bin.ffmpegPath){
				ffmpegPath = KalturaConfig.config.bin.ffmpegPath;
			}
			
			var cmd = [
				ffmpegPath, 
				'-i',
				sourcePath, 
				encodingParams, 
				'-y',
				adPath];
			cmd = cmd.join(' ');
			
			cmd.exec(function(output){
				This.save(serverAdId, adPath);
			});			
		}		
	});

};


/**
 * Stitch ad
 * 
 * @action ad.stitch
 * 
 * @param serverAdId
 * @param url
 * @param headers
 * @param encodingId
 */
KalturaAdManager.prototype.stitch = function(request, response, params){
	params = this.parsePlayServerParams(response, params, ['serverAdId', 'encodingId', 'sharedFilePath']);
	if(!params)
		return;
	
	response.dir(params);

	var This = this;
		
	var encodingKey = KalturaCache.getEncodingParams(params.encodingId);
	KalturaCache.get(encodingKey, function(encodingParams){
		response.debug('handled');
		response.writeHead(200);
		response.end('OK');
			
		This.exec(params.serverAdId, params.sharedFilePath, encodingParams);
	}, function(err){
		response.error(msg);
		This.errorResponse(response, 500, msg);
	});

};


module.exports.KalturaAdManager = KalturaAdManager;
