
var url = require('url');
var util = require('util');

var vidiun = module.exports = require('../VidiunManager');

/**
 * @service cuePoints
 */
var VidiunCuePointsManager = function(){
	this.cuePoints = {};
	this.interval = null;
	this.lastUpdatedAt = null;
	
	this.initClient(VidiunConfig.config.client);
};
util.inherits(VidiunCuePointsManager, vidiun.VidiunManager);

/**
 * @type handle to setInterval
 */
VidiunCuePointsManager.prototype.interval = null;

/**
 * @type object
 * 
 * key: entry id
 * value: object
 *  - finishCallback: function called when entry is not required anymore and restorable action could be unstored
 *  - cuePoints: object (key: cue-point id, value: VidiunCuePoint)
 */
VidiunCuePointsManager.prototype.cuePoints = null;

/**
 * @type int timestamd in seconds, used to fetch cue-points that changed in last few seconds
 */
VidiunCuePointsManager.prototype.lastUpdatedAt = null;


/**
 * @param entryId
 */
VidiunCuePointsManager.prototype.verifyEntryRequired = function(entryId){
	var entryRequiredKey = VidiunCache.getKey(VidiunCache.ENTRY_REQUIRED_KEY_PREFIX, [entryId]);
	var oldestSegmentTimeKey = VidiunCache.getKey(VidiunCache.OLDEST_SEGMENT_TIME_KEY_PREFIX, [entryId]);
	var cuePointsKey = VidiunCache.getKey(VidiunCache.ENTRY_CUE_POINTS_KEY_PREFIX, [entryId]);
	
	var This = this;
	var deleteCuePoint = function(){
		This.cuePoints[entryId].finishCallback();
		delete This.cuePoints[entryId];		
		VidiunCache.del(cuePointsKey);		
	};
	
	VidiunCache.get(entryRequiredKey, function(data){
		if(!data){
			VidiunLogger.debug('Deleting cue points for entry ' + entryId);
			deleteCuePoint();
		}
		else{
			var watcherHandledKey = VidiunCache.getKey(VidiunCache.CUE_POINT_WATCHER_HANDLED_KEY_PREFIX, [entryId]);
			VidiunCache.set(watcherHandledKey, true, VidiunConfig.config.cache.watcherHandled);
			if(This.cuePoints[entryId] && This.cuePoints[entryId].cuePoints){
				VidiunCache.get(oldestSegmentTimeKey, function(oldestSegmentTime){
					if(oldestSegmentTime){
						for(var cuePointId in This.cuePoints[entryId].cuePoints){
							var cuePoint = This.cuePoints[entryId].cuePoints[cuePointId];
							if((cuePoint.startTime && oldestSegmentTime.offset > (cuePoint.startTime + cuePoint.duration)) || 
								(cuePoint.triggeredAt*1000 && oldestSegmentTime.timestamp > (cuePoint.triggeredAt*1000 + cuePoint.duration))){
								VidiunLogger.log('Deleting handled cue point from cache: [' + cuePointId + '] oldestSegmentTime [' + JSON.stringify(oldestSegmentTime) + ']');
								delete This.cuePoints[entryId].cuePoints[cuePointId];
							}
						}
					}
					VidiunCache.set(cuePointsKey, This.cuePoints[entryId].cuePoints, VidiunConfig.config.cache.cuePoint);		
				}, function(err){});		
			}
		}
	}, deleteCuePoint);
};

/**
 * @param cuePointsList VidiunCuePointListResponse
 * @param filter VidiunCuePointFilter
 * @param pager VidiunFilterPager
 */
