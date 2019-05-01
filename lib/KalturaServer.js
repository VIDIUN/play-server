
var os = require('os');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mime = require('mime');
var util = require('util');
var http = require('http');
var https = require('https');
var cluster = require('cluster');
var querystring = require('querystring');

var vidiun = module.exports = require('./VidiunBase');

var VidiunServer = function(){
};
util.inherits(VidiunServer, vidiun.VidiunBase);

VidiunServer.prototype.hostname = os.hostname();
VidiunServer.prototype.httpWebServer = null;
VidiunServer.prototype.httpsWebServer = null;
VidiunServer.prototype.processesToRestore = null;



VidiunServer.prototype.init = function() {
	this.startWebServers();
	try {
		this.DEBUG_ENABLED = VidiunConfig.config.bin.debug.enabled;
		this.DEBUG_PORT = parseInt(VidiunConfig.config.bin.debug.port);
	} catch (ex) {
		this.DEBUG_ENABLED = 'false';
	}
};

VidiunServer.prototype.startWebServers = function() {
    this.httpWebServer = http.createServer();
    
    if(VidiunConfig.config.cloud.httpsPort){
    	if(!VidiunConfig.config.cloud.keyFilePath || !VidiunConfig.config.cloud.certFilePath){
    		VidiunLogger.log('Unable to locate keyFilePath || certFilePath in the configuration file. Https listener will not be created');
    		return;
    	}
    	var keyFilePath = VidiunConfig.config.cloud.keyFilePath;
    	var certFielPath = VidiunConfig.config.cloud.certFilePath;
    	
    	var options = {
    			  key: fs.readFileSync(keyFilePath),
    			  cert: fs.readFileSync(certFielPath)
    	};
        
        this.httpsWebServer = https.createServer(options);
    }
};

VidiunServer.prototype.isDebugEnabled = function(){
	return this.DEBUG_ENABLED == 'true';
};


var VidiunMainProcess = function(){
	VidiunLogger.log('\n\n_____________________________________________________________________________________________');
	VidiunLogger.log('Play-Server started'); // TODO add version
	
	this.init();
	this.run = true;
	this.childProcesses = {};

	cluster.setupMaster({
		args: [JSON.stringify(VidiunConfig.config)]
	});
	
	this.start();
	
	var This = this;
	
	cluster.on('listening', function(worker, address) {
		VidiunLogger.log('A process [' + worker.process.pid + '] is now connected, processes to restore [' + JSON.stringify(This.processesToRestore) + ']');
		if(This.processesToRestore){
			var processes = This.processesToRestore;
			This.processesToRestore = null;
			This.restoreServerProcesses(processes);
		}		
	});
	process.on('SIGUSR1', function() {
		VidiunLogger.log('Got SIGUSR1. Invoke log rotate notification.');
		This.notifyLogsRotate();
	});
		
	VidiunConfig.watchFiles(function(){
		This.restart();
	});
};
util.inherits(VidiunMainProcess, VidiunServer);

VidiunMainProcess.prototype.start = function(){
	VidiunLogger.log('Starting all child processes');
	this.run = true;
	
	var numOfCores = os.cpus().length;
	if(this.isDebugEnabled()) {
		numOfCores = 1; // at this point we can debug only one node js
	}
	var processes = [process.pid];
	for (var i = 0; i < numOfCores; i++) {
		var childProcess = this.spawn();
		processes.push(childProcess.process.pid);
		VidiunLogger.log('Started process [' + childProcess.process.pid + ']');
	}
	
	var serverProcessesKey = VidiunCache.getKey(VidiunCache.SERVER_PROCESSES_KEY_PREFIX, [os.hostname()]);
	var This = this;
	VidiunCache.get(serverProcessesKey, function(data){
		if(data){
			This.processesToRestore = data;
			VidiunLogger.log('Processes to restore [' + JSON.stringify(This.processesToRestore) + ']');
		}

		This.storeServerProcesses(processes);
	});
};

