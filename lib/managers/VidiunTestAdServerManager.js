var util = require('util');

var vidiun = module.exports = require('../VidiunManager');

/**
 * @service testAdServer
 * 
 * The service is intended for testing purposes. It simulates different VAST responses for different users
 */
var VidiunTestAdServerManager = function(){
	this.vastPool = [];
	if(VidiunConfig.config.testAdServer.vastUrls){
		this.vastPool = VidiunConfig.config.testAdServer.vastUrls.split(',');
	}
};
util.inherits(VidiunTestAdServerManager, vidiun.VidiunManager);

/**
 * Dummy ad server
 * 
 * @action getVast.
 * 
 * @param eventType
 */
VidiunTestAdServerManager.prototype.getVast = function(request, response, params){
	response.dir(params);
	if(this.vastPool.length == 0){
		response.end('Vast pool is empty');
		return;
	}
	var randomAdId = Math.floor(Math.random()*this.vastPool.length);
	var This = this;
	var vastUrl = this.vastPool[randomAdId];
	VidiunLogger.log('selected vast url: ' + vastUrl);
	VidiunUtils.getHttpUrl(vastUrl, null, function(vastContent){
		response.log('handled');
		This.okResponse(response, vastContent, 'text/xml');		
		},function (err) {
			response.end('Vast not found due to error :' + err );
	});
};

/**
 * Dummy ad server
 * 
 * @action trackBeacon.
 * 
 * @param eventType
 */
VidiunTestAdServerManager.prototype.trackBeacon = function(request, response, params){
	response.log('Handled beacon');
	response.dir(params);
	response.writeHead(200);
	response.end('OK');
};

module.exports.VidiunTestAdServerManager = VidiunTestAdServerManager;
