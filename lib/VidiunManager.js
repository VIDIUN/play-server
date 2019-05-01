
var util = require('util');

var vidiun = module.exports = require('./VidiunBase');
vidiun.client = require('./client/VidiunClient');
require('./utils/VidiunUiConfParser');

var VidiunManager = function() {
};
util.inherits(VidiunManager, vidiun.VidiunBase);

/**
 * @type VidiunClient
 */
VidiunManager.prototype.client = null;

/**
 * @type VidiunConfiguration
 */
VidiunManager.prototype.clientConfig = null;

/**
 * @type boolean indicates that the client session started and could be used
 */
VidiunManager.prototype.sessionReady = null;

/**
 * Instantiate the client lib and start session
 */
VidiunManager.prototype.initClient = function(config, callback){
	VidiunLogger.log('Initializing client');
	this.clientConfig = new vidiun.client.VidiunConfiguration(parseInt(config.partnerId));
	
	for(var configKey in config)
		this.clientConfig[configKey] = config[configKey];

	this.clientConfig.setLogger(VidiunLogger);
	this.clientConfig.clientTag = 'play-server-' + this.hostname;

	var This = this;
	
	var type = vidiun.client.enums.VidiunSessionType.ADMIN;
	this.sessionReady = false;
	this.client = new vidiun.client.VidiunClient(this.clientConfig);
	var vsTimer = config.expiry;
	if(!vsTimer){
		vsTimer =  86400*1000 - 1000;
	}		
	this.client.session.start(function(vs){
		if(vs){
			This.client.setVs(vs);
			This.sessionReady = true;
			setTimeout(function(){ This.initClient(config, callback); }, vsTimer, config, callback);
			if(callback){
				callback();
			}			
		}
		else{
			VidiunLogger.error('Failed to start client session');
			vsTimer = 2*1000;
			setTimeout(function(){ This.initClient(config, callback); }, vsTimer, config, callback);
			if(callback){
				callback();
			}
		}

	}, config.secret, config.userId, type, config.partnerId, config.expiry, config.privileges);
};

VidiunManager.prototype.impersonate = function(partnerId){
	this.clientConfig.partnerId = partnerId;
	this.client.setConfig(this.clientConfig);		
};

VidiunManager.prototype.unimpersonate = function(config){
	this.clientConfig.partnerId = config.partnerId;
	this.client.setConfig(this.clientConfig);	
};

VidiunManager.prototype.getMissingParams = function(params, requiredParams){
	var missingParams = [];
	for(var i = 0; i < requiredParams.length; i++){
		var requiredParam = requiredParams[i];
		if(typeof params[requiredParam] === 'undefined'){
			missingParams.push(requiredParam);
		}
	}
	return missingParams;
};


VidiunManager.prototype.parsePlayServerParams = function(response, playServerParams, requiredParams){
	if (playServerParams.signature != this.getSignature(playServerParams.data)) {
		response.error('Wrong signature received signature [' + playServerParams.signature + '] + for data [' + playServerParams.data + '] should be [' + this.getSignature(playServerParams.data) + ']');
		this.errorResponse(response, 403, 'Forbidden\n');
		return null;
	}
	
	var str = new Buffer(playServerParams.data, 'base64').toString('ascii');
	var params = JSON.parse(str);
	params.partnerId = playServerParams.partnerId;
	var missingParams = this.getMissingParams(params, requiredParams);
	if(missingParams.length){
		response.error('Missing arguments [' + missingParams.join(', ') + ']');
		this.errorMissingParameter(response);
		return null;
	}
		
	return params;
};

VidiunManager.prototype.start = function(){
	this.run = true;
};

VidiunManager.prototype.stop = function(){
	this.run = false;
};

VidiunManager.prototype.restore = function(request, response, params){
	params = this.parsePlayServerParams(response, params, ['action', 'params']);
	if(!params)
		return;

	VidiunLogger.dir(params);
	
	this.callRestorableAction(params.service, params.action, params.params);

	response.debug('Restored');
	response.writeHead(200);
	response.end();
};

