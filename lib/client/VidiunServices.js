// ===================================================================================================
//                           _  __     _ _
//                          | |/ /__ _| | |_ _  _ _ _ __ _
//                          | ' </ _` | |  _| || | '_/ _` |
//                          |_|\_\__,_|_|\__|\_,_|_| \__,_|
//
// This file is part of the Vidiun Collaborative Media Suite which allows users
// to do with audio, video, and animation what Wiki platfroms allow them to do with
// text.
//
// Copyright (C) 2006-2011  Vidiun Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// @ignore
// ===================================================================================================
var util = require('util');
var vidiun = require('./VidiunClientBase');

/**
 *Class definition for the Vidiun service: baseEntry.
 * The available service actions:
 * @action  get  Get base entry by ID.
 *  	 .
*/
function VidiunBaseEntryService(client){
  VidiunBaseEntryService.super_.call(this);
  this.init(client);
};

util.inherits(VidiunBaseEntryService, vidiun.VidiunServiceBase);
module.exports.VidiunBaseEntryService = VidiunBaseEntryService;

/**
 * Get base entry by ID.
 *  	 .
 * @param  entryId  string    Entry id
 (optional).
 * @param  version  int    Desired version of the data
 (optional, default: -1).
 * @return  VidiunBaseEntry.
 */
VidiunBaseEntryService.prototype.get = function(callback, entryId, version){
  if(!version)
    version = -1;
  var vparams = {};
  this.client.addParam(vparams, "entryId", entryId);
  this.client.addParam(vparams, "version", version);
  this.client.queueServiceActionCall("baseentry", "get", vparams);
  if (!this.client.isMultiRequest())
    this.client.doQueue(callback);
};

/**
 *Class definition for the Vidiun service: flavorAsset.
 * The available service actions:
 * @action getUrl Get download URL for the asset.
 */
function VidiunFlavorAssetService(client){
	VidiunFlavorAssetService.super_.call(this);
	this.init(client);
}

util.inherits(VidiunFlavorAssetService, vidiun.VidiunServiceBase);
module.exports.VidiunFlavorAssetService = VidiunFlavorAssetService;

/**
 * Get download URL for the asset.
 * @param id string  (optional).
 * @param storageId int  (optional, default: null).
 * @param forceProxy bool  (optional, default: false).
 * @param options VidiunFlavorAssetUrlOptions  (optional, default: null).
 * @return string.
 */
VidiunFlavorAssetService.prototype.getUrl = function(callback, id, storageId, forceProxy, options){
	if(!storageId){
		storageId = null;
	}
	if(!forceProxy){
		forceProxy = false;
	}
	if(!options){
		options = null;
	}
	var vparams = {};
	this.client.addParam(vparams, 'id', id);
	this.client.addParam(vparams, 'storageId', storageId);
	this.client.addParam(vparams, 'forceProxy', forceProxy);
	if (options !== null){
		this.client.addParam(vparams, 'options', vidiun.toParams(options));
	}
	this.client.queueServiceActionCall('flavorasset', 'getUrl', vparams);
	if (!this.client.isMultiRequest()){
		this.client.doQueue(callback);
	}
};

/**
 *Class definition for the Vidiun service: permission.
 * The available service actions:
 * @action list Lists permission objects that are associated with an account.
 * Blocked permissions are listed unless you use a filter to exclude them.
 * Blocked permissions are listed unless you use a filter to exclude them.
 */
function VidiunPermissionService(client){
        VidiunPermissionService.super_.call(this);
        this.init(client);
}

util.inherits(VidiunPermissionService, vidiun.VidiunServiceBase);
module.exports.VidiunPermissionService = VidiunPermissionService;

/**
 * Lists permission objects that are associated with an account.
 * Blocked permissions are listed unless you use a filter to exclude them.
 * Blocked permissions are listed unless you use a filter to exclude them.
 * @param filter VidiunPermissionFilter A filter used to exclude specific types of permissions (optional, default: null).
 * @param pager VidiunFilterPager A limit for the number of records to display on a page (optional, default: null).
 * @return VidiunPermissionListResponse.
 */
VidiunPermissionService.prototype.listAction = function(callback, filter, pager){
        if(!filter){
                filter = null;
        }
        if(!pager){
                pager = null;
        }
        var vparams = {};
        if (filter !== null){
                this.client.addParam(vparams, 'filter', vidiun.toParams(filter));
        }
        if (pager !== null){
                this.client.addParam(vparams, 'pager', vidiun.toParams(pager));
        }
        this.client.queueServiceActionCall('permission', 'list', vparams);
        if (!this.client.isMultiRequest()){
                this.client.doQueue(callback);
        }
};

/**
 *Class definition for the Vidiun service: session.
 * The available service actions:
 * @action  start  Start a session with Vidiun's server.
 *  	 The result VS is the session key that you should pass to all services that requires a ticket.
 *  	 .
*/
function VidiunSessionService(client){
  VidiunSessionService.super_.call(this);
  this.init(client);
};

util.inherits(VidiunSessionService, vidiun.VidiunServiceBase);
module.exports.VidiunSessionService = VidiunSessionService;

