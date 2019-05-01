require('coffee-script/register');
require('../../../vendor/vast-client-js');

var vastClient = require('../../../vendor/vast-client-js/client');

VidiunVastParser = {	
	parse: function(vastUrl, headers, timeout, VidiunLogger, callback){				
		vastClient.get(vastUrl, headers, timeout, VidiunLogger, callback);	
	}
};

module.exports = VidiunVastParser;