VidiunCuePointsManager.prototype.handleCuePointsList = function(cuePointsList, filter, pager){
	if(!this.run){
		return;
	}
	
	if(!cuePointsList){
		VidiunLogger.error('Client [cuePoint.list] system error');
	}
	else if(cuePointsList.objectType == 'VidiunAPIException'){
		VidiunLogger.error('Client [cuePoint.list][' + cuePointsList.code + ']: ' + cuePointsList.message);
	}
	else{
		var This = this;
		
		if(cuePointsList.objects.length == pager.pageSize){
			pager.pageIndex++;
			this.client.cuePoint.listAction(function(nextCuePointsList){
				This.handleCuePointsList(nextCuePointsList, filter, pager);
			}, filter, pager);
		}
		
		for(var i = 0; i < cuePointsList.objects.length; i++){
			var cuePoint = cuePointsList.objects[i];
			var entryId = cuePoint.entryId;
			if(!this.cuePoints[entryId]){
				continue;
			}
			this.lastUpdatedAt = Math.max(this.lastUpdatedAt, cuePoint.updatedAt);
			
			this.cuePoints[entryId].cuePoints[cuePoint.id] = cuePoint;

			var cuePointsKey = VidiunCache.getKey(VidiunCache.ENTRY_CUE_POINTS_KEY_PREFIX, [entryId]);
			VidiunCache.set(cuePointsKey, this.cuePoints[entryId].cuePoints, VidiunConfig.config.cache.cuePoint);
		}
	}
};


/**
 * List cue-points for all entries, executed periodically
 */
VidiunCuePointsManager.prototype.loop = function(){
	if(!this.sessionReady)
		return;
	
	var entryIds = [];
	for(var entryId in this.cuePoints){
		entryIds.push(entryId);
		this.verifyEntryRequired(entryId);
	}
	
	if(!entryIds.length){
		clearInterval(this.interval);
		VidiunLogger.log('No entries left to monitor, clearing cue points interval for pId ' + process.pid);
		this.interval = null;
		return;
	}
	
	var filter = new vidiun.client.objects.VidiunAdCuePointFilter();
	filter.entryIdIn = entryIds.join(',');
	filter.statusEqual = vidiun.client.enums.VidiunCuePointStatus.READY;
	filter.cuePointTypeEqual = vidiun.client.enums.VidiunCuePointType.AD;
	if(this.lastUpdatedAt){
		//Added +1 to skip retrieving the last object fetched over and over again
		filter.updatedAtGreaterThanOrEqual = this.lastUpdatedAt + 1;
	}

	var pager = new vidiun.client.objects.VidiunFilterPager();
	pager.pageSize = 500;
	
	var This = this;
	this.client.cuePoint.listAction(function(cuePointsList){
		This.handleCuePointsList(cuePointsList, filter, pager);
	}, filter, pager);
};


/**
 * Add entry to be watched
 * 
 * @action cuePoints.watch
 * 
 * @param entryId
 */
VidiunCuePointsManager.prototype.watch = function(request, response, params){
	params = this.parsePlayServerParams(response, params, ['entryId', 'partnerId']);
	if(!params)
		return;

	response.dir(params);

	if(this.cuePoints[params.entryId]){
		this.okResponse(response, 'Entry [' + params.entryId + '] already watched', 'text/plain');
		return;
	}
	else{
		this.callRestorableAction('cuePoints', 'watchEntry', params);		
	}

	this.okResponse(response, 'OK', 'text/plain');
};


/**
 * Restorable action, add entry to be watched
 * 
 * @param params.entryId
 * @param finishCallback function to be called when this entry watch is not needed anymore
 */
VidiunCuePointsManager.prototype.watchEntry = function(params, finishCallback){
	VidiunLogger.log('watch CuePoints for entry ' + params.entryId);
	VidiunLogger.dir(params);
	
	this.cuePoints[params.entryId] = {
		finishCallback: finishCallback,
		cuePoints: {}
	};
	
	if(!this.interval){
		var This = this;
		this.interval = setInterval(function(){
			if(!This.run){
				clearInterval(This.interval);
				VidiunLogger.log('Run variable is false clearing cue points interval for pId ' + process.pid);
				This.interval = null;
				return;
			}
			
			This.loop();
		}, 10000);
	}
	
	this.loop();
};

module.exports.VidiunCuePointsManager = VidiunCuePointsManager;
