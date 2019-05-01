
var cluster = require('cluster');
var vidiun = require('./lib/VidiunServer');

var VidiunProcess = null;

if (cluster.isMaster) {
	VidiunProcess = new vidiun.VidiunMainProcess();
}
else{
	VidiunProcess = new vidiun.VidiunChildProcess();
}

