
var os = require('os');
var util = require('util');
var crypto = require('crypto');
var querystring = require('querystring');
var url = require('url');

var vidiun = {
	client: require('./client/VidiunClient')
};

require('./utils/VidiunUtils');
require('./utils/VidiunConfig');
require('./utils/VidiunCache');
require('./utils/VidiunLogger');

var VidiunBase = function() {
};

VidiunBase.processData = null;
VidiunBase.prototype = {
	hostname: os.hostname(),

	getSignature : function(data){
		return (VidiunConfig.config.cloud.secret + data).md5();
	},

	callPlayServerService : function(service, action, partnerId, params, headers, successCallback, failureCallback){
		if(params && params.partnerId){
			delete params.partnerId;
		}
		var data = new Buffer(JSON.stringify(params)).toString('base64');
		var signedParams = {
			data: data, 
			signature: this.getSignature(data)
		};
		
		var playServerUrl = this.getPlayServerUrl(service, action, partnerId, signedParams);
		VidiunLogger.log('Call [' + playServerUrl + ']');
		VidiunUtils.getHttpUrl(playServerUrl, headers, successCallback, failureCallback);
	},

	encrypt : function(params, encryptedParams){
		var cipher = crypto.createCipher('AES-256-CBC', VidiunConfig.config.cloud.secret);

		var encrypted;
		try{
			encrypted = cipher.update(querystring.stringify(encryptedParams), 'utf8', 'base64');
			encrypted += cipher.final('base64');
		}
		catch(exception){
			VidiunLogger.error(exception.stack);
			return null;
		}
		
		params.e = encrypted.split('/').join('_');
		return params;
	},

	decrypt : function(params){
		var decipher = crypto.createDecipher('AES-256-CBC', VidiunConfig.config.cloud.secret);

		var encrypted = params.e.split('_').join('/');
		delete params.e;
		
		var decrypted;
		try{
			decrypted = decipher.update(encrypted, 'base64', 'utf8');
			decrypted += decipher.final('utf8');
		}
		catch(exception){
			VidiunLogger.error(exception.stack);
			return null;
		}
		
		var decryptedParams = querystring.parse(decrypted);
		
		for(var key in decryptedParams){
			params[key] = decryptedParams[key];
		}
		
		return params;
	},

	getPlayServerUrl : function(service, action, partnerId, params, encryptedParams, domain){
		if(!domain && VidiunConfig.config[service].domain){
			domain = VidiunConfig.config[service].domain;
		}
		if(!domain){
			domain = VidiunConfig.config.cloud.domain;
		}
				
		var port = VidiunConfig.config[service].domainPort;
		if(!port){
			port = VidiunConfig.config.cloud.httpPort;
		}
		
		if(!params){
			params = {};
		}
		
		if(params.partnerId){
			delete params.partnerId;
		}
		
		if(encryptedParams && typeof encryptedParams != 'undefined'){
			params = this.encrypt(params, encryptedParams);
		}
		
		var playServerUrl = 'http://' + domain + ':' + port;
		playServerUrl += '/p/' + partnerId;
		playServerUrl += '/' + service + '/' + action;
		playServerUrl += '?' + querystring.stringify(params);
		
		return playServerUrl;
	},

	callRestorableAction : function(service, action, params){
		var actionId = VidiunUtils.getUniqueId();
		
		var actionData = {
			actionId: actionId, 
			service: service, 
			action: action, 
			params: params
		};
		
		var This = this;
		this[action](params, function(){
			This.unstoreAction(actionData);
		});
		
		this.storeAction(actionData);
	},

	restoreAction : function(actionData){
		VidiunLogger.debug('Action [' + actionData.actionId + ']');
		actionData.params.restored = true;
		this.callPlayServerService(actionData.service, 'restore', actionData.params.partnerId, actionData);
	},

	storeAction : function(actionData){
		VidiunLogger.debug('Action [' + actionData.actionId + ']');

		var savedSuccessfully = function(err){
			VidiunLogger.debug('Action [' + actionData.actionId + '] saved successfully');	
		};
		
		var processActionsKey = VidiunCache.getKey(VidiunCache.PROCESS_ACTIONS_KEY_PREFIX, [VidiunCache.getPid()]);
		if(VidiunBase.processData){
			VidiunBase.processData[actionData.actionId] = actionData;
			VidiunCache.set(processActionsKey, VidiunBase.processData, VidiunConfig.config.cache.restoreableAction, savedSuccessfully);
		}
		else{
			VidiunBase.processData = {};
			VidiunBase.processData[actionData.actionId] = actionData;
			VidiunCache.add(processActionsKey, VidiunBase.processData, VidiunConfig.config.cache.restoreableAction, function(){
				VidiunBase.processActionsInterval = setInterval(function(){
					VidiunCache.set(processActionsKey, VidiunBase.processData, VidiunConfig.config.cache.restoreableAction);
				}, (VidiunConfig.config.cache.restoreableAction - 5) * 1000);
				savedSuccessfully();
			}, function(err){
				VidiunCache.set(processActionsKey, VidiunBase.processData, VidiunConfig.config.cache.restoreableAction, savedSuccessfully, function(err){});
			});
		}
	},

	unstoreAction : function(actionData){
		VidiunLogger.debug('Action [' + actionData.actionId + ']');
		
		delete VidiunBase.processData[actionData.actionId];
		
		var processActionsKey = VidiunCache.getKey(VidiunCache.PROCESS_ACTIONS_KEY_PREFIX, [VidiunCache.getPid()]);
		VidiunCache.set(processActionsKey, VidiunBase.processData, VidiunConfig.config.cache.restoreableAction);
	},

	setCookie : function(response, key, value, maxAge) {
		var options = {};
		
		if(maxAge){
			options.maxAge = maxAge;
		}
		
		response.setHeader('Set-Cookie', [key + '=' + value, options]);
	},

	getCookie : function(request, cookie) {
		if(!request.headers.cookie)
			return null;
		
	    var cookies = request.headers.cookie.split(';');
		for(var i = 0; i < cookies.length; i++) {
			var parts = cookies[i].split('=');
			if(parts.shift().trim() == cookie){
				return unescape(parts.join('='));
			}
		};
		return null;
	},

	okResponse: function(response, body, contentType){
		if(!response.headersSent) {

		response.writeHead(200, {
			'Content-Type' : contentType,
			'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
			'Pragma': 'no-cache',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
		});
		response.end(body);		
		}
	},
	
	redirectResponse: function(response, location){
		if(!response.headersSent) {

		response.writeHead(302, {
			'Location' : location,
			'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
			'Pragma': 'no-cache',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
		});
		response.end();		
		}
	},
	
	dumpResponse: function(response, location){
		parsedUrl = url.parse(location);
		var options = {
			hostname : parsedUrl.hostname,
			port : parsedUrl.port,
			path : parsedUrl.path,
			method : 'GET',
		};

		var This = this;
		var httpModule = VidiunUtils.getHttpModuleByProtocol(parsedUrl.protocol);
		var request = httpModule.request(options, function(downloadResponse) {
			if (downloadResponse.statusCode != 200) {
				This.errorResponse(response, downloadResponse.statusCode, 'Failed to download url [' + location + ']');
				return;
			}
			downloadResponse.on('data', function(data) {
				response.write(data);		
			});
			downloadResponse.on('end', function() {
				response.log('Finished downloading from url [' + location + ']');
				response.end();			
			});
		});

		request.on('error', function(e) {
			This.errorResponse(response, 404, 'Failed to download url [' + location + ']');
		});

		request.end();			
	},
	
	errorResponse : function(response, statusCode, body) {
		if(!response.headersSent){
			response.writeHead(statusCode, {
				'Content-Type' : 'text/plain',
				'Access-Control-Allow-Origin' : '*',
				'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
				'Pragma': 'no-cache'
			});
			response.end(body);
		}
	},

	errorFileNotFound : function(response) {
		this.errorResponse(response, 404, 'Not found!\n');
	},

	errorMissingParameter : function(response) {
		this.errorResponse(response, 400, 'Missing parameter\n');
	},

	errorFaultyParameter : function(response) {
		this.errorResponse(response, 400, 'Faulty parameter\n');
	}
};

module.exports.VidiunBase = VidiunBase;