VidiunMainProcess.prototype.storeServerProcesses = function(processes){
	VidiunLogger.log('Processes to store [' + JSON.stringify(processes) + ']');
	
	var serverProcessesKey = VidiunCache.getKey(VidiunCache.SERVER_PROCESSES_KEY_PREFIX, [os.hostname()]);	
	VidiunCache.set(serverProcessesKey, processes, VidiunConfig.config.cache.serverProcess, function(){
		setInterval(function(){
			VidiunCache.set(serverProcessesKey, processes, VidiunConfig.config.cache.serverProcess);
		}, (VidiunConfig.config.cache.serverProcess - 5) * 1000);
	});
};

VidiunMainProcess.prototype.restoreServerProcesses = function(processes){
	VidiunLogger.log('restoring server processes');
	for(var i = 0; i < processes.length; i++){
		this.restoreServerProcess(processes[i]);
	}
};

VidiunMainProcess.prototype.restoreServerProcess = function(pid){
	var This = this;
	var processActionsKey = VidiunCache.getKey(VidiunCache.PROCESS_ACTIONS_KEY_PREFIX, [VidiunCache.getPid(pid)]);
	VidiunCache.get(processActionsKey, function(actions){
		if(actions){
			This.restoreProcessActions(actions);
			VidiunCache.del(processActionsKey);
		}
	});
};

VidiunMainProcess.prototype.restoreProcessActions = function(actions){
	VidiunLogger.log('Restore process actions [' + JSON.stringify(actions) + ']');
	for(var actionId in actions){
		this.restoreAction(actions[actionId]);
	}
};

VidiunMainProcess.prototype.spawn = function(){
	if(this.isDebugEnabled()) {
		if ( process.execArgv.length != 0 ){
			var lastArg = process.execArgv.pop();
			if (lastArg && (typeof lastArg !== 'undefined') && lastArg.indexOf('--debug=')==-1)
				process.execArgv.push(lastArg);
		}
		process.execArgv.push('--debug=' + this.DEBUG_PORT++);
	}
	var childProcess = cluster.fork();
	var This = this;
	childProcess.on('exit', function(code){
		This.onProcessExit(childProcess, code);
	});
	this.childProcesses[childProcess.process.pid] = childProcess;
	
	return childProcess;
};

VidiunMainProcess.prototype.onProcessExit = function(childProcess, code){
	var pid = childProcess.process.pid;
	delete this.childProcesses[pid];
	VidiunLogger.log('Process died [' + pid + '] , code [' + code + ']');
	
	if(this.run){
		var childProcess = this.spawn();
		VidiunLogger.log('Restarted process [' + childProcess.process.pid + ']');

		this.restoreServerProcess(pid);

		var processes = [];
		for (var pid in this.childProcesses) {
			processes.push(pid);
		}
		this.storeServerProcesses(processes);
	}
};

VidiunMainProcess.prototype.stop = function() {
	VidiunLogger.log('Stopping all child processes');
	this.run = false;
	for ( var pid in this.childProcesses) {
		this.childProcesses[pid].send('stop');
	}
};

VidiunMainProcess.prototype.restart = function() {
	VidiunLogger.log('Restarting all child processes');
	this.stop();
	this.start();
};

VidiunMainProcess.prototype.notifyLogsRotate = function() {
	VidiunLogger.log('Log rotate main process');
	VidiunLogger.notifyLogsRotate();
	for ( var pid in this.childProcesses) {
		VidiunLogger.log('Log rotate child process [' + pid + ']');
		this.childProcesses[pid].send('notifyLogsRotate');
	}
};

var VidiunChildProcess = function(){
	process.on('uncaughtException', function (err) {
	    VidiunLogger.error('Uncaught Exception: ' + err.stack);
	}); 

	var This = this;
	process.on('message', function(action) {
		if(typeof This[action] === 'function'){
			This[action].apply(This);
		}
	});
	  
	this.init();
	this.managers = {};
	this.start();
};
util.inherits(VidiunChildProcess, VidiunServer);

