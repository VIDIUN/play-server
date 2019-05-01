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
 */
function VidiunResource(){
  VidiunResource.super_.call(this);
};
module.exports.VidiunResource = VidiunResource;

util.inherits(VidiunResource, vidiun.VidiunObjectBase);


/**
 */
function VidiunContentResource(){
  VidiunContentResource.super_.call(this);
};
module.exports.VidiunContentResource = VidiunContentResource;

util.inherits(VidiunContentResource, VidiunResource);


/**
 * @param  resource  VidiunContentResource    The content resource to associate with asset params
 *  	 .
 * @param  assetParamsId  int    The asset params to associate with the reaource
 *  	 .
 */
function VidiunAssetParamsResourceContainer(){
  VidiunAssetParamsResourceContainer.super_.call(this);
  this.resource = null;
  this.assetParamsId = null;
};
module.exports.VidiunAssetParamsResourceContainer = VidiunAssetParamsResourceContainer;

util.inherits(VidiunAssetParamsResourceContainer, VidiunResource);


/**
 */
function VidiunOperationAttributes(){
  VidiunOperationAttributes.super_.call(this);
};
module.exports.VidiunOperationAttributes = VidiunOperationAttributes;

util.inherits(VidiunOperationAttributes, vidiun.VidiunObjectBase);


/**
 * @param  id  string    Auto generated 10 characters alphanumeric string
 *  	  (readOnly).
 * @param  name  string    Entry name (Min 1 chars)
 *  	 .
 * @param  description  string    Entry description
 *  	 .
 * @param  partnerId  int     (readOnly).
 * @param  userId  string    The ID of the user who is the owner of this entry 
 *  	 .
 * @param  creatorId  string    The ID of the user who created this entry 
 *  	  (insertOnly).
 * @param  tags  string    Entry tags
 *  	 .
 * @param  adminTags  string    Entry admin tags can be updated only by administrators
 *  	 .
 * @param  categories  string    Categories with no entitlement that this entry belongs to.
 *  	 .
 * @param  categoriesIds  string    Categories Ids of categories with no entitlement that this entry belongs to
 *  	 .
 * @param  status  string     (readOnly).
 * @param  moderationStatus  int    Entry moderation status
 *  	  (readOnly).
 * @param  moderationCount  int    Number of moderation requests waiting for this entry
 *  	  (readOnly).
 * @param  type  string    The type of the entry, this is auto filled by the derived entry object
 *  	 .
 * @param  createdAt  int    Entry creation date as Unix timestamp (In seconds)
 *  	  (readOnly).
 * @param  updatedAt  int    Entry update date as Unix timestamp (In seconds)
 *  	  (readOnly).
 * @param  rank  float    The calculated average rank. rank = totalRank / votes
 *  	  (readOnly).
 * @param  totalRank  int    The sum of all rank values submitted to the baseEntry.anonymousRank action
 *  	  (readOnly).
 * @param  votes  int    A count of all requests made to the baseEntry.anonymousRank action
 *  	  (readOnly).
 * @param  groupId  int    .
 * @param  partnerData  string    Can be used to store various partner related data as a string 
 *  	 .
 * @param  downloadUrl  string    Download URL for the entry
 *  	  (readOnly).
 * @param  searchText  string    Indexed search text for full text search
 *  	  (readOnly).
 * @param  licenseType  int    License type used for this entry
 *  	 .
 * @param  version  int    Version of the entry data
 *  	  (readOnly).
 * @param  thumbnailUrl  string    Thumbnail URL
 *  	  (insertOnly).
 * @param  accessControlId  int    The Access Control ID assigned to this entry (null when not set, send -1 to remove)  
 *  	 .
 * @param  startDate  int    Entry scheduling start date (null when not set, send -1 to remove)
 *  	 .
 * @param  endDate  int    Entry scheduling end date (null when not set, send -1 to remove)
 *  	 .
 * @param  referenceId  string    Entry external reference id
 *  	 .
 * @param  replacingEntryId  string    ID of temporary entry that will replace this entry when it's approved and ready for replacement
 *  	  (readOnly).
 * @param  replacedEntryId  string    ID of the entry that will be replaced when the replacement approved and this entry is ready
 *  	  (readOnly).
 * @param  replacementStatus  string    Status of the replacement readiness and approval
 *  	  (readOnly).
 * @param  partnerSortValue  int    Can be used to store various partner related data as a numeric value
 *  	 .
 * @param  conversionProfileId  int    Override the default ingestion profile  
 *  	 .
 * @param  redirectEntryId  string    IF not empty, points to an entry ID the should replace this current entry's id. 
 *  	 .
 * @param  rootEntryId  string    ID of source root entry, used for clipped, skipped and cropped entries that created from another entry
 *  	  (readOnly).
 * @param  operationAttributes  array    clipping, skipping and cropping attributes that used to create this entry  
 *  	 .
 * @param  entitledUsersEdit  string    list of user ids that are entitled to edit the entry (no server enforcement) The difference between entitledUsersEdit and entitledUsersPublish is applicative only
 *  	 .
 * @param  entitledUsersPublish  string    list of user ids that are entitled to publish the entry (no server enforcement) The difference between entitledUsersEdit and entitledUsersPublish is applicative only
 *  	 .
 */
function VidiunBaseEntry(){
  VidiunBaseEntry.super_.call(this);
  this.id = null;
  this.name = null;
  this.description = null;
  this.partnerId = null;
  this.userId = null;
  this.creatorId = null;
  this.tags = null;
  this.adminTags = null;
  this.categories = null;
  this.categoriesIds = null;
  this.status = null;
  this.moderationStatus = null;
  this.moderationCount = null;
  this.type = null;
  this.createdAt = null;
  this.updatedAt = null;
  this.rank = null;
  this.totalRank = null;
  this.votes = null;
  this.groupId = null;
  this.partnerData = null;
  this.downloadUrl = null;
  this.searchText = null;
  this.licenseType = null;
  this.version = null;
  this.thumbnailUrl = null;
  this.accessControlId = null;
  this.startDate = null;
  this.endDate = null;
  this.referenceId = null;
  this.replacingEntryId = null;
  this.replacedEntryId = null;
  this.replacementStatus = null;
  this.partnerSortValue = null;
  this.conversionProfileId = null;
  this.redirectEntryId = null;
  this.rootEntryId = null;
  this.operationAttributes = null;
  this.entitledUsersEdit = null;
  this.entitledUsersPublish = null;
};
module.exports.VidiunBaseEntry = VidiunBaseEntry;

util.inherits(VidiunBaseEntry, vidiun.VidiunObjectBase);


/**
 * @param  id  string     (readOnly).
 * @param  cuePointType  string     (readOnly).
 * @param  status  int     (readOnly).
 * @param  entryId  string     (insertOnly).
 * @param  partnerId  int     (readOnly).
 * @param  createdAt  int     (readOnly).
 * @param  updatedAt  int     (readOnly).
 * @param  triggeredAt  int     (readOnly).
 * @param  tags  string    .
 * @param  startTime  int    Start time in milliseconds
 *  	 .
 * @param  userId  string     (readOnly).
 * @param  partnerData  string    .
 * @param  partnerSortValue  int    .
 * @param  forceStop  int    .
 * @param  thumbOffset  int    .
 * @param  systemName  string    .
 */
function VidiunCuePoint(){
  VidiunCuePoint.super_.call(this);
  this.id = null;
  this.cuePointType = null;
  this.status = null;
  this.entryId = null;
  this.partnerId = null;
  this.createdAt = null;
  this.updatedAt = null;
  this.triggeredAt = null;
  this.tags = null;
  this.startTime = null;
  this.userId = null;
  this.partnerData = null;
  this.partnerSortValue = null;
  this.forceStop = null;
  this.thumbOffset = null;
  this.systemName = null;
};
module.exports.VidiunCuePoint = VidiunCuePoint;

util.inherits(VidiunCuePoint, vidiun.VidiunObjectBase);


/**
 * @param  objects  array     (readOnly).
 * @param  totalCount  int     (readOnly).
 */
function VidiunCuePointListResponse(){
  VidiunCuePointListResponse.super_.call(this);
  this.objects = null;
  this.totalCount = null;
};
module.exports.VidiunCuePointListResponse = VidiunCuePointListResponse;

util.inherits(VidiunCuePointListResponse, vidiun.VidiunObjectBase);


/**
 */
function VidiunSearchItem(){
  VidiunSearchItem.super_.call(this);
};
module.exports.VidiunSearchItem = VidiunSearchItem;

util.inherits(VidiunSearchItem, vidiun.VidiunObjectBase);


/**
 * @param  orderBy  string    .
 * @param  advancedSearch  VidiunSearchItem    .
 */
function VidiunFilter(){
  VidiunFilter.super_.call(this);
  this.orderBy = null;
  this.advancedSearch = null;
};
module.exports.VidiunFilter = VidiunFilter;

util.inherits(VidiunFilter, vidiun.VidiunObjectBase);


/**
 * @param  pageSize  int    The number of objects to retrieve. (Default is 30, maximum page size is 500).
 *  	 .
 * @param  pageIndex  int    The page number for which {pageSize} of objects should be retrieved (Default is 1).
 *  	 .
 */
function VidiunFilterPager(){
  VidiunFilterPager.super_.call(this);
  this.pageSize = null;
  this.pageIndex = null;
};
module.exports.VidiunFilterPager = VidiunFilterPager;

util.inherits(VidiunFilterPager, vidiun.VidiunObjectBase);


/**
 * @param  bitrate  int    .
 * @param  width  int    .
 * @param  height  int    .
 * @param  tags  string    .
 */
function VidiunLiveStreamBitrate(){
  VidiunLiveStreamBitrate.super_.call(this);
  this.bitrate = null;
  this.width = null;
  this.height = null;
  this.tags = null;
};
module.exports.VidiunLiveStreamBitrate = VidiunLiveStreamBitrate;

util.inherits(VidiunLiveStreamBitrate, vidiun.VidiunObjectBase);


/**
 * @param  protocol  string    .
 * @param  url  string    .
 * @param  publishUrl  string    .
 */
function VidiunLiveStreamConfiguration(){
  VidiunLiveStreamConfiguration.super_.call(this);
  this.protocol = null;
  this.url = null;
  this.publishUrl = null;
};
module.exports.VidiunLiveStreamConfiguration = VidiunLiveStreamConfiguration;

util.inherits(VidiunLiveStreamConfiguration, vidiun.VidiunObjectBase);


/**
 * @param  idEqual  string    This filter should be in use for retrieving only a specific entry (identified by its entryId).
 *  	 .
 * @param  idIn  string    This filter should be in use for retrieving few specific entries (string should include comma separated list of entryId strings).
 *  	 .
 * @param  idNotIn  string    .
 * @param  nameLike  string    This filter should be in use for retrieving specific entries. It should include only one string to search for in entry names (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  nameMultiLikeOr  string    This filter should be in use for retrieving specific entries. It could include few (comma separated) strings for searching in entry names, while applying an OR logic to retrieve entries that contain at least one input string (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  nameMultiLikeAnd  string    This filter should be in use for retrieving specific entries. It could include few (comma separated) strings for searching in entry names, while applying an AND logic to retrieve entries that contain all input strings (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  nameEqual  string    This filter should be in use for retrieving entries with a specific name.
 *  	 .
 * @param  partnerIdEqual  int    This filter should be in use for retrieving only entries which were uploaded by/assigned to users of a specific Vidiun Partner (identified by Partner ID).
 *  	 .
 * @param  partnerIdIn  string    This filter should be in use for retrieving only entries within Vidiun network which were uploaded by/assigned to users of few Vidiun Partners  (string should include comma separated list of PartnerIDs)
 *  	 .
 * @param  userIdEqual  string    This filter parameter should be in use for retrieving only entries, uploaded by/assigned to a specific user (identified by user Id).
 *  	 .
 * @param  creatorIdEqual  string    .
 * @param  tagsLike  string    This filter should be in use for retrieving specific entries. It should include only one string to search for in entry tags (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  tagsMultiLikeOr  string    This filter should be in use for retrieving specific entries. It could include few (comma separated) strings for searching in entry tags, while applying an OR logic to retrieve entries that contain at least one input string (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  tagsMultiLikeAnd  string    This filter should be in use for retrieving specific entries. It could include few (comma separated) strings for searching in entry tags, while applying an AND logic to retrieve entries that contain all input strings (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  adminTagsLike  string    This filter should be in use for retrieving specific entries. It should include only one string to search for in entry tags set by an ADMIN user (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  adminTagsMultiLikeOr  string    This filter should be in use for retrieving specific entries. It could include few (comma separated) strings for searching in entry tags, set by an ADMIN user, while applying an OR logic to retrieve entries that contain at least one input string (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  adminTagsMultiLikeAnd  string    This filter should be in use for retrieving specific entries. It could include few (comma separated) strings for searching in entry tags, set by an ADMIN user, while applying an AND logic to retrieve entries that contain all input strings (no wildcards, spaces are treated as part of the string).
 *  	 .
 * @param  categoriesMatchAnd  string    .
 * @param  categoriesMatchOr  string    All entries within these categories or their child categories.
 *  	 .
 * @param  categoriesNotContains  string    .
 * @param  categoriesIdsMatchAnd  string    .
 * @param  categoriesIdsMatchOr  string    All entries of the categories, excluding their child categories.
 *  	 To include entries of the child categories, use categoryAncestorIdIn, or categoriesMatchOr.
 *  	 .
 * @param  categoriesIdsNotContains  string    .
 * @param  categoriesIdsEmpty  int    .
 * @param  statusEqual  string    This filter should be in use for retrieving only entries, at a specific {.
 * @param  statusNotEqual  string    This filter should be in use for retrieving only entries, not at a specific {.
 * @param  statusIn  string    This filter should be in use for retrieving only entries, at few specific {.
 * @param  statusNotIn  string    This filter should be in use for retrieving only entries, not at few specific {.
 * @param  moderationStatusEqual  int    .
 * @param  moderationStatusNotEqual  int    .
 * @param  moderationStatusIn  string    .
 * @param  moderationStatusNotIn  string    .
 * @param  typeEqual  string    .
 * @param  typeIn  string    This filter should be in use for retrieving entries of few {.
 * @param  createdAtGreaterThanOrEqual  int    This filter parameter should be in use for retrieving only entries which were created at Vidiun system after a specific time/date (standard timestamp format).
 *  	 .
 * @param  createdAtLessThanOrEqual  int    This filter parameter should be in use for retrieving only entries which were created at Vidiun system before a specific time/date (standard timestamp format).
 *  	 .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  totalRankLessThanOrEqual  int    .
 * @param  totalRankGreaterThanOrEqual  int    .
 * @param  groupIdEqual  int    .
 * @param  searchTextMatchAnd  string    This filter should be in use for retrieving specific entries while search match the input string within all of the following metadata attributes: name, description, tags, adminTags.
 *  	 .
 * @param  searchTextMatchOr  string    This filter should be in use for retrieving specific entries while search match the input string within at least one of the following metadata attributes: name, description, tags, adminTags.
 *  	 .
 * @param  accessControlIdEqual  int    .
 * @param  accessControlIdIn  string    .
 * @param  startDateGreaterThanOrEqual  int    .
 * @param  startDateLessThanOrEqual  int    .
 * @param  startDateGreaterThanOrEqualOrNull  int    .
 * @param  startDateLessThanOrEqualOrNull  int    .
 * @param  endDateGreaterThanOrEqual  int    .
 * @param  endDateLessThanOrEqual  int    .
 * @param  endDateGreaterThanOrEqualOrNull  int    .
 * @param  endDateLessThanOrEqualOrNull  int    .
 * @param  referenceIdEqual  string    .
 * @param  referenceIdIn  string    .
 * @param  replacingEntryIdEqual  string    .
 * @param  replacingEntryIdIn  string    .
 * @param  replacedEntryIdEqual  string    .
 * @param  replacedEntryIdIn  string    .
 * @param  replacementStatusEqual  string    .
 * @param  replacementStatusIn  string    .
 * @param  partnerSortValueGreaterThanOrEqual  int    .
 * @param  partnerSortValueLessThanOrEqual  int    .
 * @param  rootEntryIdEqual  string    .
 * @param  rootEntryIdIn  string    .
 * @param  tagsNameMultiLikeOr  string    .
 * @param  tagsAdminTagsMultiLikeOr  string    .
 * @param  tagsAdminTagsNameMultiLikeOr  string    .
 * @param  tagsNameMultiLikeAnd  string    .
 * @param  tagsAdminTagsMultiLikeAnd  string    .
 * @param  tagsAdminTagsNameMultiLikeAnd  string    .
 */
function VidiunBaseEntryBaseFilter(){
  VidiunBaseEntryBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.idNotIn = null;
  this.nameLike = null;
  this.nameMultiLikeOr = null;
  this.nameMultiLikeAnd = null;
  this.nameEqual = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.userIdEqual = null;
  this.creatorIdEqual = null;
  this.tagsLike = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.adminTagsLike = null;
  this.adminTagsMultiLikeOr = null;
  this.adminTagsMultiLikeAnd = null;
  this.categoriesMatchAnd = null;
  this.categoriesMatchOr = null;
  this.categoriesNotContains = null;
  this.categoriesIdsMatchAnd = null;
  this.categoriesIdsMatchOr = null;
  this.categoriesIdsNotContains = null;
  this.categoriesIdsEmpty = null;
  this.statusEqual = null;
  this.statusNotEqual = null;
  this.statusIn = null;
  this.statusNotIn = null;
  this.moderationStatusEqual = null;
  this.moderationStatusNotEqual = null;
  this.moderationStatusIn = null;
  this.moderationStatusNotIn = null;
  this.typeEqual = null;
  this.typeIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.totalRankLessThanOrEqual = null;
  this.totalRankGreaterThanOrEqual = null;
  this.groupIdEqual = null;
  this.searchTextMatchAnd = null;
  this.searchTextMatchOr = null;
  this.accessControlIdEqual = null;
  this.accessControlIdIn = null;
  this.startDateGreaterThanOrEqual = null;
  this.startDateLessThanOrEqual = null;
  this.startDateGreaterThanOrEqualOrNull = null;
  this.startDateLessThanOrEqualOrNull = null;
  this.endDateGreaterThanOrEqual = null;
  this.endDateLessThanOrEqual = null;
  this.endDateGreaterThanOrEqualOrNull = null;
  this.endDateLessThanOrEqualOrNull = null;
  this.referenceIdEqual = null;
  this.referenceIdIn = null;
  this.replacingEntryIdEqual = null;
  this.replacingEntryIdIn = null;
  this.replacedEntryIdEqual = null;
  this.replacedEntryIdIn = null;
  this.replacementStatusEqual = null;
  this.replacementStatusIn = null;
  this.partnerSortValueGreaterThanOrEqual = null;
  this.partnerSortValueLessThanOrEqual = null;
  this.rootEntryIdEqual = null;
  this.rootEntryIdIn = null;
  this.tagsNameMultiLikeOr = null;
  this.tagsAdminTagsMultiLikeOr = null;
  this.tagsAdminTagsNameMultiLikeOr = null;
  this.tagsNameMultiLikeAnd = null;
  this.tagsAdminTagsMultiLikeAnd = null;
  this.tagsAdminTagsNameMultiLikeAnd = null;
};
module.exports.VidiunBaseEntryBaseFilter = VidiunBaseEntryBaseFilter;

util.inherits(VidiunBaseEntryBaseFilter, VidiunFilter);


/**
 * @param  freeText  string    .
 * @param  isRoot  int    .
 * @param  categoriesFullNameIn  string    .
 * @param  categoryAncestorIdIn  string    All entries within this categoy or in child categories  
 *  	 .
 * @param  redirectFromEntryId  string    The id of the original entry
 *  	 .
 */
function VidiunBaseEntryFilter(){
  VidiunBaseEntryFilter.super_.call(this);
  this.freeText = null;
  this.isRoot = null;
  this.categoriesFullNameIn = null;
  this.categoryAncestorIdIn = null;
  this.redirectFromEntryId = null;
};
module.exports.VidiunBaseEntryFilter = VidiunBaseEntryFilter;

util.inherits(VidiunBaseEntryFilter, VidiunBaseEntryBaseFilter);


/**
 * @param  lastPlayedAtGreaterThanOrEqual  int    .
 * @param  lastPlayedAtLessThanOrEqual  int    .
 * @param  durationLessThan  int    .
 * @param  durationGreaterThan  int    .
 * @param  durationLessThanOrEqual  int    .
 * @param  durationGreaterThanOrEqual  int    .
 * @param  durationTypeMatchOr  string    .
 */
