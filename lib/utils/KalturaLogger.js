
var os = require('os');
var fs = require('fs');
var util = require('util');
var dateFormat = require('dateformat');

var vidiun = {
	client: require('../client/VidiunClient')
};

var OBJECT_OBJECT_PREFIX = '[object Object].';
var OBJECT_PREFIX = 'Object.';

VidiunLogger = {
	config: null,
	hostname: os.hostname(),
	debugEnabled: false,
	largeDataDebugEnabled: false,
	accessLogFile: null,
	logFile: null,
	errorFile: null,

	accessRequestHeaders: ['referrer', 'user-agent', 'x-vidiun-f5-https', 'host', 'x-forwarded-for', 'x-forwarded-server', 'x-forwarded-host'],
	accessResponseHeaders: ['content-range', 'cache-control', 'x-vidiun-session'],

	init: function(){
		if(!VidiunConfig.config.logger || VidiunLogger.config)
			return;

		VidiunLogger.config = VidiunConfig.config.logger;
		
		if(VidiunLogger.config.debugEnabled){
			VidiunLogger.debugEnabled = parseInt(VidiunLogger.config.debugEnabled);
		}
		if(VidiunLogger.config.largeDataDebugEnabled){
			VidiunLogger.largeDataDebugEnabled = parseInt(VidiunLogger.config.largeDataDebugEnabled);
		}
		if(VidiunLogger.config.accessRequestHeaders){
			VidiunLogger.accessRequestHeaders = VidiunLogger.config.accessRequestHeaders.split(',');
		}
		if(VidiunLogger.config.accessResponseHeaders){
			VidiunLogger.accessResponseHeaders = VidiunLogger.config.accessResponseHeaders.split(',');
		}
		 
		if(VidiunLogger.config.accessLogName){
			VidiunLogger.accessLogFile = fs.openSync(VidiunLogger.config.logDir + '/' + VidiunLogger.config.accessLogName, 'a');		
		}
		
		if(VidiunLogger.config.logName){
			VidiunLogger.logFile = fs.openSync(VidiunLogger.config.logDir + '/' + VidiunLogger.config.logName, 'a');
		}
		
		if(VidiunLogger.config.errorLogName){
			VidiunLogger.errorFile = fs.openSync(VidiunLogger.config.logDir + '/' + VidiunLogger.config.errorLogName, 'a');			
		}
	},
	
	notifyLogsRotate: function(){
		if(VidiunLogger.config.accessLogName){
			var newAccessLogHandler = fs.openSync(VidiunLogger.config.logDir + '/' + VidiunLogger.config.accessLogName, 'a');
			var oldAccessLogHandler = VidiunLogger.accessLogFile;
			VidiunLogger.accessLogFile = newAccessLogHandler;
			fs.closeSync(oldAccessLogHandler);				
		}
		if(VidiunLogger.config.logName){
			var newLogHandler = fs.openSync(VidiunLogger.config.logDir + '/' + VidiunLogger.config.logName, 'a');
			var oldLogHandler = VidiunLogger.logFile;
			VidiunLogger.logFile = newLogHandler;
			fs.closeSync(oldLogHandler);			
		}
		if(VidiunLogger.config.errorLogName){
			var newErrorLogHandler = fs.openSync(VidiunLogger.config.logDir + '/' + VidiunLogger.config.errorLogName, 'a');
			var oldErrorLogHandler = VidiunLogger.errorFile;
			VidiunLogger.errorFile = newErrorLogHandler;
			fs.closeSync(oldErrorLogHandler);			
		}
	},
	
	getDateTime: function () {
	    var date = new Date();

	    var hour = date.getHours();
	    hour = (hour < 10 ? "0" : "") + hour;

	    var min  = date.getMinutes();
	    min = (min < 10 ? "0" : "") + min;

	    var sec  = date.getSeconds();
	    sec = (sec < 10 ? "0" : "") + sec;
	    
	    var millisec = date.getMilliseconds();

	    var year = date.getFullYear();

	    var month = date.getMonth() + 1;
	    month = (month < 10 ? "0" : "") + month;

	    var day  = date.getDate();
	    day = (day < 10 ? "0" : "") + day;

	    return year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec + "." + millisec;
	},
	
	prefix: function(stackSource){
		var time = VidiunLogger.getDateTime();
		
		if(!stackSource)
			stackSource = new Error();
		var stack = stackSource.stack.split('\n');
		var stackLevel = 3;

		var line = stack[stackLevel].substr(stack[stackLevel].indexOf('at ') + 3);
		var identifier =  line.substr(0, line.indexOf('(')).trim();
		// this if else is to handle the Object prefix
		if (identifier.startsWith(OBJECT_OBJECT_PREFIX))
			identifier = identifier.substr(OBJECT_OBJECT_PREFIX.length);
		else if (identifier.startsWith(OBJECT_PREFIX))
			identifier = identifier.substr(OBJECT_PREFIX.length);
		// this next if else is for the case where the Object was not mantioned
		if (identifier.length == 0 && line.indexOf('/') != -1)
			identifier = line.substr(line.lastIndexOf('/') + 1);
		else if (identifier.length == 0 && line.indexOf('\\') != -1)
			identifier = line.substr(line.lastIndexOf('\\') + 1);
		return '[' + process.pid + '][' + time + '][' + identifier + ']';
	},
	
	write: function(str){
		if(VidiunLogger.logFile){
			fs.writeSync(VidiunLogger.logFile, str + '\n');
		}
		else{
			console.log(str);
		}
	},
	
	writeError: function(str){
		this.write(str);
		if(VidiunLogger.errorFile){
			fs.writeSync(VidiunLogger.errorFile, str + '\n');
		}
		else{
			console.error(str);
		}
	},
	
	debug: function(str, stackSource){
		if(VidiunLogger.debugEnabled){
			VidiunLogger.write(VidiunLogger.prefix(stackSource) + ' DEBUG: ' + str);
		}
	},
	
	log: function(str, stackSource){
		VidiunLogger.write(VidiunLogger.prefix(stackSource) + ' INFO: ' + str);
	},
	
	warn: function(str, stackSource){
		VidiunLogger.writeError(VidiunLogger.prefix(stackSource) + ' WARN: ' + str);
	},
	
	error: function(str, stackSource){
		VidiunLogger.writeError(VidiunLogger.prefix(stackSource) + ' ERROR: ' + str);
	},
	
	dir: function(object, stackSource, prefix){
		VidiunLogger.write(VidiunLogger.prefix(stackSource) + ' INFO: ' + (prefix ? prefix : '') + util.inspect(object, { showHidden: true, depth: null }));
	},

	access: function(request, response){
		var startTime = new Date().getTime();
		var responseSize = 0;
		response.requestId = VidiunUtils.getUniqueId();

		var timeout = setTimeout(function(){
			response.writeHead(408, {
				'Content-Type' : 'text/plain',
				'Access-Control-Allow-Origin' : '*'
			});
			response.end('Request Timeout!');
		}, VidiunConfig.config.cloud.requestTimeout * 1000);
		
		if(request.headers['x-forwarded-for']){
			var forwardeds = request.headers['x-forwarded-for'].split(',');
			request.ip = forwardeds[0].trim();
		}
		else{
			request.ip = request.connection.remoteAddress || 
			request.socket.remoteAddress ||
			request.connection.socket.remoteAddress;
		}
		
		var getStack = function(){
			return new Error();
		};
		
		response.log = function(msg){
			VidiunLogger.log('Request [' + response.requestId + '] ' + msg, getStack());
		};
		response.dir = function(object){
			VidiunLogger.dir(object, getStack(), 'Request [' + response.requestId + '] ');
		};
		response.error = function(msg){
			VidiunLogger.error('Request [' + response.requestId + '] ' + msg, getStack());
		};
		response.debug = function(msg){
			VidiunLogger.debug('Request [' + response.requestId + '] ' + msg, getStack());
		};

		var savedHeaders = {};
		var responseWriteHead = response.writeHead;
		response.writeHead = function (statusCode, reasonPhrase, headers) {		
			for (var i = 0; i < VidiunLogger.accessResponseHeaders.length; i++) {
				var curHeader = VidiunLogger.accessResponseHeaders[i];
				savedHeaders[curHeader] = response.getHeader(curHeader);
				if (headers && headers[curHeader])
					savedHeaders[curHeader] = headers[curHeader];
			}
			
			// call the original
			responseWriteHead.apply(response, [statusCode, reasonPhrase, headers]);
		};
		var responseWrite = response.write;
		response.write = function(data) {
			if (data)
				responseSize = responseSize + data.length;
			responseWrite.apply(response, [data]);
		};
		
		var responseEnd = response.end;
		response.end = function(body){
			clearTimeout(timeout);
			if (body)
				responseSize = responseSize + body.length;
			var executionTime = (new Date().getTime()) - startTime;

       			function quoteVar(val) {
		                if (!val) return '-'; 
		                return '"' + val + '"';
        		}
			function getDefaultValue(header) {
				return '-';
			}
			function getRequestHeader(header) {
				return quoteVar(request.headers[header]);
			}
			function getResponseHeader(header) {	
				var value = savedHeaders[header];
				if (!savedHeaders[header] && response.getHeader(header))
					value = response.getHeader(header);
				return quoteVar(value);
			}

			var logLine = [request.ip, 
				getDefaultValue('remote-logname'),
				getDefaultValue('remote-user'),													
				'[' + dateFormat(new Date(), 'dd/mmm/yyyy:HH:MM:ss o') + ']',
				'"' + request.method + ' ' + request.url + ' HTTP/' + request.httpVersion + '"',
				response.statusCode,
				responseSize,									   
				Math.floor(executionTime / 1000) + '/' + (executionTime * 1000),
				getRequestHeader('referer'),
    				getRequestHeader('user-agent'),
				getRequestHeader('x-vidiun-f5-https'),
 				getRequestHeader('x-vidiun-f5-remote-addr'),
				getResponseHeader('x-vidiun'),
    				getRequestHeader('host'),
				getDefaultValue('pid'),
				getResponseHeader('x-vidiun-session'),
				getDefaultValue('apache-connection-status'),
				getDefaultValue('byte-received'),  
				getResponseHeader('content-range'),
				getRequestHeader('x-forwarded-for'),
				getRequestHeader('x-forwarded-server'),
				getRequestHeader('x-forwarded-host'),
				getResponseHeader('cache-control'),
				getDefaultValue('partner-id'),
				getRequestHeader('x-vidiun-f5-ext-ip'),
				getRequestHeader('x-vidiun-f5-ext-hops'),
				getDefaultValue('nginx-connection'),
				getResponseHeader('x-vidiun-session')].join(' ');

			if(VidiunLogger.accessLogFile){
				fs.writeSync(VidiunLogger.accessLogFile, logLine + '\n');
			}

			VidiunLogger.write('ACCESS: ' + logLine);
			responseEnd.apply(response, [body]);
		};
		
		response.log(request.url);
	    
		response.setHeader("X-Me", VidiunLogger.hostname);
		response.setHeader("X-Vidiun-Session", response.requestId);
	}
};

VidiunLogger.init();

util.inherits(VidiunLogger, vidiun.client.IVidiunLogger);