VidiunChildProcess.prototype.start = function(){
	this.startHttpServer();
	if(this.httpsWebServer){
		this.startHttpsServer();
	}
};

VidiunChildProcess.prototype.startHttpServer = function() {
	var httpPort = VidiunConfig.config.cloud.httpPort;
	VidiunLogger.log('Listening on port [' + httpPort + ']');
	var This = this;
	this.httpWebServer.on('request', function(request, response) {
		return This.handleRequest(request, response);
	});
	this.httpWebServer.listen(httpPort);
};

VidiunChildProcess.prototype.startHttpsServer = function() {
	var httpsPort = VidiunConfig.config.cloud.httpsPort;
	
	VidiunLogger.log('Listening on port [' + httpsPort + ']');
	var This = this;
	this.httpsWebServer.addListener('request', function(request, response) {
		return This.handleRequest(request, response);
	});
	this.httpsWebServer.listen(httpsPort);
};

VidiunChildProcess.prototype.stop = function(){
	for(var serviceName in this.managers){
		var service = this.managers[serviceName];
		VidiunLogger.log('Stopping service [' + serviceName + ']');
		service.stop();
	}
};

VidiunChildProcess.prototype.notifyLogsRotate = function(){
	VidiunLogger.notifyLogsRotate();
};

VidiunChildProcess.prototype.parseUrl = function(urlInfo) {
	var pathParts = urlInfo.pathname.split('/');
	if(pathParts.length < 5)
		return null;

	urlInfo.service = pathParts[3][0].toUpperCase() + pathParts[3].substr(1);
	urlInfo.action = pathParts[4];
	urlInfo.params = querystring.parse(urlInfo.query);
	urlInfo.params.partnerId = pathParts[2];
	
	var paramName = null;
	for(var i = 5; i < pathParts.length; i++){
		if(paramName == null){
			paramName = pathParts[i];
		}
		else{
			urlInfo.params[paramName] = pathParts[i];
			paramName = null;
		}
	}
	
	return urlInfo;
};

VidiunChildProcess.prototype.handleRequest = function(request, response) {
	VidiunLogger.access(request, response);
	
	var urlInfo = url.parse(request.url);
	var requestInfo = this.parseUrl(urlInfo);
	if(!requestInfo){
		var filePath = path.join(__dirname, 'web', urlInfo.pathname);
		var stat = fs.statSync(filePath);
		if(stat && stat.isFile()){
			response.writeHead(200, {
		        'Content-Type': mime.lookup(filePath),
		        'Content-Length': stat.size
		    });

		    var readStream = fs.createReadStream(filePath);
		    return readStream.pipe(response);
		}
			
		response.error('Failed to parse request');
		return this.errorFileNotFound(response);
	}

    var service = this.managers[requestInfo.service];
	if(!service){	
		var serviceClass = 'Vidiun' + requestInfo.service + 'Manager';
		var serviceModule = './managers/' + serviceClass;
		try{
			var module = require(serviceModule);
			service = new module[serviceClass]();
		}
		catch(err){
			response.error(err.stack);
			return this.errorFileNotFound(response);
		}

		if(!service){
			response.error('Service [' + requestInfo.service + '] not found');
			return this.errorFileNotFound(response);
		}
		
		service.start();
		this.managers[requestInfo.service] = service;
	}
			
	if(!service[requestInfo.action] || !(typeof service[requestInfo.action] === 'function')){
		response.error('Action [' + requestInfo.service + '.' + requestInfo.action + '] not found');
		return this.errorFileNotFound(response);
	}

	try{
		service[requestInfo.action].apply(service, [request, response, requestInfo.params]);
	}
	catch(err){
		response.error(err.stack);
		return this.errorResponse(response, 500, err.message);
	}
};

module.exports.VidiunMainProcess = VidiunMainProcess;
module.exports.VidiunChildProcess = VidiunChildProcess;