function VidiunPlayableEntryBaseFilter(){
  VidiunPlayableEntryBaseFilter.super_.call(this);
  this.lastPlayedAtGreaterThanOrEqual = null;
  this.lastPlayedAtLessThanOrEqual = null;
  this.durationLessThan = null;
  this.durationGreaterThan = null;
  this.durationLessThanOrEqual = null;
  this.durationGreaterThanOrEqual = null;
  this.durationTypeMatchOr = null;
};
module.exports.VidiunPlayableEntryBaseFilter = VidiunPlayableEntryBaseFilter;

util.inherits(VidiunPlayableEntryBaseFilter, VidiunBaseEntryFilter);


/**
 */
function VidiunPlayableEntryFilter(){
  VidiunPlayableEntryFilter.super_.call(this);
};
module.exports.VidiunPlayableEntryFilter = VidiunPlayableEntryFilter;

util.inherits(VidiunPlayableEntryFilter, VidiunPlayableEntryBaseFilter);


/**
 * @param  mediaTypeEqual  int    .
 * @param  mediaTypeIn  string    .
 * @param  mediaDateGreaterThanOrEqual  int    .
 * @param  mediaDateLessThanOrEqual  int    .
 * @param  flavorParamsIdsMatchOr  string    .
 * @param  flavorParamsIdsMatchAnd  string    .
 */
function VidiunMediaEntryBaseFilter(){
  VidiunMediaEntryBaseFilter.super_.call(this);
  this.mediaTypeEqual = null;
  this.mediaTypeIn = null;
  this.mediaDateGreaterThanOrEqual = null;
  this.mediaDateLessThanOrEqual = null;
  this.flavorParamsIdsMatchOr = null;
  this.flavorParamsIdsMatchAnd = null;
};
module.exports.VidiunMediaEntryBaseFilter = VidiunMediaEntryBaseFilter;

util.inherits(VidiunMediaEntryBaseFilter, VidiunPlayableEntryFilter);


/**
 */
function VidiunMediaEntryFilter(){
  VidiunMediaEntryFilter.super_.call(this);
};
module.exports.VidiunMediaEntryFilter = VidiunMediaEntryFilter;

util.inherits(VidiunMediaEntryFilter, VidiunMediaEntryBaseFilter);


/**
 * @param  limit  int    .
 */
function VidiunMediaEntryFilterForPlaylist(){
  VidiunMediaEntryFilterForPlaylist.super_.call(this);
  this.limit = null;
};
module.exports.VidiunMediaEntryFilterForPlaylist = VidiunMediaEntryFilterForPlaylist;

util.inherits(VidiunMediaEntryFilterForPlaylist, VidiunMediaEntryFilter);

/**
 * @param  id  int     (readOnly).
 * @param  partnerId  int     (readOnly).
 * @param  metadataProfileId  int     (readOnly).
 * @param  metadataProfileVersion  int     (readOnly).
 * @param  metadataObjectType  string     (readOnly).
 * @param  objectId  string     (readOnly).
 * @param  version  int     (readOnly).
 * @param  createdAt  int     (readOnly).
 * @param  updatedAt  int     (readOnly).
 * @param  status  int     (readOnly).
 * @param  xml  string     (readOnly).
 */
function VidiunMetadata(){
  VidiunMetadata.super_.call(this);
  this.id = null;
  this.partnerId = null;
  this.metadataProfileId = null;
  this.metadataProfileVersion = null;
  this.metadataObjectType = null;
  this.objectId = null;
  this.version = null;
  this.createdAt = null;
  this.updatedAt = null;
  this.status = null;
  this.xml = null;
};
module.exports.VidiunMetadata = VidiunMetadata;

util.inherits(VidiunMetadata, vidiun.VidiunObjectBase);


/**
 * @param  objects  array     (readOnly).
 * @param  totalCount  int     (readOnly).
 */
function VidiunMetadataListResponse(){
  VidiunMetadataListResponse.super_.call(this);
  this.objects = null;
  this.totalCount = null;
};
module.exports.VidiunMetadataListResponse = VidiunMetadataListResponse;

util.inherits(VidiunMetadataListResponse, vidiun.VidiunObjectBase);


/**
 * @param id int  (readOnly).
 * @param type int  (readOnly).
 * @param name string .
 * @param friendlyName string .
 * @param description string .
 * @param status int .
 * @param partnerId int  (readOnly).
 * @param dependsOnPermissionNames string .
 * @param tags string .
 * @param permissionItemsIds string .
 * @param createdAt int  (readOnly).
 * @param updatedAt int  (readOnly).
 * @param partnerGroup string .
 */
function VidiunPermission(){
        VidiunPermission.super_.call(this);
        this.id = null;
        this.type = null;
        this.name = null;
        this.friendlyName = null;
        this.description = null;
        this.status = null;
        this.partnerId = null;
        this.dependsOnPermissionNames = null;
        this.tags = null;
        this.permissionItemsIds = null;
        this.createdAt = null;
        this.updatedAt = null;
        this.partnerGroup = null;
}
module.exports.VidiunPermission = VidiunPermission;

util.inherits(VidiunPermission, vidiun.VidiunObjectBase);


/**
 * @param objects array  (readOnly).
 * @param totalCount int  (readOnly).
 */
function VidiunPermissionListResponse(){
        VidiunPermissionListResponse.super_.call(this);
        this.objects = null;
        this.totalCount = null;
}
module.exports.VidiunPermissionListResponse = VidiunPermissionListResponse;

util.inherits(VidiunPermissionListResponse, vidiun.VidiunObjectBase);


/**
 * @param  url  string    Remote URL, FTP, HTTP or HTTPS 
 *  	 .
 * @param  forceAsyncDownload  bool    Force Import Job 
 *  	 .
 */
function VidiunUrlResource(){
  VidiunUrlResource.super_.call(this);
  this.url = null;
  this.forceAsyncDownload = null;
};
module.exports.VidiunUrlResource = VidiunUrlResource;

util.inherits(VidiunUrlResource, VidiunContentResource);


/**
 * @param  storageProfileId  int    ID of storage profile to be associated with the created file sync, used for file serving URL composing. 
 *  	 .
 */
function VidiunRemoteStorageResource(){
  VidiunRemoteStorageResource.super_.call(this);
  this.storageProfileId = null;
};
module.exports.VidiunRemoteStorageResource = VidiunRemoteStorageResource;

util.inherits(VidiunRemoteStorageResource, VidiunUrlResource);


/**
 * @param  id  int     (readOnly).
 * @param  name  string    Name of the uiConf, this is not a primary key
 *  	 .
 * @param  description  string    .
 * @param  partnerId  int     (readOnly).
 * @param  objType  int    .
 * @param  objTypeAsString  string     (readOnly).
 * @param  width  int    .
 * @param  height  int    .
 * @param  htmlParams  string    .
 * @param  swfUrl  string    .
 * @param  confFilePath  string     (readOnly).
 * @param  confFile  string    .
 * @param  confFileFeatures  string    .
 * @param  config  string    .
 * @param  confVars  string    .
 * @param  useCdn  bool    .
 * @param  tags  string    .
 * @param  swfUrlVersion  string    .
 * @param  createdAt  int    Entry creation date as Unix timestamp (In seconds)
 *  	  (readOnly).
 * @param  updatedAt  int    Entry creation date as Unix timestamp (In seconds)
 *  	  (readOnly).
 * @param  creationMode  int    .
 * @param  html5Url  string    .
 * @param  version  string    UiConf version
 *  	  (readOnly).
 * @param  partnerTags  string    .
 */
function VidiunUiConf(){
  VidiunUiConf.super_.call(this);
  this.id = null;
  this.name = null;
  this.description = null;
  this.partnerId = null;
  this.objType = null;
  this.objTypeAsString = null;
  this.width = null;
  this.height = null;
  this.htmlParams = null;
  this.swfUrl = null;
  this.confFilePath = null;
  this.confFile = null;
  this.confFileFeatures = null;
  this.config = null;
  this.confVars = null;
  this.useCdn = null;
  this.tags = null;
  this.swfUrlVersion = null;
  this.createdAt = null;
  this.updatedAt = null;
  this.creationMode = null;
  this.html5Url = null;
  this.version = null;
  this.partnerTags = null;
};
module.exports.VidiunUiConf = VidiunUiConf;

util.inherits(VidiunUiConf, vidiun.VidiunObjectBase);

/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 */
function VidiunAccessControlBaseFilter(){
  VidiunAccessControlBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
};
module.exports.VidiunAccessControlBaseFilter = VidiunAccessControlBaseFilter;

