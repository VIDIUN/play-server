var util = require('util');

var vidiun = module.exports = require('../VidiunManager');

/**
 * @service system
 */
var VidiunSystemManager = function(){};
util.inherits(VidiunSystemManager, vidiun.VidiunManager);

/**
 * check if server is up
 * 
 * @action ping.
 * 
 */
VidiunSystemManager.prototype.ping = function(request, response, params){
	return this.okResponse(response, 'OK', 'text/plain');			
};


module.exports.VidiunSystemManager = VidiunSystemManager;