/**
 * check if the play server feature is allowed for partner
 * @param partner id
 * @param permissonName
 * @param callback
 */
VidiunManager.prototype.isPermissionAllowedForPartner = function(partnerId, permissonName, callback){
	var This = this;
	
	var checkIfPermissionAllowed = function(){
		var filter = new vidiun.client.objects.VidiunPermissionFilter();
		filter.nameEqual = permissonName;
		
		pager = new vidiun.client.objects.VidiunFilterPager();
		pager.pageSize = 1;
		
		This.impersonate(partnerId);
		This.client.permission.listAction(function(result) {
			This.unimpersonate(VidiunConfig.config.client);
			if(!result){
				callback(false);
			}
			else if(result.objectType == 'VidiunAPIException'){
				VidiunLogger.error('Client [permission.list][' + result.code + ']: ' + result.message);
				callback(false);
			}
			else{
				if(result.totalCount && result.objects[0].name == permissonName){
					callback(true);
				}
				else{
					callback(false);
				}	
			}
		}, filter, pager);
	};
	
	if(!This.sessionReady){
		This.initClient(VidiunConfig.config.client, function(){
			checkIfPermissionAllowed();
		});
	}
	else{
		checkIfPermissionAllowed();
	}
};

/**
 * Get flavor asset download URL
 * @param partner id
 * @param flavor asset id
 * @param callback
 */
VidiunManager.prototype.getFlavorUrl = function(partnerId, flavorAssetId, callback){
	var This = this;
	
	var callGetFlavorUrl = function(){		
		This.impersonate(partnerId);
		This.client.flavorAsset.getUrl(function(result) {
			This.unimpersonate(VidiunConfig.config.client);
			if(!result){
				callback(null);
			}
			else if(result.objectType == 'VidiunAPIException'){
				VidiunLogger.error('Client [flavor.getUrl][' + result.code + ']: ' + result.message);
				callback(null);
			}
			else{	
				callback(result);
			}
		}, flavorAssetId);
	};
	
	if(!This.sessionReady){
		This.initClient(VidiunConfig.config.client, function(){
			callGetFlavorUrl();
		});
	}
	else{
		callGetFlavorUrl();
	}
};

/**
 * get the current ui conf config file from Vidiun and store it in the cache
 * @param uiConfId
 * @param entryId
 * @param partnerId
 * @param callback
 */
VidiunManager.prototype.loadUiConfConfig = function(uiConfId, entryId, partnerId, callback){
	var callUiConfGetService = function(uiConfId){
		try{
			This.impersonate(partnerId);
			This.client.uiConf.get(function(result){
				This.unimpersonate(VidiunConfig.config.client);
				if(!result){
					callback(null);
				}
				else if(result.objectType == 'VidiunAPIException'){
					VidiunLogger.error('Client [uiConf.get][' + result.code + ']: ' + result.message);
					callback(null);
				}
				else{
					var uiConfConfig = VidiunUiConfParser.parseUiConfConfig(uiConfId, JSON.parse(result.config));
					var uiConfConfigId = VidiunCache.getUiConfConfigId(uiConfConfig);
					var uiConfConfigKey = VidiunCache.getKey(VidiunCache.UI_CONF_CONFIG_KEY_PREFIX, [uiConfConfigId]);
					VidiunCache.set(uiConfConfigKey, uiConfConfig, VidiunConfig.config.cache.masterManifest, function(){
						if(callback){
							callback(uiConfConfig);
						}										
					});			
				}
			}, uiConfId);
		}
		catch(e){
			VidiunLogger.error('Client failed to retrive ui conf [' + uiConfId + '] for entry [' + entryId + ']');
			callback(null);
		}
	};
	
	var This = this;
	
	if(!This.sessionReady){
		This.initClient(VidiunConfig.config.client, function(){
			callUiConfGetService(uiConfId);
		});
	}
	else{
		callUiConfGetService(uiConfId);
	}
};

module.exports.VidiunManager = VidiunManager;