util.inherits(VidiunAccessControlBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 */
function VidiunAccessControlProfileBaseFilter(){
  VidiunAccessControlProfileBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
};
module.exports.VidiunAccessControlProfileBaseFilter = VidiunAccessControlProfileBaseFilter;

util.inherits(VidiunAccessControlProfileBaseFilter, VidiunFilter);


/**
 * @param  protocolType  string     (insertOnly).
 * @param  sourceUrl  string    .
 * @param  adType  string    .
 * @param  title  string    .
 * @param  endTime  int    .
 * @param  duration  int    Duration in milliseconds
 *  	 .
 */
function VidiunAdCuePoint(){
  VidiunAdCuePoint.super_.call(this);
  this.protocolType = null;
  this.sourceUrl = null;
  this.adType = null;
  this.title = null;
  this.endTime = null;
  this.duration = null;
};
module.exports.VidiunAdCuePoint = VidiunAdCuePoint;

util.inherits(VidiunAdCuePoint, VidiunCuePoint);


/**
 * @param  parentId  string     (insertOnly).
 * @param  text  string    .
 * @param  endTime  int    End time in milliseconds
 *  	 .
 * @param  duration  int    Duration in milliseconds
 *  	  (readOnly).
 * @param  depth  int    Depth in the tree
 *  	  (readOnly).
 * @param  childrenCount  int    Number of all descendants
 *  	  (readOnly).
 * @param  directChildrenCount  int    Number of children, first generation only.
 *  	  (readOnly).
 */
function VidiunAnnotation(){
  VidiunAnnotation.super_.call(this);
  this.parentId = null;
  this.text = null;
  this.endTime = null;
  this.duration = null;
  this.depth = null;
  this.childrenCount = null;
  this.directChildrenCount = null;
};
module.exports.VidiunAnnotation = VidiunAnnotation;

util.inherits(VidiunAnnotation, VidiunCuePoint);


/**
 * @param  idEqual  string    .
 * @param  idIn  string    .
 * @param  entryIdEqual  string    .
 * @param  entryIdIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  sizeGreaterThanOrEqual  int    .
 * @param  sizeLessThanOrEqual  int    .
 * @param  tagsLike  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  deletedAtGreaterThanOrEqual  int    .
 * @param  deletedAtLessThanOrEqual  int    .
 */
function VidiunAssetBaseFilter(){
  VidiunAssetBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.entryIdEqual = null;
  this.entryIdIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.sizeGreaterThanOrEqual = null;
  this.sizeLessThanOrEqual = null;
  this.tagsLike = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.deletedAtGreaterThanOrEqual = null;
  this.deletedAtLessThanOrEqual = null;
};
module.exports.VidiunAssetBaseFilter = VidiunAssetBaseFilter;

util.inherits(VidiunAssetBaseFilter, VidiunFilter);


/**
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  isSystemDefaultEqual  int    .
 * @param  tagsEqual  string    .
 */
function VidiunAssetParamsBaseFilter(){
  VidiunAssetParamsBaseFilter.super_.call(this);
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.isSystemDefaultEqual = null;
  this.tagsEqual = null;
};
module.exports.VidiunAssetParamsBaseFilter = VidiunAssetParamsBaseFilter;

util.inherits(VidiunAssetParamsBaseFilter, VidiunFilter);


/**
 * @param  resources  array    Array of resources associated with asset params ids
 *  	 .
 */
function VidiunAssetsParamsResourceContainers(){
  VidiunAssetsParamsResourceContainers.super_.call(this);
  this.resources = null;
};
module.exports.VidiunAssetsParamsResourceContainers = VidiunAssetsParamsResourceContainers;

util.inherits(VidiunAssetsParamsResourceContainers, VidiunResource);


/**
 * @param  idEqual  int    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  parsedAtGreaterThanOrEqual  int    .
 * @param  parsedAtLessThanOrEqual  int    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  auditObjectTypeEqual  string    .
 * @param  auditObjectTypeIn  string    .
 * @param  objectIdEqual  string    .
 * @param  objectIdIn  string    .
 * @param  relatedObjectIdEqual  string    .
 * @param  relatedObjectIdIn  string    .
 * @param  relatedObjectTypeEqual  string    .
 * @param  relatedObjectTypeIn  string    .
 * @param  entryIdEqual  string    .
 * @param  entryIdIn  string    .
 * @param  masterPartnerIdEqual  int    .
 * @param  masterPartnerIdIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  requestIdEqual  string    .
 * @param  requestIdIn  string    .
 * @param  userIdEqual  string    .
 * @param  userIdIn  string    .
 * @param  actionEqual  string    .
 * @param  actionIn  string    .
 * @param  vsEqual  string    .
 * @param  contextEqual  int    .
 * @param  contextIn  string    .
 * @param  entryPointEqual  string    .
 * @param  entryPointIn  string    .
 * @param  serverNameEqual  string    .
 * @param  serverNameIn  string    .
 * @param  ipAddressEqual  string    .
 * @param  ipAddressIn  string    .
 * @param  clientTagEqual  string    .
 */
function VidiunAuditTrailBaseFilter(){
  VidiunAuditTrailBaseFilter.super_.call(this);
  this.idEqual = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.parsedAtGreaterThanOrEqual = null;
  this.parsedAtLessThanOrEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.auditObjectTypeEqual = null;
  this.auditObjectTypeIn = null;
  this.objectIdEqual = null;
  this.objectIdIn = null;
  this.relatedObjectIdEqual = null;
  this.relatedObjectIdIn = null;
  this.relatedObjectTypeEqual = null;
  this.relatedObjectTypeIn = null;
  this.entryIdEqual = null;
  this.entryIdIn = null;
  this.masterPartnerIdEqual = null;
  this.masterPartnerIdIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.requestIdEqual = null;
  this.requestIdIn = null;
  this.userIdEqual = null;
  this.userIdIn = null;
  this.actionEqual = null;
  this.actionIn = null;
  this.vsEqual = null;
  this.contextEqual = null;
  this.contextIn = null;
  this.entryPointEqual = null;
  this.entryPointIn = null;
  this.serverNameEqual = null;
  this.serverNameIn = null;
  this.ipAddressEqual = null;
  this.ipAddressIn = null;
  this.clientTagEqual = null;
};
module.exports.VidiunAuditTrailBaseFilter = VidiunAuditTrailBaseFilter;

util.inherits(VidiunAuditTrailBaseFilter, VidiunFilter);


/**
 */
function VidiunBaseSyndicationFeedBaseFilter(){
  VidiunBaseSyndicationFeedBaseFilter.super_.call(this);
};
module.exports.VidiunBaseSyndicationFeedBaseFilter = VidiunBaseSyndicationFeedBaseFilter;

util.inherits(VidiunBaseSyndicationFeedBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  idGreaterThanOrEqual  int    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  partnerIdNotIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  executionAttemptsGreaterThanOrEqual  int    .
 * @param  executionAttemptsLessThanOrEqual  int    .
 * @param  lockVersionGreaterThanOrEqual  int    .
 * @param  lockVersionLessThanOrEqual  int    .
 * @param  entryIdEqual  string    .
 * @param  jobTypeEqual  string    .
 * @param  jobTypeIn  string    .
 * @param  jobTypeNotIn  string    .
 * @param  jobSubTypeEqual  int    .
 * @param  jobSubTypeIn  string    .
 * @param  jobSubTypeNotIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  statusNotIn  string    .
 * @param  priorityGreaterThanOrEqual  int    .
 * @param  priorityLessThanOrEqual  int    .
 * @param  priorityEqual  int    .
 * @param  priorityIn  string    .
 * @param  priorityNotIn  string    .
 * @param  batchVersionGreaterThanOrEqual  int    .
 * @param  batchVersionLessThanOrEqual  int    .
 * @param  batchVersionEqual  int    .
 * @param  queueTimeGreaterThanOrEqual  int    .
 * @param  queueTimeLessThanOrEqual  int    .
 * @param  finishTimeGreaterThanOrEqual  int    .
 * @param  finishTimeLessThanOrEqual  int    .
 * @param  errTypeEqual  int    .
 * @param  errTypeIn  string    .
 * @param  errTypeNotIn  string    .
 * @param  errNumberEqual  int    .
 * @param  errNumberIn  string    .
 * @param  errNumberNotIn  string    .
 * @param  estimatedEffortLessThan  int    .
 * @param  estimatedEffortGreaterThan  int    .
 * @param  urgencyLessThanOrEqual  int    .
 * @param  urgencyGreaterThanOrEqual  int    .
 */
function VidiunBatchJobBaseFilter(){
  VidiunBatchJobBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idGreaterThanOrEqual = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.partnerIdNotIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.executionAttemptsGreaterThanOrEqual = null;
  this.executionAttemptsLessThanOrEqual = null;
  this.lockVersionGreaterThanOrEqual = null;
  this.lockVersionLessThanOrEqual = null;
  this.entryIdEqual = null;
  this.jobTypeEqual = null;
  this.jobTypeIn = null;
  this.jobTypeNotIn = null;
  this.jobSubTypeEqual = null;
  this.jobSubTypeIn = null;
  this.jobSubTypeNotIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.statusNotIn = null;
  this.priorityGreaterThanOrEqual = null;
  this.priorityLessThanOrEqual = null;
  this.priorityEqual = null;
  this.priorityIn = null;
  this.priorityNotIn = null;
  this.batchVersionGreaterThanOrEqual = null;
  this.batchVersionLessThanOrEqual = null;
  this.batchVersionEqual = null;
  this.queueTimeGreaterThanOrEqual = null;
  this.queueTimeLessThanOrEqual = null;
  this.finishTimeGreaterThanOrEqual = null;
  this.finishTimeLessThanOrEqual = null;
  this.errTypeEqual = null;
  this.errTypeIn = null;
  this.errTypeNotIn = null;
  this.errNumberEqual = null;
  this.errNumberIn = null;
  this.errNumberNotIn = null;
  this.estimatedEffortLessThan = null;
  this.estimatedEffortGreaterThan = null;
  this.urgencyLessThanOrEqual = null;
  this.urgencyGreaterThanOrEqual = null;
};
module.exports.VidiunBatchJobBaseFilter = VidiunBatchJobBaseFilter;

util.inherits(VidiunBatchJobBaseFilter, VidiunFilter);


/**
 * @param  uploadedOnGreaterThanOrEqual  int    .
 * @param  uploadedOnLessThanOrEqual  int    .
 * @param  uploadedOnEqual  int    .
 * @param  statusIn  string    .
 * @param  statusEqual  int    .
 * @param  bulkUploadObjectTypeEqual  string    .
 * @param  bulkUploadObjectTypeIn  string    .
 */
function VidiunBulkUploadBaseFilter(){
  VidiunBulkUploadBaseFilter.super_.call(this);
  this.uploadedOnGreaterThanOrEqual = null;
  this.uploadedOnLessThanOrEqual = null;
  this.uploadedOnEqual = null;
  this.statusIn = null;
  this.statusEqual = null;
  this.bulkUploadObjectTypeEqual = null;
  this.bulkUploadObjectTypeIn = null;
};
module.exports.VidiunBulkUploadBaseFilter = VidiunBulkUploadBaseFilter;

util.inherits(VidiunBulkUploadBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  parentIdEqual  int    .
 * @param  parentIdIn  string    .
 * @param  depthEqual  int    .
 * @param  fullNameEqual  string    .
 * @param  fullNameStartsWith  string    .
 * @param  fullNameIn  string    .
 * @param  fullIdsEqual  string    .
 * @param  fullIdsStartsWith  string    .
 * @param  fullIdsMatchOr  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  tagsLike  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  appearInListEqual  int    .
 * @param  privacyEqual  int    .
 * @param  privacyIn  string    .
 * @param  inheritanceTypeEqual  int    .
 * @param  inheritanceTypeIn  string    .
 * @param  referenceIdEqual  string    .
 * @param  referenceIdEmpty  int    .
 * @param  contributionPolicyEqual  int    .
 * @param  membersCountGreaterThanOrEqual  int    .
 * @param  membersCountLessThanOrEqual  int    .
 * @param  pendingMembersCountGreaterThanOrEqual  int    .
 * @param  pendingMembersCountLessThanOrEqual  int    .
 * @param  privacyContextEqual  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  inheritedParentIdEqual  int    .
 * @param  inheritedParentIdIn  string    .
 * @param  partnerSortValueGreaterThanOrEqual  int    .
 * @param  partnerSortValueLessThanOrEqual  int    .
 */
function VidiunCategoryBaseFilter(){
  VidiunCategoryBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.parentIdEqual = null;
  this.parentIdIn = null;
  this.depthEqual = null;
  this.fullNameEqual = null;
  this.fullNameStartsWith = null;
  this.fullNameIn = null;
  this.fullIdsEqual = null;
  this.fullIdsStartsWith = null;
  this.fullIdsMatchOr = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.tagsLike = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.appearInListEqual = null;
  this.privacyEqual = null;
  this.privacyIn = null;
  this.inheritanceTypeEqual = null;
  this.inheritanceTypeIn = null;
  this.referenceIdEqual = null;
  this.referenceIdEmpty = null;
  this.contributionPolicyEqual = null;
  this.membersCountGreaterThanOrEqual = null;
  this.membersCountLessThanOrEqual = null;
  this.pendingMembersCountGreaterThanOrEqual = null;
  this.pendingMembersCountLessThanOrEqual = null;
  this.privacyContextEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.inheritedParentIdEqual = null;
  this.inheritedParentIdIn = null;
  this.partnerSortValueGreaterThanOrEqual = null;
  this.partnerSortValueLessThanOrEqual = null;
};
module.exports.VidiunCategoryBaseFilter = VidiunCategoryBaseFilter;

util.inherits(VidiunCategoryBaseFilter, VidiunFilter);


/**
 * @param  categoriesMatchOr  string    .
 * @param  categoryEntryStatusIn  string    .
 * @param  orderBy  string    .
 * @param  categoryIdEqual  int    .
 */
function VidiunCategoryEntryAdvancedFilter(){
  VidiunCategoryEntryAdvancedFilter.super_.call(this);
  this.categoriesMatchOr = null;
  this.categoryEntryStatusIn = null;
  this.orderBy = null;
  this.categoryIdEqual = null;
};
module.exports.VidiunCategoryEntryAdvancedFilter = VidiunCategoryEntryAdvancedFilter;

util.inherits(VidiunCategoryEntryAdvancedFilter, VidiunSearchItem);


/**
 * @param  categoryIdEqual  int    .
 * @param  categoryIdIn  string    .
 * @param  entryIdEqual  string    .
 * @param  entryIdIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  categoryFullIdsStartsWith  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 */
function VidiunCategoryEntryBaseFilter(){
  VidiunCategoryEntryBaseFilter.super_.call(this);
  this.categoryIdEqual = null;
  this.categoryIdIn = null;
  this.entryIdEqual = null;
  this.entryIdIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.categoryFullIdsStartsWith = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.VidiunCategoryEntryBaseFilter = VidiunCategoryEntryBaseFilter;

util.inherits(VidiunCategoryEntryBaseFilter, VidiunFilter);


/**
 * @param  memberIdEq  string    .
 * @param  memberIdIn  string    .
 * @param  memberPermissionsMatchOr  string    .
 * @param  memberPermissionsMatchAnd  string    .
 */
function VidiunCategoryUserAdvancedFilter(){
  VidiunCategoryUserAdvancedFilter.super_.call(this);
  this.memberIdEq = null;
  this.memberIdIn = null;
  this.memberPermissionsMatchOr = null;
  this.memberPermissionsMatchAnd = null;
};
module.exports.VidiunCategoryUserAdvancedFilter = VidiunCategoryUserAdvancedFilter;

util.inherits(VidiunCategoryUserAdvancedFilter, VidiunSearchItem);


/**
 * @param  categoryIdEqual  int    .
 * @param  categoryIdIn  string    .
 * @param  userIdEqual  string    .
 * @param  userIdIn  string    .
 * @param  permissionLevelEqual  int    .
 * @param  permissionLevelIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  updateMethodEqual  int    .
 * @param  updateMethodIn  string    .
 * @param  categoryFullIdsStartsWith  string    .
 * @param  categoryFullIdsEqual  string    .
 * @param  permissionNamesMatchAnd  string    .
 * @param  permissionNamesMatchOr  string    .
 * @param  permissionNamesNotContains  string    .
 */
function VidiunCategoryUserBaseFilter(){
  VidiunCategoryUserBaseFilter.super_.call(this);
  this.categoryIdEqual = null;
  this.categoryIdIn = null;
  this.userIdEqual = null;
  this.userIdIn = null;
  this.permissionLevelEqual = null;
  this.permissionLevelIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.updateMethodEqual = null;
  this.updateMethodIn = null;
  this.categoryFullIdsStartsWith = null;
  this.categoryFullIdsEqual = null;
  this.permissionNamesMatchAnd = null;
  this.permissionNamesMatchOr = null;
  this.permissionNamesNotContains = null;
};
module.exports.VidiunCategoryUserBaseFilter = VidiunCategoryUserBaseFilter;

util.inherits(VidiunCategoryUserBaseFilter, VidiunFilter);


/**
 * @param  userIdEqual  string    .
 * @param  userIdIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  updateMethodEqual  int    .
 * @param  updateMethodIn  string    .
 * @param  permissionNamesMatchAnd  string    .
 * @param  permissionNamesMatchOr  string    .
 */
function VidiunCategoryUserProviderFilter(){
  VidiunCategoryUserProviderFilter.super_.call(this);
  this.userIdEqual = null;
  this.userIdIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.updateMethodEqual = null;
  this.updateMethodIn = null;
  this.permissionNamesMatchAnd = null;
  this.permissionNamesMatchOr = null;
};
module.exports.VidiunCategoryUserProviderFilter = VidiunCategoryUserProviderFilter;

util.inherits(VidiunCategoryUserProviderFilter, VidiunFilter);


/**
 * @param  offset  int    Offset in milliseconds
 *  	 .
 * @param  duration  int    Duration in milliseconds
 *  	 .
 */
function VidiunClipAttributes(){
  VidiunClipAttributes.super_.call(this);
  this.offset = null;
  this.duration = null;
};
module.exports.VidiunClipAttributes = VidiunClipAttributes;

util.inherits(VidiunClipAttributes, VidiunOperationAttributes);


/**
 * @param  code  string    .
 * @param  description  string    .
 * @param  endTime  int    .
 * @param  duration  int    Duration in milliseconds
 *  	  (readOnly).
 */
function VidiunCodeCuePoint(){
  VidiunCodeCuePoint.super_.call(this);
  this.code = null;
  this.description = null;
  this.endTime = null;
  this.duration = null;
};
module.exports.VidiunCodeCuePoint = VidiunCodeCuePoint;

util.inherits(VidiunCodeCuePoint, VidiunCuePoint);


/**
 */
function VidiunDataCenterContentResource(){
  VidiunDataCenterContentResource.super_.call(this);
};
module.exports.VidiunDataCenterContentResource = VidiunDataCenterContentResource;

util.inherits(VidiunDataCenterContentResource, VidiunContentResource);


/**
 * @param  resource  VidiunDataCenterContentResource    The resource to be concatenated
 *  	 .
 */
function VidiunConcatAttributes(){
  VidiunConcatAttributes.super_.call(this);
  this.resource = null;
};
module.exports.VidiunConcatAttributes = VidiunConcatAttributes;

util.inherits(VidiunConcatAttributes, VidiunOperationAttributes);


/**
 * @param  noDistributionProfiles  bool    .
 * @param  distributionProfileId  int    .
 * @param  distributionSunStatus  int    .
 * @param  entryDistributionFlag  int    .
 * @param  entryDistributionStatus  int    .
 * @param  hasEntryDistributionValidationErrors  bool    .
 * @param  entryDistributionValidationErrors  string    Comma seperated validation error types
 *  	 .
 */
function VidiunContentDistributionSearchItem(){
  VidiunContentDistributionSearchItem.super_.call(this);
  this.noDistributionProfiles = null;
  this.distributionProfileId = null;
  this.distributionSunStatus = null;
  this.entryDistributionFlag = null;
  this.entryDistributionStatus = null;
  this.hasEntryDistributionValidationErrors = null;
  this.entryDistributionValidationErrors = null;
};
module.exports.VidiunContentDistributionSearchItem = VidiunContentDistributionSearchItem;

util.inherits(VidiunContentDistributionSearchItem, VidiunSearchItem);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  createdByIdEqual  int    .
 * @param  typeEqual  int    .
 * @param  typeIn  string    .
 * @param  targetTypeEqual  int    .
 * @param  targetTypeIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 */
function VidiunControlPanelCommandBaseFilter(){
  VidiunControlPanelCommandBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.createdByIdEqual = null;
  this.typeEqual = null;
  this.typeIn = null;
  this.targetTypeEqual = null;
  this.targetTypeIn = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.VidiunControlPanelCommandBaseFilter = VidiunControlPanelCommandBaseFilter;

util.inherits(VidiunControlPanelCommandBaseFilter, VidiunFilter);


/**
 * @param  conversionProfileIdEqual  int    .
 * @param  conversionProfileIdIn  string    .
 * @param  assetParamsIdEqual  int    .
 * @param  assetParamsIdIn  string    .
 * @param  readyBehaviorEqual  int    .
 * @param  readyBehaviorIn  string    .
 * @param  originEqual  int    .
 * @param  originIn  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 */
function VidiunConversionProfileAssetParamsBaseFilter(){
  VidiunConversionProfileAssetParamsBaseFilter.super_.call(this);
  this.conversionProfileIdEqual = null;
  this.conversionProfileIdIn = null;
  this.assetParamsIdEqual = null;
  this.assetParamsIdIn = null;
  this.readyBehaviorEqual = null;
  this.readyBehaviorIn = null;
  this.originEqual = null;
  this.originIn = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
};
module.exports.VidiunConversionProfileAssetParamsBaseFilter = VidiunConversionProfileAssetParamsBaseFilter;

util.inherits(VidiunConversionProfileAssetParamsBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  statusEqual  string    .
 * @param  statusIn  string    .
 * @param  typeEqual  string    .
 * @param  typeIn  string    .
 * @param  nameEqual  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  defaultEntryIdEqual  string    .
 * @param  defaultEntryIdIn  string    .
 */
function VidiunConversionProfileBaseFilter(){
  VidiunConversionProfileBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.typeEqual = null;
  this.typeIn = null;
  this.nameEqual = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.defaultEntryIdEqual = null;
  this.defaultEntryIdIn = null;
};
module.exports.VidiunConversionProfileBaseFilter = VidiunConversionProfileBaseFilter;

util.inherits(VidiunConversionProfileBaseFilter, VidiunFilter);


/**
 * @param  idEqual  string    .
 * @param  idIn  string    .
 * @param  cuePointTypeEqual  string    .
 * @param  cuePointTypeIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  entryIdEqual  string    .
 * @param  entryIdIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  triggeredAtGreaterThanOrEqual  int    .
 * @param  triggeredAtLessThanOrEqual  int    .
 * @param  tagsLike  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  startTimeGreaterThanOrEqual  int    .
 * @param  startTimeLessThanOrEqual  int    .
 * @param  userIdEqual  string    .
 * @param  userIdIn  string    .
 * @param  partnerSortValueEqual  int    .
 * @param  partnerSortValueIn  string    .
 * @param  partnerSortValueGreaterThanOrEqual  int    .
 * @param  partnerSortValueLessThanOrEqual  int    .
 * @param  forceStopEqual  int    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 */
function VidiunCuePointBaseFilter(){
  VidiunCuePointBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.cuePointTypeEqual = null;
  this.cuePointTypeIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.entryIdEqual = null;
  this.entryIdIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.triggeredAtGreaterThanOrEqual = null;
  this.triggeredAtLessThanOrEqual = null;
  this.tagsLike = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.startTimeGreaterThanOrEqual = null;
  this.startTimeLessThanOrEqual = null;
  this.userIdEqual = null;
  this.userIdIn = null;
  this.partnerSortValueEqual = null;
  this.partnerSortValueIn = null;
  this.partnerSortValueGreaterThanOrEqual = null;
  this.partnerSortValueLessThanOrEqual = null;
  this.forceStopEqual = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
};
module.exports.VidiunCuePointBaseFilter = VidiunCuePointBaseFilter;

util.inherits(VidiunCuePointBaseFilter, VidiunFilter);


/**
 * @param  dataContent  string    The data of the entry
 *  	 .
 * @param  retrieveDataContentByGet  bool    indicator whether to return the object for get action with the dataContent field.
 *  	  (insertOnly).
 */
function VidiunDataEntry(){
  VidiunDataEntry.super_.call(this);
  this.dataContent = null;
  this.retrieveDataContentByGet = null;
};
module.exports.VidiunDataEntry = VidiunDataEntry;

util.inherits(VidiunDataEntry, VidiunBaseEntry);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 */
function VidiunDistributionProfileBaseFilter(){
  VidiunDistributionProfileBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.VidiunDistributionProfileBaseFilter = VidiunDistributionProfileBaseFilter;

util.inherits(VidiunDistributionProfileBaseFilter, VidiunFilter);


/**
 * @param  typeEqual  string    .
 * @param  typeIn  string    .
 */
function VidiunDistributionProviderBaseFilter(){
  VidiunDistributionProviderBaseFilter.super_.call(this);
  this.typeEqual = null;
  this.typeIn = null;
};
module.exports.VidiunDistributionProviderBaseFilter = VidiunDistributionProviderBaseFilter;

util.inherits(VidiunDistributionProviderBaseFilter, VidiunFilter);


/**
 * @param  documentType  int    The type of the document
 *  	  (insertOnly).
 * @param  assetParamsIds  string    Comma separated asset params ids that exists for this media entry
 *  	  (readOnly).
 */
function VidiunDocumentEntry(){
  VidiunDocumentEntry.super_.call(this);
  this.documentType = null;
  this.assetParamsIds = null;
};
module.exports.VidiunDocumentEntry = VidiunDocumentEntry;

util.inherits(VidiunDocumentEntry, VidiunBaseEntry);


/**
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  deviceIdLike  string    .
 * @param  providerEqual  string    .
 * @param  providerIn  string    .
 */
function VidiunDrmDeviceBaseFilter(){
  VidiunDrmDeviceBaseFilter.super_.call(this);
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.deviceIdLike = null;
  this.providerEqual = null;
  this.providerIn = null;
};
module.exports.VidiunDrmDeviceBaseFilter = VidiunDrmDeviceBaseFilter;

util.inherits(VidiunDrmDeviceBaseFilter, VidiunFilter);


/**
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  nameLike  string    .
 * @param  systemNameLike  string    .
 * @param  providerEqual  string    .
 * @param  providerIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  scenarioEqual  string    .
 * @param  scenarioIn  string    .
 */
function VidiunDrmPolicyBaseFilter(){
  VidiunDrmPolicyBaseFilter.super_.call(this);
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.nameLike = null;
  this.systemNameLike = null;
  this.providerEqual = null;
  this.providerIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.scenarioEqual = null;
  this.scenarioIn = null;
};
module.exports.VidiunDrmPolicyBaseFilter = VidiunDrmPolicyBaseFilter;

util.inherits(VidiunDrmPolicyBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  nameLike  string    .
 * @param  providerEqual  string    .
 * @param  providerIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 */
function VidiunDrmProfileBaseFilter(){
  VidiunDrmProfileBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.nameLike = null;
  this.providerEqual = null;
  this.providerIn = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.VidiunDrmProfileBaseFilter = VidiunDrmProfileBaseFilter;

util.inherits(VidiunDrmProfileBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  nameLike  string    .
 * @param  typeEqual  string    .
 * @param  typeIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  conversionProfileIdEqual  int    .
 * @param  conversionProfileIdIn  string    .
 * @param  dcEqual  int    .
 * @param  dcIn  string    .
 * @param  pathEqual  string    .
 * @param  pathLike  string    .
 * @param  fileHandlerTypeEqual  string    .
 * @param  fileHandlerTypeIn  string    .
 * @param  fileNamePatternsLike  string    .
 * @param  fileNamePatternsMultiLikeOr  string    .
 * @param  fileNamePatternsMultiLikeAnd  string    .
 * @param  tagsLike  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  errorCodeEqual  string    .
 * @param  errorCodeIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 */
function VidiunDropFolderBaseFilter(){
  VidiunDropFolderBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.nameLike = null;
  this.typeEqual = null;
  this.typeIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.conversionProfileIdEqual = null;
  this.conversionProfileIdIn = null;
  this.dcEqual = null;
  this.dcIn = null;
  this.pathEqual = null;
  this.pathLike = null;
  this.fileHandlerTypeEqual = null;
  this.fileHandlerTypeIn = null;
  this.fileNamePatternsLike = null;
  this.fileNamePatternsMultiLikeOr = null;
  this.fileNamePatternsMultiLikeAnd = null;
  this.tagsLike = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.errorCodeEqual = null;
  this.errorCodeIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
};
module.exports.VidiunDropFolderBaseFilter = VidiunDropFolderBaseFilter;

util.inherits(VidiunDropFolderBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  dropFolderIdEqual  int    .
 * @param  dropFolderIdIn  string    .
 * @param  fileNameEqual  string    .
 * @param  fileNameIn  string    .
 * @param  fileNameLike  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  statusNotIn  string    .
 * @param  parsedSlugEqual  string    .
 * @param  parsedSlugIn  string    .
 * @param  parsedSlugLike  string    .
 * @param  parsedFlavorEqual  string    .
 * @param  parsedFlavorIn  string    .
 * @param  parsedFlavorLike  string    .
 * @param  leadDropFolderFileIdEqual  int    .
 * @param  deletedDropFolderFileIdEqual  int    .
 * @param  entryIdEqual  string    .
 * @param  errorCodeEqual  string    .
 * @param  errorCodeIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 */
function VidiunDropFolderFileBaseFilter(){
  VidiunDropFolderFileBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.dropFolderIdEqual = null;
  this.dropFolderIdIn = null;
  this.fileNameEqual = null;
  this.fileNameIn = null;
  this.fileNameLike = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.statusNotIn = null;
  this.parsedSlugEqual = null;
  this.parsedSlugIn = null;
  this.parsedSlugLike = null;
  this.parsedFlavorEqual = null;
  this.parsedFlavorIn = null;
  this.parsedFlavorLike = null;
  this.leadDropFolderFileIdEqual = null;
  this.deletedDropFolderFileIdEqual = null;
  this.entryIdEqual = null;
  this.errorCodeEqual = null;
  this.errorCodeIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
};
module.exports.VidiunDropFolderFileBaseFilter = VidiunDropFolderFileBaseFilter;

util.inherits(VidiunDropFolderFileBaseFilter, VidiunFilter);


/**
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  statusEqual  string    .
 * @param  statusIn  string    .
 */
function VidiunEntryAttendeeBaseFilter(){
  VidiunEntryAttendeeBaseFilter.super_.call(this);
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.VidiunEntryAttendeeBaseFilter = VidiunEntryAttendeeBaseFilter;

util.inherits(VidiunEntryAttendeeBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  submittedAtGreaterThanOrEqual  int    .
 * @param  submittedAtLessThanOrEqual  int    .
 * @param  entryIdEqual  string    .
 * @param  entryIdIn  string    .
 * @param  distributionProfileIdEqual  int    .
 * @param  distributionProfileIdIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  dirtyStatusEqual  int    .
 * @param  dirtyStatusIn  string    .
 * @param  sunriseGreaterThanOrEqual  int    .
 * @param  sunriseLessThanOrEqual  int    .
 * @param  sunsetGreaterThanOrEqual  int    .
 * @param  sunsetLessThanOrEqual  int    .
 */
function VidiunEntryDistributionBaseFilter(){
  VidiunEntryDistributionBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.submittedAtGreaterThanOrEqual = null;
  this.submittedAtLessThanOrEqual = null;
  this.entryIdEqual = null;
  this.entryIdIn = null;
  this.distributionProfileIdEqual = null;
  this.distributionProfileIdIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.dirtyStatusEqual = null;
  this.dirtyStatusIn = null;
  this.sunriseGreaterThanOrEqual = null;
  this.sunriseLessThanOrEqual = null;
  this.sunsetGreaterThanOrEqual = null;
  this.sunsetLessThanOrEqual = null;
};
module.exports.VidiunEntryDistributionBaseFilter = VidiunEntryDistributionBaseFilter;

util.inherits(VidiunEntryDistributionBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  typeEqual  string    .
 * @param  typeIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 */
function VidiunEventNotificationTemplateBaseFilter(){
  VidiunEventNotificationTemplateBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.typeEqual = null;
  this.typeIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
};
module.exports.VidiunEventNotificationTemplateBaseFilter = VidiunEventNotificationTemplateBaseFilter;

util.inherits(VidiunEventNotificationTemplateBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  fileAssetObjectTypeEqual  string    .
 * @param  objectIdEqual  string    .
 * @param  objectIdIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  statusEqual  string    .
 * @param  statusIn  string    .
 */
function VidiunFileAssetBaseFilter(){
  VidiunFileAssetBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.partnerIdEqual = null;
  this.fileAssetObjectTypeEqual = null;
  this.objectIdEqual = null;
  this.objectIdIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.VidiunFileAssetBaseFilter = VidiunFileAssetBaseFilter;

util.inherits(VidiunFileAssetBaseFilter, VidiunFilter);


/**
 * @param  partnerIdEqual  int    .
 * @param  fileObjectTypeEqual  string    .
 * @param  fileObjectTypeIn  string    .
 * @param  objectIdEqual  string    .
 * @param  objectIdIn  string    .
 * @param  versionEqual  string    .
 * @param  versionIn  string    .
 * @param  objectSubTypeEqual  int    .
 * @param  objectSubTypeIn  string    .
 * @param  dcEqual  string    .
 * @param  dcIn  string    .
 * @param  originalEqual  int    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  readyAtGreaterThanOrEqual  int    .
 * @param  readyAtLessThanOrEqual  int    .
 * @param  syncTimeGreaterThanOrEqual  int    .
 * @param  syncTimeLessThanOrEqual  int    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  fileTypeEqual  int    .
 * @param  fileTypeIn  string    .
 * @param  linkedIdEqual  int    .
 * @param  linkCountGreaterThanOrEqual  int    .
 * @param  linkCountLessThanOrEqual  int    .
 * @param  fileSizeGreaterThanOrEqual  float    .
 * @param  fileSizeLessThanOrEqual  float    .
 */
function VidiunFileSyncBaseFilter(){
  VidiunFileSyncBaseFilter.super_.call(this);
  this.partnerIdEqual = null;
  this.fileObjectTypeEqual = null;
  this.fileObjectTypeIn = null;
  this.objectIdEqual = null;
  this.objectIdIn = null;
  this.versionEqual = null;
  this.versionIn = null;
  this.objectSubTypeEqual = null;
  this.objectSubTypeIn = null;
  this.dcEqual = null;
  this.dcIn = null;
  this.originalEqual = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.readyAtGreaterThanOrEqual = null;
  this.readyAtLessThanOrEqual = null;
  this.syncTimeGreaterThanOrEqual = null;
  this.syncTimeLessThanOrEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.fileTypeEqual = null;
  this.fileTypeIn = null;
  this.linkedIdEqual = null;
  this.linkCountGreaterThanOrEqual = null;
  this.linkCountLessThanOrEqual = null;
  this.fileSizeGreaterThanOrEqual = null;
  this.fileSizeLessThanOrEqual = null;
};
module.exports.VidiunFileSyncBaseFilter = VidiunFileSyncBaseFilter;

util.inherits(VidiunFileSyncBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  genericDistributionProviderIdEqual  int    .
 * @param  genericDistributionProviderIdIn  string    .
 * @param  actionEqual  int    .
 * @param  actionIn  string    .
 */
function VidiunGenericDistributionProviderActionBaseFilter(){
  VidiunGenericDistributionProviderActionBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.genericDistributionProviderIdEqual = null;
  this.genericDistributionProviderIdIn = null;
  this.actionEqual = null;
  this.actionIn = null;
};
module.exports.VidiunGenericDistributionProviderActionBaseFilter = VidiunGenericDistributionProviderActionBaseFilter;

util.inherits(VidiunGenericDistributionProviderActionBaseFilter, VidiunFilter);


/**
 * @param  indexIdGreaterThan  int    .
 */
function VidiunIndexAdvancedFilter(){
  VidiunIndexAdvancedFilter.super_.call(this);
  this.indexIdGreaterThan = null;
};
module.exports.VidiunIndexAdvancedFilter = VidiunIndexAdvancedFilter;

util.inherits(VidiunIndexAdvancedFilter, VidiunSearchItem);


/**
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  statusEqual  string    .
 * @param  statusIn  string    .
 * @param  channelIdEqual  string    .
 * @param  channelIdIn  string    .
 * @param  startTimeGreaterThanOrEqual  float    .
 * @param  startTimeLessThanOrEqual  float    .
 */
function VidiunLiveChannelSegmentBaseFilter(){
  VidiunLiveChannelSegmentBaseFilter.super_.call(this);
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.channelIdEqual = null;
  this.channelIdIn = null;
  this.startTimeGreaterThanOrEqual = null;
  this.startTimeLessThanOrEqual = null;
};
module.exports.VidiunLiveChannelSegmentBaseFilter = VidiunLiveChannelSegmentBaseFilter;

util.inherits(VidiunLiveChannelSegmentBaseFilter, VidiunFilter);


/**
 * @param  flavorAssetIdEqual  string    .
 */
function VidiunMediaInfoBaseFilter(){
  VidiunMediaInfoBaseFilter.super_.call(this);
  this.flavorAssetIdEqual = null;
};
module.exports.VidiunMediaInfoBaseFilter = VidiunMediaInfoBaseFilter;

util.inherits(VidiunMediaInfoBaseFilter, VidiunFilter);


/**
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 */
function VidiunMediaServerBaseFilter(){
  VidiunMediaServerBaseFilter.super_.call(this);
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
};
module.exports.VidiunMediaServerBaseFilter = VidiunMediaServerBaseFilter;

util.inherits(VidiunMediaServerBaseFilter, VidiunFilter);


/**
 * @param  partnerIdEqual  int    .
 * @param  metadataProfileIdEqual  int    .
 * @param  metadataProfileVersionEqual  int    .
 * @param  metadataProfileVersionGreaterThanOrEqual  int    .
 * @param  metadataProfileVersionLessThanOrEqual  int    .
 * @param  metadataObjectTypeEqual  string    .
 * @param  objectIdEqual  string    .
 * @param  objectIdIn  string    .
 * @param  versionEqual  int    .
 * @param  versionGreaterThanOrEqual  int    .
 * @param  versionLessThanOrEqual  int    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 */
function VidiunMetadataBaseFilter(){
  VidiunMetadataBaseFilter.super_.call(this);
  this.partnerIdEqual = null;
  this.metadataProfileIdEqual = null;
  this.metadataProfileVersionEqual = null;
  this.metadataProfileVersionGreaterThanOrEqual = null;
  this.metadataProfileVersionLessThanOrEqual = null;
  this.metadataObjectTypeEqual = null;
  this.objectIdEqual = null;
  this.objectIdIn = null;
  this.versionEqual = null;
  this.versionGreaterThanOrEqual = null;
  this.versionLessThanOrEqual = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.VidiunMetadataBaseFilter = VidiunMetadataBaseFilter;

util.inherits(VidiunMetadataBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  partnerIdEqual  int    .
 * @param  metadataObjectTypeEqual  string    .
 * @param  metadataObjectTypeIn  string    .
 * @param  versionEqual  int    .
 * @param  nameEqual  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  createModeEqual  int    .
 * @param  createModeNotEqual  int    .
 * @param  createModeIn  string    .
 * @param  createModeNotIn  string    .
 */
function VidiunMetadataProfileBaseFilter(){
  VidiunMetadataProfileBaseFilter.super_.call(this);
  this.idEqual = null;
  this.partnerIdEqual = null;
  this.metadataObjectTypeEqual = null;
  this.metadataObjectTypeIn = null;
  this.versionEqual = null;
  this.nameEqual = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.createModeEqual = null;
  this.createModeNotEqual = null;
  this.createModeIn = null;
  this.createModeNotIn = null;
};
module.exports.VidiunMetadataProfileBaseFilter = VidiunMetadataProfileBaseFilter;

util.inherits(VidiunMetadataProfileBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  idNotIn  string    .
 * @param  nameLike  string    .
 * @param  nameMultiLikeOr  string    .
 * @param  nameMultiLikeAnd  string    .
 * @param  nameEqual  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  partnerPackageEqual  int    .
 * @param  partnerPackageGreaterThanOrEqual  int    .
 * @param  partnerPackageLessThanOrEqual  int    .
 * @param  partnerGroupTypeEqual  int    .
 * @param  partnerNameDescriptionWebsiteAdminNameAdminEmailLike  string    .
 */
function VidiunPartnerBaseFilter(){
  VidiunPartnerBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.idNotIn = null;
  this.nameLike = null;
  this.nameMultiLikeOr = null;
  this.nameMultiLikeAnd = null;
  this.nameEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.partnerPackageEqual = null;
  this.partnerPackageGreaterThanOrEqual = null;
  this.partnerPackageLessThanOrEqual = null;
  this.partnerGroupTypeEqual = null;
  this.partnerNameDescriptionWebsiteAdminNameAdminEmailLike = null;
};
module.exports.VidiunPartnerBaseFilter = VidiunPartnerBaseFilter;

util.inherits(VidiunPartnerBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  typeEqual  int    .
 * @param  typeIn  string    .
 * @param  nameEqual  string    .
 * @param  nameIn  string    .
 * @param  friendlyNameLike  string    .
 * @param  descriptionLike  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  dependsOnPermissionNamesMultiLikeOr  string    .
 * @param  dependsOnPermissionNamesMultiLikeAnd  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 */
function VidiunPermissionBaseFilter(){
  VidiunPermissionBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.typeEqual = null;
  this.typeIn = null;
  this.nameEqual = null;
  this.nameIn = null;
  this.friendlyNameLike = null;
  this.descriptionLike = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.dependsOnPermissionNamesMultiLikeOr = null;
  this.dependsOnPermissionNamesMultiLikeAnd = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
};
module.exports.VidiunPermissionBaseFilter = VidiunPermissionBaseFilter;

util.inherits(VidiunPermissionBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  typeEqual  string    .
 * @param  typeIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 */
function VidiunPermissionItemBaseFilter(){
  VidiunPermissionItemBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.typeEqual = null;
  this.typeIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
};
module.exports.VidiunPermissionItemBaseFilter = VidiunPermissionItemBaseFilter;

util.inherits(VidiunPermissionItemBaseFilter, VidiunFilter);


/**
 * @param  plays  int    Number of plays
 *  	  (readOnly).
 * @param  views  int    Number of views
 *  	  (readOnly).
 * @param  lastPlayedAt  int    The last time the entry was played
 *  	  (readOnly).
 * @param  width  int    The width in pixels
 *  	  (readOnly).
 * @param  height  int    The height in pixels
 *  	  (readOnly).
 * @param  duration  int    The duration in seconds
 *  	  (readOnly).
 * @param  msDuration  int    The duration in miliseconds
 *  	 .
 * @param  durationType  string    The duration type (short for 0-4 mins, medium for 4-20 mins, long for 20+ mins)
 *  	  (readOnly).
 */
function VidiunPlayableEntry(){
  VidiunPlayableEntry.super_.call(this);
  this.plays = null;
  this.views = null;
  this.lastPlayedAt = null;
  this.width = null;
  this.height = null;
  this.duration = null;
  this.msDuration = null;
  this.durationType = null;
};
module.exports.VidiunPlayableEntry = VidiunPlayableEntry;

util.inherits(VidiunPlayableEntry, VidiunBaseEntry);


/**
 * @param  playlistContent  string    Content of the playlist - 
 *  	 XML if the playlistType is dynamic 
 *  	 text if the playlistType is static 
 *  	 url if the playlistType is mRss 
 *  	 .
 * @param  filters  array    .
 * @param  totalResults  int    Maximum count of results to be returned in playlist execution
 *  	 .
 * @param  playlistType  int    Type of playlist
 *  	 .
 * @param  plays  int    Number of plays
 *  	  (readOnly).
 * @param  views  int    Number of views
 *  	  (readOnly).
 * @param  duration  int    The duration in seconds
 *  	  (readOnly).
 * @param  executeUrl  string    The url for this playlist
 *  	  (readOnly).
 */
function VidiunPlaylist(){
  VidiunPlaylist.super_.call(this);
  this.playlistContent = null;
  this.filters = null;
  this.totalResults = null;
  this.playlistType = null;
  this.plays = null;
  this.views = null;
  this.duration = null;
  this.executeUrl = null;
};
module.exports.VidiunPlaylist = VidiunPlaylist;

util.inherits(VidiunPlaylist, VidiunBaseEntry);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 */
function VidiunReportBaseFilter(){
  VidiunReportBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
};
module.exports.VidiunReportBaseFilter = VidiunReportBaseFilter;

util.inherits(VidiunReportBaseFilter, VidiunFilter);


/**
 * @param  field  string    .
 * @param  value  string    .
 */
function VidiunSearchCondition(){
  VidiunSearchCondition.super_.call(this);
  this.field = null;
  this.value = null;
};
module.exports.VidiunSearchCondition = VidiunSearchCondition;

util.inherits(VidiunSearchCondition, VidiunSearchItem);


/**
 * @param  type  int    .
 * @param  items  array    .
 */
function VidiunSearchOperator(){
  VidiunSearchOperator.super_.call(this);
  this.type = null;
  this.items = null;
};
module.exports.VidiunSearchOperator = VidiunSearchOperator;

util.inherits(VidiunSearchOperator, VidiunSearchItem);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  expiresAtGreaterThanOrEqual  int    .
 * @param  expiresAtLessThanOrEqual  int    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  userIdEqual  string    .
 * @param  userIdIn  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 */
function VidiunShortLinkBaseFilter(){
  VidiunShortLinkBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.expiresAtGreaterThanOrEqual = null;
  this.expiresAtLessThanOrEqual = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.userIdEqual = null;
  this.userIdIn = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.VidiunShortLinkBaseFilter = VidiunShortLinkBaseFilter;

util.inherits(VidiunShortLinkBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  protocolEqual  string    .
 * @param  protocolIn  string    .
 */
function VidiunStorageProfileBaseFilter(){
  VidiunStorageProfileBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.protocolEqual = null;
  this.protocolIn = null;
};
module.exports.VidiunStorageProfileBaseFilter = VidiunStorageProfileBaseFilter;

util.inherits(VidiunStorageProfileBaseFilter, VidiunFilter);


/**
 * @param  fromDate  int    Date range from
 *  	 .
 * @param  toDate  int    Date range to
 *  	 .
 * @param  timezoneOffset  int    Time zone offset
 *  	 .
 */
function VidiunSystemPartnerUsageFilter(){
  VidiunSystemPartnerUsageFilter.super_.call(this);
  this.fromDate = null;
  this.toDate = null;
  this.timezoneOffset = null;
};
module.exports.VidiunSystemPartnerUsageFilter = VidiunSystemPartnerUsageFilter;

util.inherits(VidiunSystemPartnerUsageFilter, VidiunFilter);


/**
 * @param  objectTypeEqual  string    .
 * @param  tagEqual  string    .
 * @param  tagStartsWith  string    .
 * @param  instanceCountEqual  int    .
 * @param  instanceCountIn  int    .
 */
function VidiunTagFilter(){
  VidiunTagFilter.super_.call(this);
  this.objectTypeEqual = null;
  this.tagEqual = null;
  this.tagStartsWith = null;
  this.instanceCountEqual = null;
  this.instanceCountIn = null;
};
module.exports.VidiunTagFilter = VidiunTagFilter;

util.inherits(VidiunTagFilter, VidiunFilter);

/**
* @param  isPublic  bool    .
*/
function VidiunUiConfAdmin(){
 VidiunUiConfAdmin.super_.call(this);
 this.isPublic = null;
};
module.exports.VidiunUiConfAdmin = VidiunUiConfAdmin;

util.inherits(VidiunUiConfAdmin, VidiunUiConf);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  nameLike  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  objTypeEqual  int    .
 * @param  objTypeIn  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  creationModeEqual  int    .
 * @param  creationModeIn  string    .
 * @param  versionEqual  string    .
 * @param  versionMultiLikeOr  string    .
 * @param  versionMultiLikeAnd  string    .
 * @param  partnerTagsMultiLikeOr  string    .
 * @param  partnerTagsMultiLikeAnd  string    .
 */
function VidiunUiConfBaseFilter(){
  VidiunUiConfBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.nameLike = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.objTypeEqual = null;
  this.objTypeIn = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.creationModeEqual = null;
  this.creationModeIn = null;
  this.versionEqual = null;
  this.versionMultiLikeOr = null;
  this.versionMultiLikeAnd = null;
  this.partnerTagsMultiLikeOr = null;
  this.partnerTagsMultiLikeAnd = null;
};
module.exports.VidiunUiConfBaseFilter = VidiunUiConfBaseFilter;

util.inherits(VidiunUiConfBaseFilter, VidiunFilter);


/**
 * @param  idEqual  string    .
 * @param  idIn  string    .
 * @param  userIdEqual  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  fileNameEqual  string    .
 * @param  fileSizeEqual  float    .
 */
function VidiunUploadTokenBaseFilter(){
  VidiunUploadTokenBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.userIdEqual = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.fileNameEqual = null;
  this.fileSizeEqual = null;
};
module.exports.VidiunUploadTokenBaseFilter = VidiunUploadTokenBaseFilter;

util.inherits(VidiunUploadTokenBaseFilter, VidiunFilter);


/**
 * @param  partnerIdEqual  int    .
 * @param  screenNameLike  string    .
 * @param  screenNameStartsWith  string    .
 * @param  emailLike  string    .
 * @param  emailStartsWith  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  firstNameStartsWith  string    .
 * @param  lastNameStartsWith  string    .
 * @param  isAdminEqual  int    .
 */
function VidiunUserBaseFilter(){
  VidiunUserBaseFilter.super_.call(this);
  this.partnerIdEqual = null;
  this.screenNameLike = null;
  this.screenNameStartsWith = null;
  this.emailLike = null;
  this.emailStartsWith = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.firstNameStartsWith = null;
  this.lastNameStartsWith = null;
  this.isAdminEqual = null;
};
module.exports.VidiunUserBaseFilter = VidiunUserBaseFilter;

util.inherits(VidiunUserBaseFilter, VidiunFilter);


/**
 * @param  loginEmailEqual  string    .
 */
function VidiunUserLoginDataBaseFilter(){
  VidiunUserLoginDataBaseFilter.super_.call(this);
  this.loginEmailEqual = null;
};
module.exports.VidiunUserLoginDataBaseFilter = VidiunUserLoginDataBaseFilter;

util.inherits(VidiunUserLoginDataBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  nameEqual  string    .
 * @param  nameIn  string    .
 * @param  systemNameEqual  string    .
 * @param  systemNameIn  string    .
 * @param  descriptionLike  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  tagsMultiLikeOr  string    .
 * @param  tagsMultiLikeAnd  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 */
function VidiunUserRoleBaseFilter(){
  VidiunUserRoleBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.nameEqual = null;
  this.nameIn = null;
  this.systemNameEqual = null;
  this.systemNameIn = null;
  this.descriptionLike = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.tagsMultiLikeOr = null;
  this.tagsMultiLikeAnd = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
};
module.exports.VidiunUserRoleBaseFilter = VidiunUserRoleBaseFilter;

util.inherits(VidiunUserRoleBaseFilter, VidiunFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  nameEqual  string    .
 * @param  nameLike  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  engineTypeEqual  string    .
 * @param  engineTypeIn  string    .
 */
function VidiunVirusScanProfileBaseFilter(){
  VidiunVirusScanProfileBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.nameEqual = null;
  this.nameLike = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.engineTypeEqual = null;
  this.engineTypeIn = null;
};
module.exports.VidiunVirusScanProfileBaseFilter = VidiunVirusScanProfileBaseFilter;

util.inherits(VidiunVirusScanProfileBaseFilter, VidiunFilter);


/**
 * @param  idEqual  string    .
 * @param  idIn  string    .
 * @param  sourceWidgetIdEqual  string    .
 * @param  rootWidgetIdEqual  string    .
 * @param  partnerIdEqual  int    .
 * @param  entryIdEqual  string    .
 * @param  uiConfIdEqual  int    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  partnerDataLike  string    .
 */
function VidiunWidgetBaseFilter(){
  VidiunWidgetBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.sourceWidgetIdEqual = null;
  this.rootWidgetIdEqual = null;
  this.partnerIdEqual = null;
  this.entryIdEqual = null;
  this.uiConfIdEqual = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.partnerDataLike = null;
};
module.exports.VidiunWidgetBaseFilter = VidiunWidgetBaseFilter;

util.inherits(VidiunWidgetBaseFilter, VidiunFilter);


/**
 */
function VidiunAccessControlFilter(){
  VidiunAccessControlFilter.super_.call(this);
};
module.exports.VidiunAccessControlFilter = VidiunAccessControlFilter;

util.inherits(VidiunAccessControlFilter, VidiunAccessControlBaseFilter);


/**
 */
function VidiunAccessControlProfileFilter(){
  VidiunAccessControlProfileFilter.super_.call(this);
};
module.exports.VidiunAccessControlProfileFilter = VidiunAccessControlProfileFilter;

util.inherits(VidiunAccessControlProfileFilter, VidiunAccessControlProfileBaseFilter);


/**
 */
function VidiunAssetFilter(){
  VidiunAssetFilter.super_.call(this);
};
module.exports.VidiunAssetFilter = VidiunAssetFilter;

util.inherits(VidiunAssetFilter, VidiunAssetBaseFilter);


/**
 */
function VidiunAssetParamsFilter(){
  VidiunAssetParamsFilter.super_.call(this);
};
module.exports.VidiunAssetParamsFilter = VidiunAssetParamsFilter;

util.inherits(VidiunAssetParamsFilter, VidiunAssetParamsBaseFilter);


/**
 * @param  assetId  string    ID of the source asset 
 *  	 .
 */
function VidiunAssetResource(){
  VidiunAssetResource.super_.call(this);
  this.assetId = null;
};
module.exports.VidiunAssetResource = VidiunAssetResource;

util.inherits(VidiunAssetResource, VidiunContentResource);


/**
 */
function VidiunAuditTrailFilter(){
  VidiunAuditTrailFilter.super_.call(this);
};
module.exports.VidiunAuditTrailFilter = VidiunAuditTrailFilter;

util.inherits(VidiunAuditTrailFilter, VidiunAuditTrailBaseFilter);


/**
 */
function VidiunBaseSyndicationFeedFilter(){
  VidiunBaseSyndicationFeedFilter.super_.call(this);
};
module.exports.VidiunBaseSyndicationFeedFilter = VidiunBaseSyndicationFeedFilter;

util.inherits(VidiunBaseSyndicationFeedFilter, VidiunBaseSyndicationFeedBaseFilter);


/**
 */
function VidiunBatchJobFilter(){
  VidiunBatchJobFilter.super_.call(this);
};
module.exports.VidiunBatchJobFilter = VidiunBatchJobFilter;

util.inherits(VidiunBatchJobFilter, VidiunBatchJobBaseFilter);


/**
 */
function VidiunBulkUploadFilter(){
  VidiunBulkUploadFilter.super_.call(this);
};
module.exports.VidiunBulkUploadFilter = VidiunBulkUploadFilter;

util.inherits(VidiunBulkUploadFilter, VidiunBulkUploadBaseFilter);


/**
 */
function VidiunCategoryEntryFilter(){
  VidiunCategoryEntryFilter.super_.call(this);
};
module.exports.VidiunCategoryEntryFilter = VidiunCategoryEntryFilter;

util.inherits(VidiunCategoryEntryFilter, VidiunCategoryEntryBaseFilter);


/**
 * @param  freeText  string    .
 * @param  membersIn  string    .
 * @param  nameOrReferenceIdStartsWith  string    .
 * @param  managerEqual  string    .
 * @param  memberEqual  string    .
 * @param  fullNameStartsWithIn  string    .
 * @param  ancestorIdIn  string    not includes the category itself (only sub categories)
 *  	 .
 * @param  idOrInheritedParentIdIn  string    .
 */
function VidiunCategoryFilter(){
  VidiunCategoryFilter.super_.call(this);
  this.freeText = null;
  this.membersIn = null;
  this.nameOrReferenceIdStartsWith = null;
  this.managerEqual = null;
  this.memberEqual = null;
  this.fullNameStartsWithIn = null;
  this.ancestorIdIn = null;
  this.idOrInheritedParentIdIn = null;
};
module.exports.VidiunCategoryFilter = VidiunCategoryFilter;

util.inherits(VidiunCategoryFilter, VidiunCategoryBaseFilter);


/**
 * @param  categoryDirectMembers  bool    Return the list of categoryUser that are not inherited from parent category - only the direct categoryUsers.
 *  	 .
 * @param  freeText  string    Free text search on user id or screen name
 *  	 .
 */
function VidiunCategoryUserFilter(){
  VidiunCategoryUserFilter.super_.call(this);
  this.categoryDirectMembers = null;
  this.freeText = null;
};
module.exports.VidiunCategoryUserFilter = VidiunCategoryUserFilter;

util.inherits(VidiunCategoryUserFilter, VidiunCategoryUserBaseFilter);


/**
 */
function VidiunControlPanelCommandFilter(){
  VidiunControlPanelCommandFilter.super_.call(this);
};
module.exports.VidiunControlPanelCommandFilter = VidiunControlPanelCommandFilter;

util.inherits(VidiunControlPanelCommandFilter, VidiunControlPanelCommandBaseFilter);


/**
 */
function VidiunConversionProfileFilter(){
  VidiunConversionProfileFilter.super_.call(this);
};
module.exports.VidiunConversionProfileFilter = VidiunConversionProfileFilter;

util.inherits(VidiunConversionProfileFilter, VidiunConversionProfileBaseFilter);


/**
 * @param  conversionProfileIdFilter  VidiunConversionProfileFilter    .
 * @param  assetParamsIdFilter  VidiunAssetParamsFilter    .
 */
function VidiunConversionProfileAssetParamsFilter(){
  VidiunConversionProfileAssetParamsFilter.super_.call(this);
  this.conversionProfileIdFilter = null;
  this.assetParamsIdFilter = null;
};
module.exports.VidiunConversionProfileAssetParamsFilter = VidiunConversionProfileAssetParamsFilter;

util.inherits(VidiunConversionProfileAssetParamsFilter, VidiunConversionProfileAssetParamsBaseFilter);


/**
 */
function VidiunCuePointFilter(){
  VidiunCuePointFilter.super_.call(this);
};
module.exports.VidiunCuePointFilter = VidiunCuePointFilter;

util.inherits(VidiunCuePointFilter, VidiunCuePointBaseFilter);


/**
 */
function VidiunDistributionProfileFilter(){
  VidiunDistributionProfileFilter.super_.call(this);
};
module.exports.VidiunDistributionProfileFilter = VidiunDistributionProfileFilter;

util.inherits(VidiunDistributionProfileFilter, VidiunDistributionProfileBaseFilter);


/**
 */
function VidiunDistributionProviderFilter(){
  VidiunDistributionProviderFilter.super_.call(this);
};
module.exports.VidiunDistributionProviderFilter = VidiunDistributionProviderFilter;

util.inherits(VidiunDistributionProviderFilter, VidiunDistributionProviderBaseFilter);


/**
 */
function VidiunDrmDeviceFilter(){
  VidiunDrmDeviceFilter.super_.call(this);
};
module.exports.VidiunDrmDeviceFilter = VidiunDrmDeviceFilter;

util.inherits(VidiunDrmDeviceFilter, VidiunDrmDeviceBaseFilter);


/**
 */
function VidiunDrmPolicyFilter(){
  VidiunDrmPolicyFilter.super_.call(this);
};
module.exports.VidiunDrmPolicyFilter = VidiunDrmPolicyFilter;

util.inherits(VidiunDrmPolicyFilter, VidiunDrmPolicyBaseFilter);


/**
 */
function VidiunDrmProfileFilter(){
  VidiunDrmProfileFilter.super_.call(this);
};
module.exports.VidiunDrmProfileFilter = VidiunDrmProfileFilter;

util.inherits(VidiunDrmProfileFilter, VidiunDrmProfileBaseFilter);


/**
 */
function VidiunDropFolderFileFilter(){
  VidiunDropFolderFileFilter.super_.call(this);
};
module.exports.VidiunDropFolderFileFilter = VidiunDropFolderFileFilter;

util.inherits(VidiunDropFolderFileFilter, VidiunDropFolderFileBaseFilter);


/**
 * @param  currentDc  int    .
 */
function VidiunDropFolderFilter(){
  VidiunDropFolderFilter.super_.call(this);
  this.currentDc = null;
};
module.exports.VidiunDropFolderFilter = VidiunDropFolderFilter;

util.inherits(VidiunDropFolderFilter, VidiunDropFolderBaseFilter);


/**
 */
function VidiunEntryAttendeeFilter(){
  VidiunEntryAttendeeFilter.super_.call(this);
};
module.exports.VidiunEntryAttendeeFilter = VidiunEntryAttendeeFilter;

util.inherits(VidiunEntryAttendeeFilter, VidiunEntryAttendeeBaseFilter);


/**
 */
function VidiunEntryDistributionFilter(){
  VidiunEntryDistributionFilter.super_.call(this);
};
module.exports.VidiunEntryDistributionFilter = VidiunEntryDistributionFilter;

util.inherits(VidiunEntryDistributionFilter, VidiunEntryDistributionBaseFilter);


/**
 * @param  entryId  string    ID of the source entry 
 *  	 .
 * @param  flavorParamsId  int    ID of the source flavor params, set to null to use the source flavor
 *  	 .
 */
function VidiunEntryResource(){
  VidiunEntryResource.super_.call(this);
  this.entryId = null;
  this.flavorParamsId = null;
};
module.exports.VidiunEntryResource = VidiunEntryResource;

util.inherits(VidiunEntryResource, VidiunContentResource);


/**
 */
function VidiunEventNotificationTemplateFilter(){
  VidiunEventNotificationTemplateFilter.super_.call(this);
};
module.exports.VidiunEventNotificationTemplateFilter = VidiunEventNotificationTemplateFilter;

util.inherits(VidiunEventNotificationTemplateFilter, VidiunEventNotificationTemplateBaseFilter);


/**
 */
function VidiunFileAssetFilter(){
  VidiunFileAssetFilter.super_.call(this);
};
module.exports.VidiunFileAssetFilter = VidiunFileAssetFilter;

util.inherits(VidiunFileAssetFilter, VidiunFileAssetBaseFilter);


/**
 * @param  currentDc  int    .
 */
function VidiunFileSyncFilter(){
  VidiunFileSyncFilter.super_.call(this);
  this.currentDc = null;
};
module.exports.VidiunFileSyncFilter = VidiunFileSyncFilter;

util.inherits(VidiunFileSyncFilter, VidiunFileSyncBaseFilter);


/**
 * @param  fileSyncObjectType  int    The object type of the file sync object 
 *  	 .
 * @param  objectSubType  int    The object sub-type of the file sync object 
 *  	 .
 * @param  objectId  string    The object id of the file sync object 
 *  	 .
 * @param  version  string    The version of the file sync object 
 *  	 .
 */
function VidiunFileSyncResource(){
  VidiunFileSyncResource.super_.call(this);
  this.fileSyncObjectType = null;
  this.objectSubType = null;
  this.objectId = null;
  this.version = null;
};
module.exports.VidiunFileSyncResource = VidiunFileSyncResource;

util.inherits(VidiunFileSyncResource, VidiunContentResource);


/**
 */
function VidiunGenericDistributionProviderActionFilter(){
  VidiunGenericDistributionProviderActionFilter.super_.call(this);
};
module.exports.VidiunGenericDistributionProviderActionFilter = VidiunGenericDistributionProviderActionFilter;

util.inherits(VidiunGenericDistributionProviderActionFilter, VidiunGenericDistributionProviderActionBaseFilter);


/**
 */
function VidiunLiveChannelSegmentFilter(){
  VidiunLiveChannelSegmentFilter.super_.call(this);
};
module.exports.VidiunLiveChannelSegmentFilter = VidiunLiveChannelSegmentFilter;

util.inherits(VidiunLiveChannelSegmentFilter, VidiunLiveChannelSegmentBaseFilter);


/**
 * @param  mediaType  int    The media type of the entry
 *  	  (insertOnly).
 * @param  conversionQuality  string    Override the default conversion quality  
 *  	  (insertOnly).
 * @param  sourceType  string    The source type of the entry 
 *  	  (insertOnly).
 * @param  searchProviderType  int    The search provider type used to import this entry
 *  	  (insertOnly).
 * @param  searchProviderId  string    The ID of the media in the importing site
 *  	  (insertOnly).
 * @param  creditUserName  string    The user name used for credits
 *  	 .
 * @param  creditUrl  string    The URL for credits
 *  	 .
 * @param  mediaDate  int    The media date extracted from EXIF data (For images) as Unix timestamp (In seconds)
 *  	  (readOnly).
 * @param  dataUrl  string    The URL used for playback. This is not the download URL.
 *  	  (readOnly).
 * @param  flavorParamsIds  string    Comma separated flavor params ids that exists for this media entry
 *  	  (readOnly).
 */
function VidiunMediaEntry(){
  VidiunMediaEntry.super_.call(this);
  this.mediaType = null;
  this.conversionQuality = null;
  this.sourceType = null;
  this.searchProviderType = null;
  this.searchProviderId = null;
  this.creditUserName = null;
  this.creditUrl = null;
  this.mediaDate = null;
  this.dataUrl = null;
  this.flavorParamsIds = null;
};
module.exports.VidiunMediaEntry = VidiunMediaEntry;

util.inherits(VidiunMediaEntry, VidiunPlayableEntry);


/**
 */
function VidiunMediaInfoFilter(){
  VidiunMediaInfoFilter.super_.call(this);
};
module.exports.VidiunMediaInfoFilter = VidiunMediaInfoFilter;

util.inherits(VidiunMediaInfoFilter, VidiunMediaInfoBaseFilter);


/**
 */
function VidiunMediaServerFilter(){
  VidiunMediaServerFilter.super_.call(this);
};
module.exports.VidiunMediaServerFilter = VidiunMediaServerFilter;

util.inherits(VidiunMediaServerFilter, VidiunMediaServerBaseFilter);


/**
 */
function VidiunMetadataFilter(){
  VidiunMetadataFilter.super_.call(this);
};
module.exports.VidiunMetadataFilter = VidiunMetadataFilter;

util.inherits(VidiunMetadataFilter, VidiunMetadataBaseFilter);


/**
 */
function VidiunMetadataProfileFilter(){
  VidiunMetadataProfileFilter.super_.call(this);
};
module.exports.VidiunMetadataProfileFilter = VidiunMetadataProfileFilter;

util.inherits(VidiunMetadataProfileFilter, VidiunMetadataProfileBaseFilter);


/**
 * @param  metadataProfileId  int    .
 * @param  orderBy  string    .
 */
function VidiunMetadataSearchItem(){
  VidiunMetadataSearchItem.super_.call(this);
  this.metadataProfileId = null;
  this.orderBy = null;
};
module.exports.VidiunMetadataSearchItem = VidiunMetadataSearchItem;

util.inherits(VidiunMetadataSearchItem, VidiunSearchOperator);


/**
 * @param  hasRealThumbnail  bool    Indicates whether the user has submited a real thumbnail to the mix (Not the one that was generated automaticaly)
 *  	  (readOnly).
 * @param  editorType  int    The editor type used to edit the metadata
 *  	 .
 * @param  dataContent  string    The xml data of the mix
 *  	 .
 */
function VidiunMixEntry(){
  VidiunMixEntry.super_.call(this);
  this.hasRealThumbnail = null;
  this.editorType = null;
  this.dataContent = null;
};
module.exports.VidiunMixEntry = VidiunMixEntry;

util.inherits(VidiunMixEntry, VidiunPlayableEntry);


/**
 * @param  resource  VidiunContentResource    Only VidiunEntryResource and VidiunAssetResource are supported
 *  	 .
 * @param  operationAttributes  array    .
 * @param  assetParamsId  int    ID of alternative asset params to be used instead of the system default flavor params 
 *  	 .
 */
function VidiunOperationResource(){
  VidiunOperationResource.super_.call(this);
  this.resource = null;
  this.operationAttributes = null;
  this.assetParamsId = null;
};
module.exports.VidiunOperationResource = VidiunOperationResource;

util.inherits(VidiunOperationResource, VidiunContentResource);


/**
 */
function VidiunPartnerFilter(){
  VidiunPartnerFilter.super_.call(this);
};
module.exports.VidiunPartnerFilter = VidiunPartnerFilter;

util.inherits(VidiunPartnerFilter, VidiunPartnerBaseFilter);


/**
 */
function VidiunPermissionFilter(){
  VidiunPermissionFilter.super_.call(this);
};
module.exports.VidiunPermissionFilter = VidiunPermissionFilter;

util.inherits(VidiunPermissionFilter, VidiunPermissionBaseFilter);


/**
 */
function VidiunPermissionItemFilter(){
  VidiunPermissionItemFilter.super_.call(this);
};
module.exports.VidiunPermissionItemFilter = VidiunPermissionItemFilter;

util.inherits(VidiunPermissionItemFilter, VidiunPermissionItemBaseFilter);


/**
 * @param  resources  array    Array of remote stoage resources 
 *  	 .
 */
function VidiunRemoteStorageResources(){
  VidiunRemoteStorageResources.super_.call(this);
  this.resources = null;
};
module.exports.VidiunRemoteStorageResources = VidiunRemoteStorageResources;

util.inherits(VidiunRemoteStorageResources, VidiunContentResource);


/**
 */
function VidiunReportFilter(){
  VidiunReportFilter.super_.call(this);
};
module.exports.VidiunReportFilter = VidiunReportFilter;

util.inherits(VidiunReportFilter, VidiunReportBaseFilter);


/**
 * @param  comparison  string    .
 */
function VidiunSearchComparableCondition(){
  VidiunSearchComparableCondition.super_.call(this);
  this.comparison = null;
};
module.exports.VidiunSearchComparableCondition = VidiunSearchComparableCondition;

util.inherits(VidiunSearchComparableCondition, VidiunSearchCondition);


/**
 */
function VidiunShortLinkFilter(){
  VidiunShortLinkFilter.super_.call(this);
};
module.exports.VidiunShortLinkFilter = VidiunShortLinkFilter;

util.inherits(VidiunShortLinkFilter, VidiunShortLinkBaseFilter);


/**
 */
function VidiunStorageProfileFilter(){
  VidiunStorageProfileFilter.super_.call(this);
};
module.exports.VidiunStorageProfileFilter = VidiunStorageProfileFilter;

util.inherits(VidiunStorageProfileFilter, VidiunStorageProfileBaseFilter);


/**
 * @param  content  string    Textual content
 *  	 .
 */
function VidiunStringResource(){
  VidiunStringResource.super_.call(this);
  this.content = null;
};
module.exports.VidiunStringResource = VidiunStringResource;

util.inherits(VidiunStringResource, VidiunContentResource);


/**
 */
function VidiunUiConfFilter(){
  VidiunUiConfFilter.super_.call(this);
};
module.exports.VidiunUiConfFilter = VidiunUiConfFilter;

util.inherits(VidiunUiConfFilter, VidiunUiConfBaseFilter);


/**
 */
function VidiunUploadTokenFilter(){
  VidiunUploadTokenFilter.super_.call(this);
};
module.exports.VidiunUploadTokenFilter = VidiunUploadTokenFilter;

util.inherits(VidiunUploadTokenFilter, VidiunUploadTokenBaseFilter);


/**
 * @param  idOrScreenNameStartsWith  string    .
 * @param  idEqual  string    .
 * @param  idIn  string    .
 * @param  loginEnabledEqual  int    .
 * @param  roleIdEqual  string    .
 * @param  roleIdsEqual  string    .
 * @param  roleIdsIn  string    .
 * @param  firstNameOrLastNameStartsWith  string    .
 * @param  permissionNamesMultiLikeOr  string    Permission names filter expression
 *  	 .
 * @param  permissionNamesMultiLikeAnd  string    Permission names filter expression
 *  	 .
 */
function VidiunUserFilter(){
  VidiunUserFilter.super_.call(this);
  this.idOrScreenNameStartsWith = null;
  this.idEqual = null;
  this.idIn = null;
  this.loginEnabledEqual = null;
  this.roleIdEqual = null;
  this.roleIdsEqual = null;
  this.roleIdsIn = null;
  this.firstNameOrLastNameStartsWith = null;
  this.permissionNamesMultiLikeOr = null;
  this.permissionNamesMultiLikeAnd = null;
};
module.exports.VidiunUserFilter = VidiunUserFilter;

util.inherits(VidiunUserFilter, VidiunUserBaseFilter);


/**
 */
function VidiunUserLoginDataFilter(){
  VidiunUserLoginDataFilter.super_.call(this);
};
module.exports.VidiunUserLoginDataFilter = VidiunUserLoginDataFilter;

util.inherits(VidiunUserLoginDataFilter, VidiunUserLoginDataBaseFilter);


/**
 */
function VidiunUserRoleFilter(){
  VidiunUserRoleFilter.super_.call(this);
};
module.exports.VidiunUserRoleFilter = VidiunUserRoleFilter;

util.inherits(VidiunUserRoleFilter, VidiunUserRoleBaseFilter);


/**
 */
function VidiunVirusScanProfileFilter(){
  VidiunVirusScanProfileFilter.super_.call(this);
};
module.exports.VidiunVirusScanProfileFilter = VidiunVirusScanProfileFilter;

util.inherits(VidiunVirusScanProfileFilter, VidiunVirusScanProfileBaseFilter);


/**
 */
function VidiunWidgetFilter(){
  VidiunWidgetFilter.super_.call(this);
};
module.exports.VidiunWidgetFilter = VidiunWidgetFilter;

util.inherits(VidiunWidgetFilter, VidiunWidgetBaseFilter);


/**
 * @param  protocolTypeEqual  string    .
 * @param  protocolTypeIn  string    .
 * @param  titleLike  string    .
 * @param  titleMultiLikeOr  string    .
 * @param  titleMultiLikeAnd  string    .
 * @param  endTimeGreaterThanOrEqual  int    .
 * @param  endTimeLessThanOrEqual  int    .
 * @param  durationGreaterThanOrEqual  int    .
 * @param  durationLessThanOrEqual  int    .
 */
function VidiunAdCuePointBaseFilter(){
  VidiunAdCuePointBaseFilter.super_.call(this);
  this.protocolTypeEqual = null;
  this.protocolTypeIn = null;
  this.titleLike = null;
  this.titleMultiLikeOr = null;
  this.titleMultiLikeAnd = null;
  this.endTimeGreaterThanOrEqual = null;
  this.endTimeLessThanOrEqual = null;
  this.durationGreaterThanOrEqual = null;
  this.durationLessThanOrEqual = null;
};
module.exports.VidiunAdCuePointBaseFilter = VidiunAdCuePointBaseFilter;

util.inherits(VidiunAdCuePointBaseFilter, VidiunCuePointFilter);


/**
 */
function VidiunAdminUserBaseFilter(){
  VidiunAdminUserBaseFilter.super_.call(this);
};
module.exports.VidiunAdminUserBaseFilter = VidiunAdminUserBaseFilter;

util.inherits(VidiunAdminUserBaseFilter, VidiunUserFilter);


/**
 */
function VidiunAmazonS3StorageProfileBaseFilter(){
  VidiunAmazonS3StorageProfileBaseFilter.super_.call(this);
};
module.exports.VidiunAmazonS3StorageProfileBaseFilter = VidiunAmazonS3StorageProfileBaseFilter;

util.inherits(VidiunAmazonS3StorageProfileBaseFilter, VidiunStorageProfileFilter);


/**
 * @param  parentIdEqual  string    .
 * @param  parentIdIn  string    .
 * @param  textLike  string    .
 * @param  textMultiLikeOr  string    .
 * @param  textMultiLikeAnd  string    .
 * @param  endTimeGreaterThanOrEqual  int    .
 * @param  endTimeLessThanOrEqual  int    .
 * @param  durationGreaterThanOrEqual  int    .
 * @param  durationLessThanOrEqual  int    .
 */
function VidiunAnnotationBaseFilter(){
  VidiunAnnotationBaseFilter.super_.call(this);
  this.parentIdEqual = null;
  this.parentIdIn = null;
  this.textLike = null;
  this.textMultiLikeOr = null;
  this.textMultiLikeAnd = null;
  this.endTimeGreaterThanOrEqual = null;
  this.endTimeLessThanOrEqual = null;
  this.durationGreaterThanOrEqual = null;
  this.durationLessThanOrEqual = null;
};
module.exports.VidiunAnnotationBaseFilter = VidiunAnnotationBaseFilter;

util.inherits(VidiunAnnotationBaseFilter, VidiunCuePointFilter);


/**
 */
function VidiunApiActionPermissionItemBaseFilter(){
  VidiunApiActionPermissionItemBaseFilter.super_.call(this);
};
module.exports.VidiunApiActionPermissionItemBaseFilter = VidiunApiActionPermissionItemBaseFilter;

util.inherits(VidiunApiActionPermissionItemBaseFilter, VidiunPermissionItemFilter);


/**
 */
function VidiunApiParameterPermissionItemBaseFilter(){
  VidiunApiParameterPermissionItemBaseFilter.super_.call(this);
};
module.exports.VidiunApiParameterPermissionItemBaseFilter = VidiunApiParameterPermissionItemBaseFilter;

util.inherits(VidiunApiParameterPermissionItemBaseFilter, VidiunPermissionItemFilter);


/**
 */
function VidiunAssetParamsOutputBaseFilter(){
  VidiunAssetParamsOutputBaseFilter.super_.call(this);
};
module.exports.VidiunAssetParamsOutputBaseFilter = VidiunAssetParamsOutputBaseFilter;

util.inherits(VidiunAssetParamsOutputBaseFilter, VidiunAssetParamsFilter);


/**
 * @param  formatEqual  string    .
 * @param  formatIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  statusNotIn  string    .
 */
function VidiunAttachmentAssetBaseFilter(){
  VidiunAttachmentAssetBaseFilter.super_.call(this);
  this.formatEqual = null;
  this.formatIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.statusNotIn = null;
};
module.exports.VidiunAttachmentAssetBaseFilter = VidiunAttachmentAssetBaseFilter;

util.inherits(VidiunAttachmentAssetBaseFilter, VidiunAssetFilter);


/**
 * @param  jobTypeAndSubTypeIn  string    .
 */
function VidiunBatchJobFilterExt(){
  VidiunBatchJobFilterExt.super_.call(this);
  this.jobTypeAndSubTypeIn = null;
};
module.exports.VidiunBatchJobFilterExt = VidiunBatchJobFilterExt;

util.inherits(VidiunBatchJobFilterExt, VidiunBatchJobFilter);


/**
 * @param  captionParamsIdEqual  int    .
 * @param  captionParamsIdIn  string    .
 * @param  formatEqual  string    .
 * @param  formatIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  statusNotIn  string    .
 */
function VidiunCaptionAssetBaseFilter(){
  VidiunCaptionAssetBaseFilter.super_.call(this);
  this.captionParamsIdEqual = null;
  this.captionParamsIdIn = null;
  this.formatEqual = null;
  this.formatIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.statusNotIn = null;
};
module.exports.VidiunCaptionAssetBaseFilter = VidiunCaptionAssetBaseFilter;

util.inherits(VidiunCaptionAssetBaseFilter, VidiunAssetFilter);


/**
 * @param  formatEqual  string    .
 * @param  formatIn  string    .
 */
function VidiunCaptionParamsBaseFilter(){
  VidiunCaptionParamsBaseFilter.super_.call(this);
  this.formatEqual = null;
  this.formatIn = null;
};
module.exports.VidiunCaptionParamsBaseFilter = VidiunCaptionParamsBaseFilter;

util.inherits(VidiunCaptionParamsBaseFilter, VidiunAssetParamsFilter);


/**
 * @param  codeLike  string    .
 * @param  codeMultiLikeOr  string    .
 * @param  codeMultiLikeAnd  string    .
 * @param  codeEqual  string    .
 * @param  codeIn  string    .
 * @param  descriptionLike  string    .
 * @param  descriptionMultiLikeOr  string    .
 * @param  descriptionMultiLikeAnd  string    .
 * @param  endTimeGreaterThanOrEqual  int    .
 * @param  endTimeLessThanOrEqual  int    .
 * @param  durationGreaterThanOrEqual  int    .
 * @param  durationLessThanOrEqual  int    .
 */
function VidiunCodeCuePointBaseFilter(){
  VidiunCodeCuePointBaseFilter.super_.call(this);
  this.codeLike = null;
  this.codeMultiLikeOr = null;
  this.codeMultiLikeAnd = null;
  this.codeEqual = null;
  this.codeIn = null;
  this.descriptionLike = null;
  this.descriptionMultiLikeOr = null;
  this.descriptionMultiLikeAnd = null;
  this.endTimeGreaterThanOrEqual = null;
  this.endTimeLessThanOrEqual = null;
  this.durationGreaterThanOrEqual = null;
  this.durationLessThanOrEqual = null;
};
module.exports.VidiunCodeCuePointBaseFilter = VidiunCodeCuePointBaseFilter;

util.inherits(VidiunCodeCuePointBaseFilter, VidiunCuePointFilter);


/**
 */
function VidiunConfigurableDistributionProfileBaseFilter(){
  VidiunConfigurableDistributionProfileBaseFilter.super_.call(this);
};
module.exports.VidiunConfigurableDistributionProfileBaseFilter = VidiunConfigurableDistributionProfileBaseFilter;

util.inherits(VidiunConfigurableDistributionProfileBaseFilter, VidiunDistributionProfileFilter);


/**
 */
function VidiunDataEntryBaseFilter(){
  VidiunDataEntryBaseFilter.super_.call(this);
};
module.exports.VidiunDataEntryBaseFilter = VidiunDataEntryBaseFilter;

util.inherits(VidiunDataEntryBaseFilter, VidiunBaseEntryFilter);


/**
 * @param  documentTypeEqual  int    .
 * @param  documentTypeIn  string    .
 * @param  assetParamsIdsMatchOr  string    .
 * @param  assetParamsIdsMatchAnd  string    .
 */
function VidiunDocumentEntryBaseFilter(){
  VidiunDocumentEntryBaseFilter.super_.call(this);
  this.documentTypeEqual = null;
  this.documentTypeIn = null;
  this.assetParamsIdsMatchOr = null;
  this.assetParamsIdsMatchAnd = null;
};
module.exports.VidiunDocumentEntryBaseFilter = VidiunDocumentEntryBaseFilter;

util.inherits(VidiunDocumentEntryBaseFilter, VidiunBaseEntryFilter);


/**
 * @param  dropFolderFileId  int    Id of the drop folder file object
 *  	 .
 */
function VidiunDropFolderFileResource(){
  VidiunDropFolderFileResource.super_.call(this);
  this.dropFolderFileId = null;
};
module.exports.VidiunDropFolderFileResource = VidiunDropFolderFileResource;

util.inherits(VidiunDropFolderFileResource, VidiunDataCenterContentResource);


/**
 */
function VidiunEmailNotificationTemplateBaseFilter(){
  VidiunEmailNotificationTemplateBaseFilter.super_.call(this);
};
module.exports.VidiunEmailNotificationTemplateBaseFilter = VidiunEmailNotificationTemplateBaseFilter;

util.inherits(VidiunEmailNotificationTemplateBaseFilter, VidiunEventNotificationTemplateFilter);


/**
 * @param  externalSourceType  string    The source type of the external media
 *  	  (insertOnly).
 * @param  assetParamsIds  string    Comma separated asset params ids that exists for this external media entry
 *  	  (readOnly).
 */
function VidiunExternalMediaEntry(){
  VidiunExternalMediaEntry.super_.call(this);
  this.externalSourceType = null;
  this.assetParamsIds = null;
};
module.exports.VidiunExternalMediaEntry = VidiunExternalMediaEntry;

util.inherits(VidiunExternalMediaEntry, VidiunMediaEntry);


/**
 * @param  flavorParamsIdEqual  int    .
 * @param  flavorParamsIdIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  statusNotIn  string    .
 */
function VidiunFlavorAssetBaseFilter(){
  VidiunFlavorAssetBaseFilter.super_.call(this);
  this.flavorParamsIdEqual = null;
  this.flavorParamsIdIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.statusNotIn = null;
};
module.exports.VidiunFlavorAssetBaseFilter = VidiunFlavorAssetBaseFilter;

util.inherits(VidiunFlavorAssetBaseFilter, VidiunAssetFilter);


/**
 * @param  formatEqual  string    .
 */
function VidiunFlavorParamsBaseFilter(){
  VidiunFlavorParamsBaseFilter.super_.call(this);
  this.formatEqual = null;
};
module.exports.VidiunFlavorParamsBaseFilter = VidiunFlavorParamsBaseFilter;

util.inherits(VidiunFlavorParamsBaseFilter, VidiunAssetParamsFilter);


/**
 */
function VidiunGenericDistributionProfileBaseFilter(){
  VidiunGenericDistributionProfileBaseFilter.super_.call(this);
};
module.exports.VidiunGenericDistributionProfileBaseFilter = VidiunGenericDistributionProfileBaseFilter;

util.inherits(VidiunGenericDistributionProfileBaseFilter, VidiunDistributionProfileFilter);


/**
 * @param  idEqual  int    .
 * @param  idIn  string    .
 * @param  createdAtGreaterThanOrEqual  int    .
 * @param  createdAtLessThanOrEqual  int    .
 * @param  updatedAtGreaterThanOrEqual  int    .
 * @param  updatedAtLessThanOrEqual  int    .
 * @param  partnerIdEqual  int    .
 * @param  partnerIdIn  string    .
 * @param  isDefaultEqual  int    .
 * @param  isDefaultIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 */
function VidiunGenericDistributionProviderBaseFilter(){
  VidiunGenericDistributionProviderBaseFilter.super_.call(this);
  this.idEqual = null;
  this.idIn = null;
  this.createdAtGreaterThanOrEqual = null;
  this.createdAtLessThanOrEqual = null;
  this.updatedAtGreaterThanOrEqual = null;
  this.updatedAtLessThanOrEqual = null;
  this.partnerIdEqual = null;
  this.partnerIdIn = null;
  this.isDefaultEqual = null;
  this.isDefaultIn = null;
  this.statusEqual = null;
  this.statusIn = null;
};
module.exports.VidiunGenericDistributionProviderBaseFilter = VidiunGenericDistributionProviderBaseFilter;

util.inherits(VidiunGenericDistributionProviderBaseFilter, VidiunDistributionProviderFilter);


/**
 */
function VidiunGenericSyndicationFeedBaseFilter(){
  VidiunGenericSyndicationFeedBaseFilter.super_.call(this);
};
module.exports.VidiunGenericSyndicationFeedBaseFilter = VidiunGenericSyndicationFeedBaseFilter;

util.inherits(VidiunGenericSyndicationFeedBaseFilter, VidiunBaseSyndicationFeedFilter);


/**
 */
function VidiunGoogleVideoSyndicationFeedBaseFilter(){
  VidiunGoogleVideoSyndicationFeedBaseFilter.super_.call(this);
};
module.exports.VidiunGoogleVideoSyndicationFeedBaseFilter = VidiunGoogleVideoSyndicationFeedBaseFilter;

util.inherits(VidiunGoogleVideoSyndicationFeedBaseFilter, VidiunBaseSyndicationFeedFilter);


/**
 */
function VidiunHttpNotificationTemplateBaseFilter(){
  VidiunHttpNotificationTemplateBaseFilter.super_.call(this);
};
module.exports.VidiunHttpNotificationTemplateBaseFilter = VidiunHttpNotificationTemplateBaseFilter;

util.inherits(VidiunHttpNotificationTemplateBaseFilter, VidiunEventNotificationTemplateFilter);


/**
 */
function VidiunITunesSyndicationFeedBaseFilter(){
  VidiunITunesSyndicationFeedBaseFilter.super_.call(this);
};
module.exports.VidiunITunesSyndicationFeedBaseFilter = VidiunITunesSyndicationFeedBaseFilter;

util.inherits(VidiunITunesSyndicationFeedBaseFilter, VidiunBaseSyndicationFeedFilter);


/**
 */
function VidiunKontikiStorageProfileBaseFilter(){
  VidiunKontikiStorageProfileBaseFilter.super_.call(this);
};
module.exports.VidiunKontikiStorageProfileBaseFilter = VidiunKontikiStorageProfileBaseFilter;

util.inherits(VidiunKontikiStorageProfileBaseFilter, VidiunStorageProfileFilter);


/**
 * @param  offlineMessage  string    The message to be presented when the stream is offline
 *  	 .
 * @param  recordStatus  int    Recording Status Enabled/Disabled
 *  	  (insertOnly).
 * @param  dvrStatus  int    DVR Status Enabled/Disabled
 *  	  (insertOnly).
 * @param  dvrWindow  int    Window of time which the DVR allows for backwards scrubbing (in minutes)
 *  	  (insertOnly).
 * @param  liveStreamConfigurations  array    Array of key value protocol->live stream url objects
 *  	 .
 * @param  recordedEntryId  string    Recorded entry id
 *  	 .
 * @param  pushPublishEnabled  int    Flag denoting whether entry should be published by the media server
 *  	 .
 */
function VidiunLiveEntry(){
  VidiunLiveEntry.super_.call(this);
  this.offlineMessage = null;
  this.recordStatus = null;
  this.dvrStatus = null;
  this.dvrWindow = null;
  this.liveStreamConfigurations = null;
  this.recordedEntryId = null;
  this.pushPublishEnabled = null;
};
module.exports.VidiunLiveEntry = VidiunLiveEntry;

util.inherits(VidiunLiveEntry, VidiunMediaEntry);


/**
 */
function VidiunPlaylistBaseFilter(){
  VidiunPlaylistBaseFilter.super_.call(this);
};
module.exports.VidiunPlaylistBaseFilter = VidiunPlaylistBaseFilter;

util.inherits(VidiunPlaylistBaseFilter, VidiunBaseEntryFilter);


/**
 */
function VidiunRemoteDropFolderBaseFilter(){
  VidiunRemoteDropFolderBaseFilter.super_.call(this);
};
module.exports.VidiunRemoteDropFolderBaseFilter = VidiunRemoteDropFolderBaseFilter;

util.inherits(VidiunRemoteDropFolderBaseFilter, VidiunDropFolderFilter);


/**
 * @param  localFilePath  string    Full path to the local file 
 *  	 .
 */
function VidiunServerFileResource(){
  VidiunServerFileResource.super_.call(this);
  this.localFilePath = null;
};
module.exports.VidiunServerFileResource = VidiunServerFileResource;

util.inherits(VidiunServerFileResource, VidiunDataCenterContentResource);


/**
 * @param  privateKey  string    SSH private key
 *  	 .
 * @param  publicKey  string    SSH public key
 *  	 .
 * @param  keyPassphrase  string    Passphrase for SSH keys
 *  	 .
 */
function VidiunSshUrlResource(){
  VidiunSshUrlResource.super_.call(this);
  this.privateKey = null;
  this.publicKey = null;
  this.keyPassphrase = null;
};
module.exports.VidiunSshUrlResource = VidiunSshUrlResource;

util.inherits(VidiunSshUrlResource, VidiunUrlResource);


/**
 */
function VidiunSyndicationDistributionProfileBaseFilter(){
  VidiunSyndicationDistributionProfileBaseFilter.super_.call(this);
};
module.exports.VidiunSyndicationDistributionProfileBaseFilter = VidiunSyndicationDistributionProfileBaseFilter;

util.inherits(VidiunSyndicationDistributionProfileBaseFilter, VidiunDistributionProfileFilter);


/**
 */
function VidiunSyndicationDistributionProviderBaseFilter(){
  VidiunSyndicationDistributionProviderBaseFilter.super_.call(this);
};
module.exports.VidiunSyndicationDistributionProviderBaseFilter = VidiunSyndicationDistributionProviderBaseFilter;

util.inherits(VidiunSyndicationDistributionProviderBaseFilter, VidiunDistributionProviderFilter);


/**
 * @param  partnerParentIdEqual  int    .
 * @param  partnerParentIdIn  string    .
 */
function VidiunSystemPartnerFilter(){
  VidiunSystemPartnerFilter.super_.call(this);
  this.partnerParentIdEqual = null;
  this.partnerParentIdIn = null;
};
module.exports.VidiunSystemPartnerFilter = VidiunSystemPartnerFilter;

util.inherits(VidiunSystemPartnerFilter, VidiunPartnerFilter);


/**
 * @param  thumbParamsIdEqual  int    .
 * @param  thumbParamsIdIn  string    .
 * @param  statusEqual  int    .
 * @param  statusIn  string    .
 * @param  statusNotIn  string    .
 */
function VidiunThumbAssetBaseFilter(){
  VidiunThumbAssetBaseFilter.super_.call(this);
  this.thumbParamsIdEqual = null;
  this.thumbParamsIdIn = null;
  this.statusEqual = null;
  this.statusIn = null;
  this.statusNotIn = null;
};
module.exports.VidiunThumbAssetBaseFilter = VidiunThumbAssetBaseFilter;

util.inherits(VidiunThumbAssetBaseFilter, VidiunAssetFilter);


/**
 * @param  formatEqual  string    .
 */
function VidiunThumbParamsBaseFilter(){
  VidiunThumbParamsBaseFilter.super_.call(this);
  this.formatEqual = null;
};
module.exports.VidiunThumbParamsBaseFilter = VidiunThumbParamsBaseFilter;

util.inherits(VidiunThumbParamsBaseFilter, VidiunAssetParamsFilter);


/**
 */
function VidiunTubeMogulSyndicationFeedBaseFilter(){
  VidiunTubeMogulSyndicationFeedBaseFilter.super_.call(this);
};
module.exports.VidiunTubeMogulSyndicationFeedBaseFilter = VidiunTubeMogulSyndicationFeedBaseFilter;

util.inherits(VidiunTubeMogulSyndicationFeedBaseFilter, VidiunBaseSyndicationFeedFilter);


/**
 */
function VidiunUiConfAdminBaseFilter(){
  VidiunUiConfAdminBaseFilter.super_.call(this);
};
module.exports.VidiunUiConfAdminBaseFilter = VidiunUiConfAdminBaseFilter;

util.inherits(VidiunUiConfAdminBaseFilter, VidiunUiConfFilter);


/**
 * @param  token  string    Token that returned from upload.upload action or uploadToken.add action. 
 *  	 .
 */
function VidiunUploadedFileTokenResource(){
  VidiunUploadedFileTokenResource.super_.call(this);
  this.token = null;
};
module.exports.VidiunUploadedFileTokenResource = VidiunUploadedFileTokenResource;

util.inherits(VidiunUploadedFileTokenResource, VidiunDataCenterContentResource);


/**
 * @param  groupTypeEq  int    Eq filter for the partner's group type
 *       .
 * @param  groupTypeIn  string    In filter for the partner's group type
 *       .
 * @param  partnerPermissionsExist  string    Filter for partner permissions- filter contains comma-separated string of permission names which the returned partners should have.
 *       .
 */
function VidiunVarConsolePartnerFilter(){
  VidiunVarConsolePartnerFilter.super_.call(this);
  this.groupTypeEq = null;
  this.groupTypeIn = null;
  this.partnerPermissionsExist = null;
};
module.exports.VidiunVarConsolePartnerFilter = VidiunVarConsolePartnerFilter;

util.inherits(VidiunVarConsolePartnerFilter, VidiunPartnerFilter);


/**
 * @param  token  string    Token that returned from media server such as FMS or red5.
 *  	 .
 */
function VidiunWebcamTokenResource(){
  VidiunWebcamTokenResource.super_.call(this);
  this.token = null;
};
module.exports.VidiunWebcamTokenResource = VidiunWebcamTokenResource;

util.inherits(VidiunWebcamTokenResource, VidiunDataCenterContentResource);


/**
 */
function VidiunWebexDropFolderBaseFilter(){
  VidiunWebexDropFolderBaseFilter.super_.call(this);
};
module.exports.VidiunWebexDropFolderBaseFilter = VidiunWebexDropFolderBaseFilter;

util.inherits(VidiunWebexDropFolderBaseFilter, VidiunDropFolderFilter);


/**
 */
function VidiunWebexDropFolderFileBaseFilter(){
  VidiunWebexDropFolderFileBaseFilter.super_.call(this);
};
module.exports.VidiunWebexDropFolderFileBaseFilter = VidiunWebexDropFolderFileBaseFilter;

util.inherits(VidiunWebexDropFolderFileBaseFilter, VidiunDropFolderFileFilter);


/**
 */
function VidiunWidevineProfileBaseFilter(){
  VidiunWidevineProfileBaseFilter.super_.call(this);
};
module.exports.VidiunWidevineProfileBaseFilter = VidiunWidevineProfileBaseFilter;

util.inherits(VidiunWidevineProfileBaseFilter, VidiunDrmProfileFilter);


/**
 */
function VidiunYahooSyndicationFeedBaseFilter(){
  VidiunYahooSyndicationFeedBaseFilter.super_.call(this);
};
module.exports.VidiunYahooSyndicationFeedBaseFilter = VidiunYahooSyndicationFeedBaseFilter;

util.inherits(VidiunYahooSyndicationFeedBaseFilter, VidiunBaseSyndicationFeedFilter);


/**
 */
function VidiunAdCuePointFilter(){
  VidiunAdCuePointFilter.super_.call(this);
};
module.exports.VidiunAdCuePointFilter = VidiunAdCuePointFilter;

util.inherits(VidiunAdCuePointFilter, VidiunAdCuePointBaseFilter);


/**
 */
function VidiunAdminUserFilter(){
  VidiunAdminUserFilter.super_.call(this);
};
module.exports.VidiunAdminUserFilter = VidiunAdminUserFilter;

util.inherits(VidiunAdminUserFilter, VidiunAdminUserBaseFilter);


/**
 */
function VidiunAmazonS3StorageProfileFilter(){
  VidiunAmazonS3StorageProfileFilter.super_.call(this);
};
module.exports.VidiunAmazonS3StorageProfileFilter = VidiunAmazonS3StorageProfileFilter;

util.inherits(VidiunAmazonS3StorageProfileFilter, VidiunAmazonS3StorageProfileBaseFilter);


/**
 */
function VidiunAnnotationFilter(){
  VidiunAnnotationFilter.super_.call(this);
};
module.exports.VidiunAnnotationFilter = VidiunAnnotationFilter;

util.inherits(VidiunAnnotationFilter, VidiunAnnotationBaseFilter);


/**
 */
function VidiunApiActionPermissionItemFilter(){
  VidiunApiActionPermissionItemFilter.super_.call(this);
};
module.exports.VidiunApiActionPermissionItemFilter = VidiunApiActionPermissionItemFilter;

util.inherits(VidiunApiActionPermissionItemFilter, VidiunApiActionPermissionItemBaseFilter);


/**
 */
function VidiunApiParameterPermissionItemFilter(){
  VidiunApiParameterPermissionItemFilter.super_.call(this);
};
module.exports.VidiunApiParameterPermissionItemFilter = VidiunApiParameterPermissionItemFilter;

util.inherits(VidiunApiParameterPermissionItemFilter, VidiunApiParameterPermissionItemBaseFilter);


/**
 */
function VidiunAssetParamsOutputFilter(){
  VidiunAssetParamsOutputFilter.super_.call(this);
};
module.exports.VidiunAssetParamsOutputFilter = VidiunAssetParamsOutputFilter;

util.inherits(VidiunAssetParamsOutputFilter, VidiunAssetParamsOutputBaseFilter);


/**
 */
function VidiunAttachmentAssetFilter(){
  VidiunAttachmentAssetFilter.super_.call(this);
};
module.exports.VidiunAttachmentAssetFilter = VidiunAttachmentAssetFilter;

util.inherits(VidiunAttachmentAssetFilter, VidiunAttachmentAssetBaseFilter);


/**
 */
function VidiunCaptionAssetFilter(){
  VidiunCaptionAssetFilter.super_.call(this);
};
module.exports.VidiunCaptionAssetFilter = VidiunCaptionAssetFilter;

util.inherits(VidiunCaptionAssetFilter, VidiunCaptionAssetBaseFilter);


/**
 */
function VidiunCaptionParamsFilter(){
  VidiunCaptionParamsFilter.super_.call(this);
};
module.exports.VidiunCaptionParamsFilter = VidiunCaptionParamsFilter;

util.inherits(VidiunCaptionParamsFilter, VidiunCaptionParamsBaseFilter);


/**
 */
function VidiunCodeCuePointFilter(){
  VidiunCodeCuePointFilter.super_.call(this);
};
module.exports.VidiunCodeCuePointFilter = VidiunCodeCuePointFilter;

util.inherits(VidiunCodeCuePointFilter, VidiunCodeCuePointBaseFilter);


/**
 */
function VidiunConfigurableDistributionProfileFilter(){
  VidiunConfigurableDistributionProfileFilter.super_.call(this);
};
module.exports.VidiunConfigurableDistributionProfileFilter = VidiunConfigurableDistributionProfileFilter;

util.inherits(VidiunConfigurableDistributionProfileFilter, VidiunConfigurableDistributionProfileBaseFilter);


/**
 */
function VidiunDataEntryFilter(){
  VidiunDataEntryFilter.super_.call(this);
};
module.exports.VidiunDataEntryFilter = VidiunDataEntryFilter;

util.inherits(VidiunDataEntryFilter, VidiunDataEntryBaseFilter);


/**
 */
function VidiunDocumentEntryFilter(){
  VidiunDocumentEntryFilter.super_.call(this);
};
module.exports.VidiunDocumentEntryFilter = VidiunDocumentEntryFilter;

util.inherits(VidiunDocumentEntryFilter, VidiunDocumentEntryBaseFilter);


/**
 */
function VidiunEmailNotificationTemplateFilter(){
  VidiunEmailNotificationTemplateFilter.super_.call(this);
};
module.exports.VidiunEmailNotificationTemplateFilter = VidiunEmailNotificationTemplateFilter;

util.inherits(VidiunEmailNotificationTemplateFilter, VidiunEmailNotificationTemplateBaseFilter);


/**
 */
function VidiunFlavorAssetFilter(){
  VidiunFlavorAssetFilter.super_.call(this);
};
module.exports.VidiunFlavorAssetFilter = VidiunFlavorAssetFilter;

util.inherits(VidiunFlavorAssetFilter, VidiunFlavorAssetBaseFilter);


/**
 */
function VidiunFlavorParamsFilter(){
  VidiunFlavorParamsFilter.super_.call(this);
};
module.exports.VidiunFlavorParamsFilter = VidiunFlavorParamsFilter;

util.inherits(VidiunFlavorParamsFilter, VidiunFlavorParamsBaseFilter);


/**
 */
function VidiunGenericDistributionProfileFilter(){
  VidiunGenericDistributionProfileFilter.super_.call(this);
};
module.exports.VidiunGenericDistributionProfileFilter = VidiunGenericDistributionProfileFilter;

util.inherits(VidiunGenericDistributionProfileFilter, VidiunGenericDistributionProfileBaseFilter);


/**
 */
function VidiunGenericDistributionProviderFilter(){
  VidiunGenericDistributionProviderFilter.super_.call(this);
};
module.exports.VidiunGenericDistributionProviderFilter = VidiunGenericDistributionProviderFilter;

util.inherits(VidiunGenericDistributionProviderFilter, VidiunGenericDistributionProviderBaseFilter);


/**
 */
function VidiunGenericSyndicationFeedFilter(){
  VidiunGenericSyndicationFeedFilter.super_.call(this);
};
module.exports.VidiunGenericSyndicationFeedFilter = VidiunGenericSyndicationFeedFilter;

util.inherits(VidiunGenericSyndicationFeedFilter, VidiunGenericSyndicationFeedBaseFilter);


/**
 */
function VidiunGoogleVideoSyndicationFeedFilter(){
  VidiunGoogleVideoSyndicationFeedFilter.super_.call(this);
};
module.exports.VidiunGoogleVideoSyndicationFeedFilter = VidiunGoogleVideoSyndicationFeedFilter;

util.inherits(VidiunGoogleVideoSyndicationFeedFilter, VidiunGoogleVideoSyndicationFeedBaseFilter);


/**
 */
function VidiunHttpNotificationTemplateFilter(){
  VidiunHttpNotificationTemplateFilter.super_.call(this);
};
module.exports.VidiunHttpNotificationTemplateFilter = VidiunHttpNotificationTemplateFilter;

util.inherits(VidiunHttpNotificationTemplateFilter, VidiunHttpNotificationTemplateBaseFilter);


/**
 */
function VidiunITunesSyndicationFeedFilter(){
  VidiunITunesSyndicationFeedFilter.super_.call(this);
};
module.exports.VidiunITunesSyndicationFeedFilter = VidiunITunesSyndicationFeedFilter;

util.inherits(VidiunITunesSyndicationFeedFilter, VidiunITunesSyndicationFeedBaseFilter);


/**
 */
function VidiunKontikiStorageProfileFilter(){
  VidiunKontikiStorageProfileFilter.super_.call(this);
};
module.exports.VidiunKontikiStorageProfileFilter = VidiunKontikiStorageProfileFilter;

util.inherits(VidiunKontikiStorageProfileFilter, VidiunKontikiStorageProfileBaseFilter);


/**
 * @param  playlistId  string    Playlist id to be played
 *  	 .
 * @param  repeat  int    Indicates that the segments should be repeated for ever
 *  	 .
 */
function VidiunLiveChannel(){
  VidiunLiveChannel.super_.call(this);
  this.playlistId = null;
  this.repeat = null;
};
module.exports.VidiunLiveChannel = VidiunLiveChannel;

util.inherits(VidiunLiveChannel, VidiunLiveEntry);


/**
 * @param  streamRemoteId  string    The stream id as provided by the provider
 *  	  (readOnly).
 * @param  streamRemoteBackupId  string    The backup stream id as provided by the provider
 *  	  (readOnly).
 * @param  bitrates  array    Array of supported bitrates
 *  	 .
 * @param  primaryBroadcastingUrl  string    .
 * @param  secondaryBroadcastingUrl  string    .
 * @param  streamName  string    .
 * @param  streamUrl  string    The stream url
 *  	 .
 * @param  hlsStreamUrl  string    HLS URL - URL for live stream playback on mobile device
 *  	 .
 * @param  urlManager  string    URL Manager to handle the live stream URL (for instance, add token)
 *  	 .
 * @param  encodingIP1  string    The broadcast primary ip
 *  	 .
 * @param  encodingIP2  string    The broadcast secondary ip
 *  	 .
 * @param  streamPassword  string    The broadcast password
 *  	 .
 * @param  streamUsername  string    The broadcast username
 *  	  (readOnly).
 */
function VidiunLiveStreamEntry(){
  VidiunLiveStreamEntry.super_.call(this);
  this.streamRemoteId = null;
  this.streamRemoteBackupId = null;
  this.bitrates = null;
  this.primaryBroadcastingUrl = null;
  this.secondaryBroadcastingUrl = null;
  this.streamName = null;
  this.streamUrl = null;
  this.hlsStreamUrl = null;
  this.urlManager = null;
  this.encodingIP1 = null;
  this.encodingIP2 = null;
  this.streamPassword = null;
  this.streamUsername = null;
};
module.exports.VidiunLiveStreamEntry = VidiunLiveStreamEntry;

util.inherits(VidiunLiveStreamEntry, VidiunLiveEntry);


/**
 */
function VidiunPlaylistFilter(){
  VidiunPlaylistFilter.super_.call(this);
};
module.exports.VidiunPlaylistFilter = VidiunPlaylistFilter;

util.inherits(VidiunPlaylistFilter, VidiunPlaylistBaseFilter);


/**
 */
function VidiunRemoteDropFolderFilter(){
  VidiunRemoteDropFolderFilter.super_.call(this);
};
module.exports.VidiunRemoteDropFolderFilter = VidiunRemoteDropFolderFilter;

util.inherits(VidiunRemoteDropFolderFilter, VidiunRemoteDropFolderBaseFilter);


/**
 */
function VidiunSyndicationDistributionProfileFilter(){
  VidiunSyndicationDistributionProfileFilter.super_.call(this);
};
module.exports.VidiunSyndicationDistributionProfileFilter = VidiunSyndicationDistributionProfileFilter;

util.inherits(VidiunSyndicationDistributionProfileFilter, VidiunSyndicationDistributionProfileBaseFilter);


/**
 */
function VidiunSyndicationDistributionProviderFilter(){
  VidiunSyndicationDistributionProviderFilter.super_.call(this);
};
module.exports.VidiunSyndicationDistributionProviderFilter = VidiunSyndicationDistributionProviderFilter;

util.inherits(VidiunSyndicationDistributionProviderFilter, VidiunSyndicationDistributionProviderBaseFilter);


/**
 */
function VidiunThumbAssetFilter(){
  VidiunThumbAssetFilter.super_.call(this);
};
module.exports.VidiunThumbAssetFilter = VidiunThumbAssetFilter;

util.inherits(VidiunThumbAssetFilter, VidiunThumbAssetBaseFilter);


/**
 */
function VidiunThumbParamsFilter(){
  VidiunThumbParamsFilter.super_.call(this);
};
module.exports.VidiunThumbParamsFilter = VidiunThumbParamsFilter;

util.inherits(VidiunThumbParamsFilter, VidiunThumbParamsBaseFilter);


/**
 */
function VidiunTubeMogulSyndicationFeedFilter(){
  VidiunTubeMogulSyndicationFeedFilter.super_.call(this);
};
module.exports.VidiunTubeMogulSyndicationFeedFilter = VidiunTubeMogulSyndicationFeedFilter;

util.inherits(VidiunTubeMogulSyndicationFeedFilter, VidiunTubeMogulSyndicationFeedBaseFilter);


/**
 */
function VidiunUiConfAdminFilter(){
  VidiunUiConfAdminFilter.super_.call(this);
};
module.exports.VidiunUiConfAdminFilter = VidiunUiConfAdminFilter;

util.inherits(VidiunUiConfAdminFilter, VidiunUiConfAdminBaseFilter);


/**
 */
function VidiunWebexDropFolderFileFilter(){
  VidiunWebexDropFolderFileFilter.super_.call(this);
};
module.exports.VidiunWebexDropFolderFileFilter = VidiunWebexDropFolderFileFilter;

util.inherits(VidiunWebexDropFolderFileFilter, VidiunWebexDropFolderFileBaseFilter);


/**
 */
function VidiunWebexDropFolderFilter(){
  VidiunWebexDropFolderFilter.super_.call(this);
};
module.exports.VidiunWebexDropFolderFilter = VidiunWebexDropFolderFilter;

util.inherits(VidiunWebexDropFolderFilter, VidiunWebexDropFolderBaseFilter);


/**
 */
function VidiunWidevineProfileFilter(){
  VidiunWidevineProfileFilter.super_.call(this);
};
module.exports.VidiunWidevineProfileFilter = VidiunWidevineProfileFilter;

util.inherits(VidiunWidevineProfileFilter, VidiunWidevineProfileBaseFilter);


/**
 */
function VidiunYahooSyndicationFeedFilter(){
  VidiunYahooSyndicationFeedFilter.super_.call(this);
};
module.exports.VidiunYahooSyndicationFeedFilter = VidiunYahooSyndicationFeedFilter;

util.inherits(VidiunYahooSyndicationFeedFilter, VidiunYahooSyndicationFeedBaseFilter);


/**
 * @param  contentLike  string    .
 * @param  contentMultiLikeOr  string    .
 * @param  contentMultiLikeAnd  string    .
 * @param  partnerDescriptionLike  string    .
 * @param  partnerDescriptionMultiLikeOr  string    .
 * @param  partnerDescriptionMultiLikeAnd  string    .
 * @param  languageEqual  string    .
 * @param  languageIn  string    .
 * @param  labelEqual  string    .
 * @param  labelIn  string    .
 * @param  startTimeGreaterThanOrEqual  int    .
 * @param  startTimeLessThanOrEqual  int    .
 * @param  endTimeGreaterThanOrEqual  int    .
 * @param  endTimeLessThanOrEqual  int    .
 */
function VidiunCaptionAssetItemFilter(){
  VidiunCaptionAssetItemFilter.super_.call(this);
  this.contentLike = null;
  this.contentMultiLikeOr = null;
  this.contentMultiLikeAnd = null;
  this.partnerDescriptionLike = null;
  this.partnerDescriptionMultiLikeOr = null;
  this.partnerDescriptionMultiLikeAnd = null;
  this.languageEqual = null;
  this.languageIn = null;
  this.labelEqual = null;
  this.labelIn = null;
  this.startTimeGreaterThanOrEqual = null;
  this.startTimeLessThanOrEqual = null;
  this.endTimeGreaterThanOrEqual = null;
  this.endTimeLessThanOrEqual = null;
};
module.exports.VidiunCaptionAssetItemFilter = VidiunCaptionAssetItemFilter;

util.inherits(VidiunCaptionAssetItemFilter, VidiunCaptionAssetFilter);


/**
 */
function VidiunDocumentFlavorParamsBaseFilter(){
  VidiunDocumentFlavorParamsBaseFilter.super_.call(this);
};
module.exports.VidiunDocumentFlavorParamsBaseFilter = VidiunDocumentFlavorParamsBaseFilter;

util.inherits(VidiunDocumentFlavorParamsBaseFilter, VidiunFlavorParamsFilter);


/**
 * @param  flavorParamsIdEqual  int    .
 * @param  flavorParamsVersionEqual  string    .
 * @param  flavorAssetIdEqual  string    .
 * @param  flavorAssetVersionEqual  string    .
 */
function VidiunFlavorParamsOutputBaseFilter(){
  VidiunFlavorParamsOutputBaseFilter.super_.call(this);
  this.flavorParamsIdEqual = null;
  this.flavorParamsVersionEqual = null;
  this.flavorAssetIdEqual = null;
  this.flavorAssetVersionEqual = null;
};
module.exports.VidiunFlavorParamsOutputBaseFilter = VidiunFlavorParamsOutputBaseFilter;

util.inherits(VidiunFlavorParamsOutputBaseFilter, VidiunFlavorParamsFilter);


/**
 */
function VidiunFtpDropFolderBaseFilter(){
  VidiunFtpDropFolderBaseFilter.super_.call(this);
};
module.exports.VidiunFtpDropFolderBaseFilter = VidiunFtpDropFolderBaseFilter;

util.inherits(VidiunFtpDropFolderBaseFilter, VidiunRemoteDropFolderFilter);


/**
 */
function VidiunGenericXsltSyndicationFeedBaseFilter(){
  VidiunGenericXsltSyndicationFeedBaseFilter.super_.call(this);
};
module.exports.VidiunGenericXsltSyndicationFeedBaseFilter = VidiunGenericXsltSyndicationFeedBaseFilter;

util.inherits(VidiunGenericXsltSyndicationFeedBaseFilter, VidiunGenericSyndicationFeedFilter);


/**
 */
function VidiunImageFlavorParamsBaseFilter(){
  VidiunImageFlavorParamsBaseFilter.super_.call(this);
};
module.exports.VidiunImageFlavorParamsBaseFilter = VidiunImageFlavorParamsBaseFilter;

util.inherits(VidiunImageFlavorParamsBaseFilter, VidiunFlavorParamsFilter);


/**
 */
function VidiunLiveAssetBaseFilter(){
  VidiunLiveAssetBaseFilter.super_.call(this);
};
module.exports.VidiunLiveAssetBaseFilter = VidiunLiveAssetBaseFilter;

util.inherits(VidiunLiveAssetBaseFilter, VidiunFlavorAssetFilter);


/**
 */
function VidiunLiveParamsBaseFilter(){
  VidiunLiveParamsBaseFilter.super_.call(this);
};
module.exports.VidiunLiveParamsBaseFilter = VidiunLiveParamsBaseFilter;

util.inherits(VidiunLiveParamsBaseFilter, VidiunFlavorParamsFilter);


/**
 */
function VidiunLiveStreamAdminEntry(){
  VidiunLiveStreamAdminEntry.super_.call(this);
};
module.exports.VidiunLiveStreamAdminEntry = VidiunLiveStreamAdminEntry;

util.inherits(VidiunLiveStreamAdminEntry, VidiunLiveStreamEntry);


/**
 */
function VidiunMediaFlavorParamsBaseFilter(){
  VidiunMediaFlavorParamsBaseFilter.super_.call(this);
};
module.exports.VidiunMediaFlavorParamsBaseFilter = VidiunMediaFlavorParamsBaseFilter;

util.inherits(VidiunMediaFlavorParamsBaseFilter, VidiunFlavorParamsFilter);


/**
 */
function VidiunMixEntryBaseFilter(){
  VidiunMixEntryBaseFilter.super_.call(this);
};
module.exports.VidiunMixEntryBaseFilter = VidiunMixEntryBaseFilter;

util.inherits(VidiunMixEntryBaseFilter, VidiunPlayableEntryFilter);


/**
 */
function VidiunPdfFlavorParamsBaseFilter(){
  VidiunPdfFlavorParamsBaseFilter.super_.call(this);
};
module.exports.VidiunPdfFlavorParamsBaseFilter = VidiunPdfFlavorParamsBaseFilter;

util.inherits(VidiunPdfFlavorParamsBaseFilter, VidiunFlavorParamsFilter);


/**
 */
function VidiunSshDropFolderBaseFilter(){
  VidiunSshDropFolderBaseFilter.super_.call(this);
};
module.exports.VidiunSshDropFolderBaseFilter = VidiunSshDropFolderBaseFilter;

util.inherits(VidiunSshDropFolderBaseFilter, VidiunRemoteDropFolderFilter);


/**
 */
function VidiunSwfFlavorParamsBaseFilter(){
  VidiunSwfFlavorParamsBaseFilter.super_.call(this);
};
module.exports.VidiunSwfFlavorParamsBaseFilter = VidiunSwfFlavorParamsBaseFilter;

util.inherits(VidiunSwfFlavorParamsBaseFilter, VidiunFlavorParamsFilter);


/**
 * @param  thumbParamsIdEqual  int    .
 * @param  thumbParamsVersionEqual  string    .
 * @param  thumbAssetIdEqual  string    .
 * @param  thumbAssetVersionEqual  string    .
 */
function VidiunThumbParamsOutputBaseFilter(){
  VidiunThumbParamsOutputBaseFilter.super_.call(this);
  this.thumbParamsIdEqual = null;
  this.thumbParamsVersionEqual = null;
  this.thumbAssetIdEqual = null;
  this.thumbAssetVersionEqual = null;
};
module.exports.VidiunThumbParamsOutputBaseFilter = VidiunThumbParamsOutputBaseFilter;

util.inherits(VidiunThumbParamsOutputBaseFilter, VidiunThumbParamsFilter);


/**
 */
function VidiunWidevineFlavorAssetBaseFilter(){
  VidiunWidevineFlavorAssetBaseFilter.super_.call(this);
};
module.exports.VidiunWidevineFlavorAssetBaseFilter = VidiunWidevineFlavorAssetBaseFilter;

util.inherits(VidiunWidevineFlavorAssetBaseFilter, VidiunFlavorAssetFilter);


/**
 */
function VidiunWidevineFlavorParamsBaseFilter(){
  VidiunWidevineFlavorParamsBaseFilter.super_.call(this);
};
module.exports.VidiunWidevineFlavorParamsBaseFilter = VidiunWidevineFlavorParamsBaseFilter;

util.inherits(VidiunWidevineFlavorParamsBaseFilter, VidiunFlavorParamsFilter);


/**
 */
function VidiunDocumentFlavorParamsFilter(){
  VidiunDocumentFlavorParamsFilter.super_.call(this);
};
module.exports.VidiunDocumentFlavorParamsFilter = VidiunDocumentFlavorParamsFilter;

util.inherits(VidiunDocumentFlavorParamsFilter, VidiunDocumentFlavorParamsBaseFilter);


/**
 */
function VidiunFlavorParamsOutputFilter(){
  VidiunFlavorParamsOutputFilter.super_.call(this);
};
module.exports.VidiunFlavorParamsOutputFilter = VidiunFlavorParamsOutputFilter;

util.inherits(VidiunFlavorParamsOutputFilter, VidiunFlavorParamsOutputBaseFilter);


/**
 */
function VidiunFtpDropFolderFilter(){
  VidiunFtpDropFolderFilter.super_.call(this);
};
module.exports.VidiunFtpDropFolderFilter = VidiunFtpDropFolderFilter;

util.inherits(VidiunFtpDropFolderFilter, VidiunFtpDropFolderBaseFilter);


/**
 */
function VidiunGenericXsltSyndicationFeedFilter(){
  VidiunGenericXsltSyndicationFeedFilter.super_.call(this);
};
module.exports.VidiunGenericXsltSyndicationFeedFilter = VidiunGenericXsltSyndicationFeedFilter;

util.inherits(VidiunGenericXsltSyndicationFeedFilter, VidiunGenericXsltSyndicationFeedBaseFilter);


/**
 */
function VidiunImageFlavorParamsFilter(){
  VidiunImageFlavorParamsFilter.super_.call(this);
};
module.exports.VidiunImageFlavorParamsFilter = VidiunImageFlavorParamsFilter;

util.inherits(VidiunImageFlavorParamsFilter, VidiunImageFlavorParamsBaseFilter);


/**
 */
function VidiunLiveAssetFilter(){
  VidiunLiveAssetFilter.super_.call(this);
};
module.exports.VidiunLiveAssetFilter = VidiunLiveAssetFilter;

util.inherits(VidiunLiveAssetFilter, VidiunLiveAssetBaseFilter);


/**
 */
function VidiunLiveParamsFilter(){
  VidiunLiveParamsFilter.super_.call(this);
};
module.exports.VidiunLiveParamsFilter = VidiunLiveParamsFilter;

util.inherits(VidiunLiveParamsFilter, VidiunLiveParamsBaseFilter);


/**
 */
function VidiunMediaFlavorParamsFilter(){
  VidiunMediaFlavorParamsFilter.super_.call(this);
};
module.exports.VidiunMediaFlavorParamsFilter = VidiunMediaFlavorParamsFilter;

util.inherits(VidiunMediaFlavorParamsFilter, VidiunMediaFlavorParamsBaseFilter);


/**
 */
function VidiunMixEntryFilter(){
  VidiunMixEntryFilter.super_.call(this);
};
module.exports.VidiunMixEntryFilter = VidiunMixEntryFilter;

util.inherits(VidiunMixEntryFilter, VidiunMixEntryBaseFilter);


/**
 */
function VidiunPdfFlavorParamsFilter(){
  VidiunPdfFlavorParamsFilter.super_.call(this);
};
module.exports.VidiunPdfFlavorParamsFilter = VidiunPdfFlavorParamsFilter;

util.inherits(VidiunPdfFlavorParamsFilter, VidiunPdfFlavorParamsBaseFilter);


/**
 */
function VidiunSshDropFolderFilter(){
  VidiunSshDropFolderFilter.super_.call(this);
};
module.exports.VidiunSshDropFolderFilter = VidiunSshDropFolderFilter;

util.inherits(VidiunSshDropFolderFilter, VidiunSshDropFolderBaseFilter);


/**
 */
function VidiunSwfFlavorParamsFilter(){
  VidiunSwfFlavorParamsFilter.super_.call(this);
};
module.exports.VidiunSwfFlavorParamsFilter = VidiunSwfFlavorParamsFilter;

util.inherits(VidiunSwfFlavorParamsFilter, VidiunSwfFlavorParamsBaseFilter);


/**
 */
function VidiunThumbParamsOutputFilter(){
  VidiunThumbParamsOutputFilter.super_.call(this);
};
module.exports.VidiunThumbParamsOutputFilter = VidiunThumbParamsOutputFilter;

util.inherits(VidiunThumbParamsOutputFilter, VidiunThumbParamsOutputBaseFilter);


/**
 */
function VidiunWidevineFlavorAssetFilter(){
  VidiunWidevineFlavorAssetFilter.super_.call(this);
};
module.exports.VidiunWidevineFlavorAssetFilter = VidiunWidevineFlavorAssetFilter;

util.inherits(VidiunWidevineFlavorAssetFilter, VidiunWidevineFlavorAssetBaseFilter);


/**
 */
function VidiunWidevineFlavorParamsFilter(){
  VidiunWidevineFlavorParamsFilter.super_.call(this);
};
module.exports.VidiunWidevineFlavorParamsFilter = VidiunWidevineFlavorParamsFilter;

util.inherits(VidiunWidevineFlavorParamsFilter, VidiunWidevineFlavorParamsBaseFilter);


/**
 */
function VidiunDocumentFlavorParamsOutputBaseFilter(){
  VidiunDocumentFlavorParamsOutputBaseFilter.super_.call(this);
};
module.exports.VidiunDocumentFlavorParamsOutputBaseFilter = VidiunDocumentFlavorParamsOutputBaseFilter;

util.inherits(VidiunDocumentFlavorParamsOutputBaseFilter, VidiunFlavorParamsOutputFilter);


/**
 * @param  externalSourceTypeEqual  string    .
 * @param  externalSourceTypeIn  string    .
 * @param  assetParamsIdsMatchOr  string    .
 * @param  assetParamsIdsMatchAnd  string    .
 */
function VidiunExternalMediaEntryBaseFilter(){
  VidiunExternalMediaEntryBaseFilter.super_.call(this);
  this.externalSourceTypeEqual = null;
  this.externalSourceTypeIn = null;
  this.assetParamsIdsMatchOr = null;
  this.assetParamsIdsMatchAnd = null;
};
module.exports.VidiunExternalMediaEntryBaseFilter = VidiunExternalMediaEntryBaseFilter;

util.inherits(VidiunExternalMediaEntryBaseFilter, VidiunMediaEntryFilter);


/**
 */
function VidiunImageFlavorParamsOutputBaseFilter(){
  VidiunImageFlavorParamsOutputBaseFilter.super_.call(this);
};
module.exports.VidiunImageFlavorParamsOutputBaseFilter = VidiunImageFlavorParamsOutputBaseFilter;

util.inherits(VidiunImageFlavorParamsOutputBaseFilter, VidiunFlavorParamsOutputFilter);


/**
 */
function VidiunLiveEntryBaseFilter(){
  VidiunLiveEntryBaseFilter.super_.call(this);
};
module.exports.VidiunLiveEntryBaseFilter = VidiunLiveEntryBaseFilter;

util.inherits(VidiunLiveEntryBaseFilter, VidiunMediaEntryFilter);


/**
 */
function VidiunMediaFlavorParamsOutputBaseFilter(){
  VidiunMediaFlavorParamsOutputBaseFilter.super_.call(this);
};
module.exports.VidiunMediaFlavorParamsOutputBaseFilter = VidiunMediaFlavorParamsOutputBaseFilter;

util.inherits(VidiunMediaFlavorParamsOutputBaseFilter, VidiunFlavorParamsOutputFilter);


/**
 */
function VidiunPdfFlavorParamsOutputBaseFilter(){
  VidiunPdfFlavorParamsOutputBaseFilter.super_.call(this);
};
module.exports.VidiunPdfFlavorParamsOutputBaseFilter = VidiunPdfFlavorParamsOutputBaseFilter;

util.inherits(VidiunPdfFlavorParamsOutputBaseFilter, VidiunFlavorParamsOutputFilter);


/**
 */
function VidiunScpDropFolderBaseFilter(){
  VidiunScpDropFolderBaseFilter.super_.call(this);
};
module.exports.VidiunScpDropFolderBaseFilter = VidiunScpDropFolderBaseFilter;

util.inherits(VidiunScpDropFolderBaseFilter, VidiunSshDropFolderFilter);


/**
 */
function VidiunSftpDropFolderBaseFilter(){
  VidiunSftpDropFolderBaseFilter.super_.call(this);
};
module.exports.VidiunSftpDropFolderBaseFilter = VidiunSftpDropFolderBaseFilter;

util.inherits(VidiunSftpDropFolderBaseFilter, VidiunSshDropFolderFilter);


/**
 */
function VidiunSwfFlavorParamsOutputBaseFilter(){
  VidiunSwfFlavorParamsOutputBaseFilter.super_.call(this);
};
module.exports.VidiunSwfFlavorParamsOutputBaseFilter = VidiunSwfFlavorParamsOutputBaseFilter;

util.inherits(VidiunSwfFlavorParamsOutputBaseFilter, VidiunFlavorParamsOutputFilter);


/**
 */
function VidiunWidevineFlavorParamsOutputBaseFilter(){
  VidiunWidevineFlavorParamsOutputBaseFilter.super_.call(this);
};
module.exports.VidiunWidevineFlavorParamsOutputBaseFilter = VidiunWidevineFlavorParamsOutputBaseFilter;

util.inherits(VidiunWidevineFlavorParamsOutputBaseFilter, VidiunFlavorParamsOutputFilter);


/**
 */
function VidiunDocumentFlavorParamsOutputFilter(){
  VidiunDocumentFlavorParamsOutputFilter.super_.call(this);
};
module.exports.VidiunDocumentFlavorParamsOutputFilter = VidiunDocumentFlavorParamsOutputFilter;

util.inherits(VidiunDocumentFlavorParamsOutputFilter, VidiunDocumentFlavorParamsOutputBaseFilter);


/**
 */
function VidiunExternalMediaEntryFilter(){
  VidiunExternalMediaEntryFilter.super_.call(this);
};
module.exports.VidiunExternalMediaEntryFilter = VidiunExternalMediaEntryFilter;

util.inherits(VidiunExternalMediaEntryFilter, VidiunExternalMediaEntryBaseFilter);


/**
 */
function VidiunImageFlavorParamsOutputFilter(){
  VidiunImageFlavorParamsOutputFilter.super_.call(this);
};
module.exports.VidiunImageFlavorParamsOutputFilter = VidiunImageFlavorParamsOutputFilter;

util.inherits(VidiunImageFlavorParamsOutputFilter, VidiunImageFlavorParamsOutputBaseFilter);


/**
 * @param  isLive  int    .
 */
function VidiunLiveEntryFilter(){
  VidiunLiveEntryFilter.super_.call(this);
  this.isLive = null;
};
module.exports.VidiunLiveEntryFilter = VidiunLiveEntryFilter;

util.inherits(VidiunLiveEntryFilter, VidiunLiveEntryBaseFilter);


/**
 */
function VidiunMediaFlavorParamsOutputFilter(){
  VidiunMediaFlavorParamsOutputFilter.super_.call(this);
};
module.exports.VidiunMediaFlavorParamsOutputFilter = VidiunMediaFlavorParamsOutputFilter;

util.inherits(VidiunMediaFlavorParamsOutputFilter, VidiunMediaFlavorParamsOutputBaseFilter);


/**
 */
function VidiunPdfFlavorParamsOutputFilter(){
  VidiunPdfFlavorParamsOutputFilter.super_.call(this);
};
module.exports.VidiunPdfFlavorParamsOutputFilter = VidiunPdfFlavorParamsOutputFilter;

util.inherits(VidiunPdfFlavorParamsOutputFilter, VidiunPdfFlavorParamsOutputBaseFilter);


/**
 */
function VidiunScpDropFolderFilter(){
  VidiunScpDropFolderFilter.super_.call(this);
};
module.exports.VidiunScpDropFolderFilter = VidiunScpDropFolderFilter;

util.inherits(VidiunScpDropFolderFilter, VidiunScpDropFolderBaseFilter);


/**
 */
function VidiunSftpDropFolderFilter(){
  VidiunSftpDropFolderFilter.super_.call(this);
};
module.exports.VidiunSftpDropFolderFilter = VidiunSftpDropFolderFilter;

util.inherits(VidiunSftpDropFolderFilter, VidiunSftpDropFolderBaseFilter);


/**
 */
function VidiunSwfFlavorParamsOutputFilter(){
  VidiunSwfFlavorParamsOutputFilter.super_.call(this);
};
module.exports.VidiunSwfFlavorParamsOutputFilter = VidiunSwfFlavorParamsOutputFilter;

util.inherits(VidiunSwfFlavorParamsOutputFilter, VidiunSwfFlavorParamsOutputBaseFilter);


/**
 */
function VidiunWidevineFlavorParamsOutputFilter(){
  VidiunWidevineFlavorParamsOutputFilter.super_.call(this);
};
module.exports.VidiunWidevineFlavorParamsOutputFilter = VidiunWidevineFlavorParamsOutputFilter;

util.inherits(VidiunWidevineFlavorParamsOutputFilter, VidiunWidevineFlavorParamsOutputBaseFilter);


/**
 */
function VidiunLiveChannelBaseFilter(){
  VidiunLiveChannelBaseFilter.super_.call(this);
};
module.exports.VidiunLiveChannelBaseFilter = VidiunLiveChannelBaseFilter;

util.inherits(VidiunLiveChannelBaseFilter, VidiunLiveEntryFilter);


/**
 */
function VidiunLiveStreamEntryBaseFilter(){
  VidiunLiveStreamEntryBaseFilter.super_.call(this);
};
module.exports.VidiunLiveStreamEntryBaseFilter = VidiunLiveStreamEntryBaseFilter;

util.inherits(VidiunLiveStreamEntryBaseFilter, VidiunLiveEntryFilter);


/**
 */
function VidiunLiveChannelFilter(){
  VidiunLiveChannelFilter.super_.call(this);
};
module.exports.VidiunLiveChannelFilter = VidiunLiveChannelFilter;

util.inherits(VidiunLiveChannelFilter, VidiunLiveChannelBaseFilter);


/**
 */
function VidiunLiveStreamEntryFilter(){
  VidiunLiveStreamEntryFilter.super_.call(this);
};
module.exports.VidiunLiveStreamEntryFilter = VidiunLiveStreamEntryFilter;

util.inherits(VidiunLiveStreamEntryFilter, VidiunLiveStreamEntryBaseFilter);


/**
 */
function VidiunLiveStreamAdminEntryBaseFilter(){
  VidiunLiveStreamAdminEntryBaseFilter.super_.call(this);
};
module.exports.VidiunLiveStreamAdminEntryBaseFilter = VidiunLiveStreamAdminEntryBaseFilter;

util.inherits(VidiunLiveStreamAdminEntryBaseFilter, VidiunLiveStreamEntryFilter);


/**
 */
function VidiunLiveStreamAdminEntryFilter(){
  VidiunLiveStreamAdminEntryFilter.super_.call(this);
};
module.exports.VidiunLiveStreamAdminEntryFilter = VidiunLiveStreamAdminEntryFilter;

util.inherits(VidiunLiveStreamAdminEntryFilter, VidiunLiveStreamAdminEntryBaseFilter);


