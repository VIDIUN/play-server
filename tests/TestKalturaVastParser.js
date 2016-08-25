const chai = require('chai');
const expect = chai.expect; // we are using the "expect" style of Chai
const KalturaVastParser = require('../lib/protocols/vast/KalturaVastParser');

const VAST_FILE_EXAMPLE_URL = `file:${__dirname}/resources/VastExample.xml`;
const VAST_ONLINE_EXAMPLE_URL = `http://projects.kaltura.com/vast/vast12.xml`;
const DEFAULT_HEADERS = null;
const VAST_TIMEOUT = 1000;

let vastResponse = null;
describe('Testing Offline Kaltura Vast Parser', function()
{
	// Since the call is asynchronous we need to use done to verify completion
	before(function(done){
		KalturaVastParser.parse(VAST_FILE_EXAMPLE_URL, DEFAULT_HEADERS, VAST_TIMEOUT,
			function (vastObject)
			{
				vastResponse = vastObject;
				done();
			});
	});

	it('Testing vast structure', function ()
	{
		expect(vastResponse.ads.length).to.equal(3);
		expect(vastResponse.ads[0].sequence).to.equal(1);
		expect(vastResponse.ads[1].creatives[0].mediaFiles.length).to.equal(9);
	});
});

describe('Testing Online Kaltura Vast Parser', function()
{
	// Since the call is asynchronous we need to use done to verify completion
	before(function (done)
	{
		KalturaVastParser.parse(VAST_ONLINE_EXAMPLE_URL, DEFAULT_HEADERS, VAST_TIMEOUT,
			function (vastObject)
			{
				vastResponse = vastObject;
				done();
			});
	});

	it('Testing vast structure', function ()
	{
		expect(vastResponse.ads.length).to.equal(1);
		expect(vastResponse.ads[0].creatives[0].mediaFiles.length).to.equal(1);
	});

});

