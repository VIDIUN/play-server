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
/**
 * The Vidiun Client - this is the facade through which all service actions should be called.
 * @param config the Vidiun configuration object holding partner credentials (type: VidiunConfiguration).
 */
var util = require('util');
var vidiun = require('./VidiunClientBase');
vidiun.objects = require('./VidiunVO');
vidiun.services = require('./VidiunServices');
vidiun.enums = require('./VidiunTypes');

function VidiunClient(config) {
  this.init(config);
};

module.exports = vidiun;
module.exports.VidiunClient = VidiunClient;

util.inherits(VidiunClient, vidiun.VidiunClientBase);
VidiunClient.prototype.apiVersion = "3.1.6";

/**
 * Base Entry Service
 *   
 * @param vidiun.services.VidiunBaseEntryService
 */
VidiunClient.prototype.baseEntry = null;
/**
 * Retrieve information and invoke actions on Flavor Asset
 * @param vidiun.services.VidiunFlavorAssetService
 */
VidiunClient.prototype.flavorAsset = null;
/**
 * Permission service lets you create and manage user permissions
 * @param vidiun.services.VidiunPermissionService
 */
VidiunClient.prototype.permission = null;
/**
 * Session service
 *   
 * @param vidiun.services.VidiunSessionService
 */
VidiunClient.prototype.session = null;
/**
 * UiConf service lets you create and manage your UIConfs for the various flash components
 *   This service is used by the VMC-ApplicationStudio
 *   
 * @param vidiun.services.VidiunUiConfService
 */
VidiunClient.prototype.uiConf = null;
/**
 * Metadata service
 *   
 * @param vidiun.services.VidiunMetadataService
 */
VidiunClient.prototype.metadata = null;
/**
 * Cue Point service
 *   
 * @param vidiun.services.VidiunCuePointService
 */
VidiunClient.prototype.cuePoint = null;
/**
 * The client constructor.
 * @param config the Vidiun configuration object holding partner credentials (type: VidiunConfiguration).
 */
VidiunClient.prototype.init = function(config){
	//call the super constructor:
	vidiun.VidiunClientBase.prototype.init.apply(this, arguments);
	//initialize client services:
	this.baseEntry = new vidiun.services.VidiunBaseEntryService(this);
	this.flavorAsset = new vidiun.services.VidiunFlavorAssetService(this);
	this.permission = new vidiun.services.VidiunPermissionService(this);
	this.session = new vidiun.services.VidiunSessionService(this);
	this.uiConf = new vidiun.services.VidiunUiConfService(this);
	this.metadata = new vidiun.services.VidiunMetadataService(this);
	this.cuePoint = new vidiun.services.VidiunCuePointService(this);
};