/**
 * Start a session with Vidiun's server.
 *  	 The result VS is the session key that you should pass to all services that requires a ticket.
 *  	 .
 * @param  secret  string    Remember to provide the correct secret according to the sessionType you want (optional).
 * @param  userId  string     (optional).
 * @param  type  int    Regular session or Admin session (optional, enum: VidiunSessionType).
 * @param  partnerId  int     (optional, default: null).
 * @param  expiry  int    VS expiry time in seconds (optional, default: 86400).
 * @param  privileges  string     (optional, default: null).
 * @return  string.
 */
VidiunSessionService.prototype.start = function(callback, secret, userId, type, partnerId, expiry, privileges){
  if(!userId)
    userId = "";
  if(!type)
    type = 0;
  if(!partnerId)
    partnerId = null;
  if(!expiry)
    expiry = 86400;
  if(!privileges)
    privileges = null;
  var vparams = {};
  this.client.addParam(vparams, "secret", secret);
  this.client.addParam(vparams, "userId", userId);
  this.client.addParam(vparams, "type", type);
  this.client.addParam(vparams, "partnerId", partnerId);
  this.client.addParam(vparams, "expiry", expiry);
  this.client.addParam(vparams, "privileges", privileges);
  this.client.queueServiceActionCall("session", "start", vparams);
  if (!this.client.isMultiRequest())
    this.client.doQueue(callback);
};

/**
 *Class definition for the Vidiun service: uiConf.
 * The available service actions:
 * @action  get  Retrieve a UIConf by id
 *  	 .
*/
function VidiunUiConfService(client){
  VidiunUiConfService.super_.call(this);
  this.init(client);
};

util.inherits(VidiunUiConfService, vidiun.VidiunServiceBase);
module.exports.VidiunUiConfService = VidiunUiConfService;

/**
 * Retrieve a UIConf by id
 *  	 .
 * @param  id  int     (optional).
 * @return  VidiunUiConf.
 */
VidiunUiConfService.prototype.get = function(callback, id){
  var vparams = {};
  this.client.addParam(vparams, "id", id);
  this.client.queueServiceActionCall("uiconf", "get", vparams);
  if (!this.client.isMultiRequest())
    this.client.doQueue(callback);
};

/**
 *Class definition for the Vidiun service: metadata.
 * The available service actions:
 * @action  list  List metadata objects by filter and pager
 *  	 .
*/
function VidiunMetadataService(client){
  VidiunMetadataService.super_.call(this);
  this.init(client);
};

util.inherits(VidiunMetadataService, vidiun.VidiunServiceBase);
module.exports.VidiunMetadataService = VidiunMetadataService;

/**
 * List metadata objects by filter and pager
 *  	 .
 * @param  filter  VidiunMetadataFilter    
 (optional, default: null).
 * @param  pager  VidiunFilterPager    
 (optional, default: null).
 * @return  VidiunMetadataListResponse.
 */
VidiunMetadataService.prototype.listAction = function(callback, filter, pager){
  if(!filter)
    filter = null;
  if(!pager)
    pager = null;
  var vparams = {};
  if (filter != null)
    this.client.addParam(vparams, "filter", vidiun.toParams(filter));
  if (pager != null)
    this.client.addParam(vparams, "pager", vidiun.toParams(pager));
  this.client.queueServiceActionCall("metadata_metadata", "list", vparams);
  if (!this.client.isMultiRequest())
    this.client.doQueue(callback);
};

/**
 *Class definition for the Vidiun service: cuePoint.
 * The available service actions:
 * @action  add  Allows you to add an cue point object associated with an entry
 *  	 .
 * @action  list  List cue point objects by filter and pager
 *  	 .
*/
function VidiunCuePointService(client){
  VidiunCuePointService.super_.call(this);
  this.init(client);
};

util.inherits(VidiunCuePointService, vidiun.VidiunServiceBase);
module.exports.VidiunCuePointService = VidiunCuePointService;

/**
 * Allows you to add an cue point object associated with an entry
 *  	 .
 * @param  cuePoint  VidiunCuePoint     (optional).
 * @return  VidiunCuePoint.
 */
VidiunCuePointService.prototype.add = function(callback, cuePoint){
  var vparams = {};
  this.client.addParam(vparams, "cuePoint", vidiun.toParams(cuePoint));
  this.client.queueServiceActionCall("cuepoint_cuepoint", "add", vparams);
  if (!this.client.isMultiRequest())
    this.client.doQueue(callback);
};
/**
 * List cue point objects by filter and pager
 *  	 .
 * @param  filter  VidiunCuePointFilter     (optional, default: null).
 * @param  pager  VidiunFilterPager     (optional, default: null).
 * @return  VidiunCuePointListResponse.
 */
VidiunCuePointService.prototype.listAction = function(callback, filter, pager){
  if(!filter)
    filter = null;
  if(!pager)
    pager = null;
  var vparams = {};
  if (filter != null)
    this.client.addParam(vparams, "filter", vidiun.toParams(filter));
  if (pager != null)
    this.client.addParam(vparams, "pager", vidiun.toParams(pager));
  this.client.queueServiceActionCall("cuepoint_cuepoint", "list", vparams);
  if (!this.client.isMultiRequest())
    this.client.doQueue(callback);
};

