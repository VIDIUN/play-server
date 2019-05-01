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

var VidiunAppearInListType = module.exports.VidiunAppearInListType = {
PARTNER_ONLY : 1,
CATEGORY_MEMBERS_ONLY : 3,
};

var VidiunAssetParamsOrigin = module.exports.VidiunAssetParamsOrigin = {
CONVERT : 0,
INGEST : 1,
CONVERT_WHEN_MISSING : 2,
};

var VidiunAssetStatus = module.exports.VidiunAssetStatus = {
ERROR : -1,
QUEUED : 0,
READY : 2,
DELETED : 3,
IMPORTING : 7,
EXPORTING : 9,
};

var VidiunAttachmentAssetStatus = module.exports.VidiunAttachmentAssetStatus = {
ERROR : -1,
QUEUED : 0,
READY : 2,
DELETED : 3,
IMPORTING : 7,
EXPORTING : 9,
};

var VidiunAuditTrailContext = module.exports.VidiunAuditTrailContext = {
CLIENT : -1,
SCRIPT : 0,
PS2 : 1,
API_V3 : 2,
};

var VidiunAuditTrailStatus = module.exports.VidiunAuditTrailStatus = {
PENDING : 1,
READY : 2,
FAILED : 3,
};

var VidiunBatchJobErrorTypes = module.exports.VidiunBatchJobErrorTypes = {
APP : 0,
RUNTIME : 1,
HTTP : 2,
CURL : 3,
VIDIUN_API : 4,
VIDIUN_CLIENT : 5,
};

var VidiunBatchJobStatus = module.exports.VidiunBatchJobStatus = {
PENDING : 0,
QUEUED : 1,
PROCESSING : 2,
PROCESSED : 3,
MOVEFILE : 4,
FINISHED : 5,
FAILED : 6,
ABORTED : 7,
ALMOST_DONE : 8,
RETRY : 9,
FATAL : 10,
DONT_PROCESS : 11,
FINISHED_PARTIALLY : 12,
};

var VidiunCaptionAssetStatus = module.exports.VidiunCaptionAssetStatus = {
ERROR : -1,
QUEUED : 0,
READY : 2,
DELETED : 3,
IMPORTING : 7,
EXPORTING : 9,
};

var VidiunCategoryEntryStatus = module.exports.VidiunCategoryEntryStatus = {
PENDING : 1,
ACTIVE : 2,
DELETED : 3,
REJECTED : 4,
};

var VidiunCategoryStatus = module.exports.VidiunCategoryStatus = {
UPDATING : 1,
ACTIVE : 2,
DELETED : 3,
PURGED : 4,
};

var VidiunCategoryUserPermissionLevel = module.exports.VidiunCategoryUserPermissionLevel = {
MANAGER : 0,
MODERATOR : 1,
CONTRIBUTOR : 2,
MEMBER : 3,
NONE : 4,
};

var VidiunCategoryUserStatus = module.exports.VidiunCategoryUserStatus = {
ACTIVE : 1,
PENDING : 2,
NOT_ACTIVE : 3,
DELETED : 4,
};

var VidiunContributionPolicyType = module.exports.VidiunContributionPolicyType = {
ALL : 1,
MEMBERS_WITH_CONTRIBUTION_PERMISSION : 2,
};

var VidiunControlPanelCommandStatus = module.exports.VidiunControlPanelCommandStatus = {
PENDING : 1,
HANDLED : 2,
DONE : 3,
FAILED : 4,
};

var VidiunControlPanelCommandTargetType = module.exports.VidiunControlPanelCommandTargetType = {
DATA_CENTER : 1,
SCHEDULER : 2,
JOB_TYPE : 3,
JOB : 4,
BATCH : 5,
};

var VidiunControlPanelCommandType = module.exports.VidiunControlPanelCommandType = {
KILL : 4,
};

var VidiunCuePointStatus = module.exports.VidiunCuePointStatus = {
READY : 1,
DELETED : 2,
HANDLED : 3,
};

var VidiunDVRStatus = module.exports.VidiunDVRStatus = {
DISABLED : 0,
ENABLED : 1,
};

var VidiunDistributionAction = module.exports.VidiunDistributionAction = {
SUBMIT : 1,
UPDATE : 2,
DELETE : 3,
FETCH_REPORT : 4,
};

var VidiunDistributionProfileStatus = module.exports.VidiunDistributionProfileStatus = {
DISABLED : 1,
ENABLED : 2,
DELETED : 3,
};

var VidiunDocumentType = module.exports.VidiunDocumentType = {
DOCUMENT : 11,
SWF : 12,
PDF : 13,
};

var VidiunDrmPolicyStatus = module.exports.VidiunDrmPolicyStatus = {
ACTIVE : 1,
DELETED : 2,
};

var VidiunDrmProfileStatus = module.exports.VidiunDrmProfileStatus = {
ACTIVE : 1,
DELETED : 2,
};

var VidiunDropFolderFileStatus = module.exports.VidiunDropFolderFileStatus = {
UPLOADING : 1,
PENDING : 2,
WAITING : 3,
HANDLED : 4,
IGNORE : 5,
DELETED : 6,
PURGED : 7,
NO_MATCH : 8,
ERROR_HANDLING : 9,
ERROR_DELETING : 10,
DOWNLOADING : 11,
ERROR_DOWNLOADING : 12,
PROCESSING : 13,
PARSED : 14,
DETECTED : 15,
};

var VidiunDropFolderStatus = module.exports.VidiunDropFolderStatus = {
DISABLED : 0,
ENABLED : 1,
DELETED : 2,
ERROR : 3,
};

var VidiunEditorType = module.exports.VidiunEditorType = {
SIMPLE : 1,
ADVANCED : 2,
};

var VidiunEntryDistributionFlag = module.exports.VidiunEntryDistributionFlag = {
NONE : 0,
SUBMIT_REQUIRED : 1,
DELETE_REQUIRED : 2,
UPDATE_REQUIRED : 3,
ENABLE_REQUIRED : 4,
DISABLE_REQUIRED : 5,
};

var VidiunEntryDistributionStatus = module.exports.VidiunEntryDistributionStatus = {
PENDING : 0,
QUEUED : 1,
READY : 2,
DELETED : 3,
SUBMITTING : 4,
UPDATING : 5,
DELETING : 6,
ERROR_SUBMITTING : 7,
ERROR_UPDATING : 8,
ERROR_DELETING : 9,
REMOVED : 10,
IMPORT_SUBMITTING : 11,
IMPORT_UPDATING : 12,
};

var VidiunEntryDistributionSunStatus = module.exports.VidiunEntryDistributionSunStatus = {
BEFORE_SUNRISE : 1,
AFTER_SUNRISE : 2,
AFTER_SUNSET : 3,
};

var VidiunEntryModerationStatus = module.exports.VidiunEntryModerationStatus = {
PENDING_MODERATION : 1,
APPROVED : 2,
REJECTED : 3,
FLAGGED_FOR_REVIEW : 5,
AUTO_APPROVED : 6,
};

var VidiunEventNotificationTemplateStatus = module.exports.VidiunEventNotificationTemplateStatus = {
DISABLED : 1,
ACTIVE : 2,
DELETED : 3,
};

var VidiunFileSyncStatus = module.exports.VidiunFileSyncStatus = {
ERROR : -1,
PENDING : 1,
READY : 2,
DELETED : 3,
PURGED : 4,
};

var VidiunFileSyncType = module.exports.VidiunFileSyncType = {
FILE : 1,
LINK : 2,
URL : 3,
};

var VidiunFlavorAssetStatus = module.exports.VidiunFlavorAssetStatus = {
ERROR : -1,
QUEUED : 0,
CONVERTING : 1,
READY : 2,
DELETED : 3,
NOT_APPLICABLE : 4,
TEMP : 5,
WAIT_FOR_CONVERT : 6,
IMPORTING : 7,
VALIDATING : 8,
EXPORTING : 9,
};

var VidiunFlavorReadyBehaviorType = module.exports.VidiunFlavorReadyBehaviorType = {
NO_IMPACT : 0,
INHERIT_FLAVOR_PARAMS : 0,
REQUIRED : 1,
OPTIONAL : 2,
};

var VidiunGenericDistributionProviderStatus = module.exports.VidiunGenericDistributionProviderStatus = {
ACTIVE : 2,
DELETED : 3,
};

var VidiunInheritanceType = module.exports.VidiunInheritanceType = {
INHERIT : 1,
MANUAL : 2,
};

var VidiunLicenseType = module.exports.VidiunLicenseType = {
UNKNOWN : -1,
NONE : 0,
COPYRIGHTED : 1,
PUBLIC_DOMAIN : 2,
CREATIVECOMMONS_ATTRIBUTION : 3,
CREATIVECOMMONS_ATTRIBUTION_SHARE_ALIKE : 4,
CREATIVECOMMONS_ATTRIBUTION_NO_DERIVATIVES : 5,
CREATIVECOMMONS_ATTRIBUTION_NON_COMMERCIAL : 6,
CREATIVECOMMONS_ATTRIBUTION_NON_COMMERCIAL_SHARE_ALIKE : 7,
CREATIVECOMMONS_ATTRIBUTION_NON_COMMERCIAL_NO_DERIVATIVES : 8,
GFDL : 9,
GPL : 10,
AFFERO_GPL : 11,
LGPL : 12,
BSD : 13,
APACHE : 14,
MOZILLA : 15,
};

var VidiunLivePublishStatus = module.exports.VidiunLivePublishStatus = {
DISABLED : 0,
ENABLED : 1,
};

var VidiunMediaType = module.exports.VidiunMediaType = {
VIDEO : 1,
IMAGE : 2,
AUDIO : 5,
LIVE_STREAM_FLASH : 201,
LIVE_STREAM_WINDOWS_MEDIA : 202,
LIVE_STREAM_REAL_MEDIA : 203,
LIVE_STREAM_QUICKTIME : 204,
};

var VidiunMetadataProfileCreateMode = module.exports.VidiunMetadataProfileCreateMode = {
API : 1,
VMC : 2,
APP : 3,
};

var VidiunMetadataProfileStatus = module.exports.VidiunMetadataProfileStatus = {
ACTIVE : 1,
DEPRECATED : 2,
TRANSFORMING : 3,
};

var VidiunMetadataStatus = module.exports.VidiunMetadataStatus = {
VALID : 1,
INVALID : 2,
DELETED : 3,
};

var VidiunNullableBoolean = module.exports.VidiunNullableBoolean = {
NULL_VALUE : -1,
FALSE_VALUE : 0,
TRUE_VALUE : 1,
};

var VidiunPartnerGroupType = module.exports.VidiunPartnerGroupType = {
PUBLISHER : 1,
VAR_GROUP : 2,
GROUP : 3,
TEMPLATE : 4,
};

var VidiunPartnerStatus = module.exports.VidiunPartnerStatus = {
DELETED : 0,
ACTIVE : 1,
BLOCKED : 2,
FULL_BLOCK : 3,
};

var VidiunPermissionStatus = module.exports.VidiunPermissionStatus = {
ACTIVE : 1,
BLOCKED : 2,
DELETED : 3,
};

var VidiunPermissionType = module.exports.VidiunPermissionType = {
NORMAL : 1,
SPECIAL_FEATURE : 2,
PLUGIN : 3,
PARTNER_GROUP : 4,
};

var VidiunPlaylistType = module.exports.VidiunPlaylistType = {
STATIC_LIST : 3,
DYNAMIC : 10,
EXTERNAL : 101,
};

var VidiunPrivacyType = module.exports.VidiunPrivacyType = {
ALL : 1,
AUTHENTICATED_USERS : 2,
MEMBERS_ONLY : 3,
};

var VidiunRecordStatus = module.exports.VidiunRecordStatus = {
DISABLED : 0,
ENABLED : 1,
};

var VidiunSearchOperatorType = module.exports.VidiunSearchOperatorType = {
SEARCH_AND : 1,
SEARCH_OR : 2,
};

var VidiunSearchProviderType = module.exports.VidiunSearchProviderType = {
FLICKR : 3,
YOUTUBE : 4,
MYSPACE : 7,
PHOTOBUCKET : 8,
JAMENDO : 9,
CCMIXTER : 10,
NYPL : 11,
CURRENT : 12,
MEDIA_COMMONS : 13,
VIDIUN : 20,
VIDIUN_USER_CLIPS : 21,
ARCHIVE_ORG : 22,
VIDIUN_PARTNER : 23,
METACAFE : 24,
SEARCH_PROXY : 28,
PARTNER_SPECIFIC : 100,
};

var VidiunSessionType = module.exports.VidiunSessionType = {
USER : 0,
ADMIN : 2,
};

var VidiunShortLinkStatus = module.exports.VidiunShortLinkStatus = {
DISABLED : 1,
ENABLED : 2,
DELETED : 3,
};

var VidiunStorageProfileStatus = module.exports.VidiunStorageProfileStatus = {
DISABLED : 1,
AUTOMATIC : 2,
MANUAL : 3,
};

var VidiunThumbAssetStatus = module.exports.VidiunThumbAssetStatus = {
ERROR : -1,
QUEUED : 0,
CAPTURING : 1,
READY : 2,
DELETED : 3,
IMPORTING : 7,
EXPORTING : 9,
};

var VidiunUiConfCreationMode = module.exports.VidiunUiConfCreationMode = {
WIZARD : 2,
ADVANCED : 3,
};

var VidiunUiConfObjType = module.exports.VidiunUiConfObjType = {
PLAYER : 1,
CONTRIBUTION_WIZARD : 2,
SIMPLE_EDITOR : 3,
ADVANCED_EDITOR : 4,
PLAYLIST : 5,
APP_STUDIO : 6,
VRECORD : 7,
PLAYER_V3 : 8,
VMC_ACCOUNT : 9,
VMC_ANALYTICS : 10,
VMC_CONTENT : 11,
VMC_DASHBOARD : 12,
VMC_LOGIN : 13,
PLAYER_SL : 14,
CLIENTSIDE_ENCODER : 15,
VMC_GENERAL : 16,
VMC_ROLES_AND_PERMISSIONS : 17,
CLIPPER : 18,
VSR : 19,
VUPLOAD : 20,
};

var VidiunUpdateMethodType = module.exports.VidiunUpdateMethodType = {
MANUAL : 0,
AUTOMATIC : 1,
};

var VidiunUploadTokenStatus = module.exports.VidiunUploadTokenStatus = {
PENDING : 0,
PARTIAL_UPLOAD : 1,
FULL_UPLOAD : 2,
CLOSED : 3,
TIMED_OUT : 4,
DELETED : 5,
};

var VidiunUserRoleStatus = module.exports.VidiunUserRoleStatus = {
ACTIVE : 1,
BLOCKED : 2,
DELETED : 3,
};

var VidiunUserStatus = module.exports.VidiunUserStatus = {
BLOCKED : 0,
ACTIVE : 1,
DELETED : 2,
};

var VidiunVirusScanProfileStatus = module.exports.VidiunVirusScanProfileStatus = {
DISABLED : 1,
ENABLED : 2,
DELETED : 3,
};

var VidiunAccessControlOrderBy = module.exports.VidiunAccessControlOrderBy = {
CREATED_AT_ASC : "+createdAt",
CREATED_AT_DESC : "-createdAt",
};

var VidiunAccessControlProfileOrderBy = module.exports.VidiunAccessControlProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunAdCuePointOrderBy = module.exports.VidiunAdCuePointOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_TIME_ASC : "+endTime",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
START_TIME_ASC : "+startTime",
TRIGGERED_AT_ASC : "+triggeredAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_TIME_DESC : "-endTime",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
START_TIME_DESC : "-startTime",
TRIGGERED_AT_DESC : "-triggeredAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunAdProtocolType = module.exports.VidiunAdProtocolType = {
CUSTOM : "0",
VAST : "1",
VAST_2_0 : "2",
VPAID : "3",
};

var VidiunAdType = module.exports.VidiunAdType = {
VIDEO : "1",
OVERLAY : "2",
};

var VidiunAdminUserOrderBy = module.exports.VidiunAdminUserOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
};

var VidiunAmazonS3StorageProfileOrderBy = module.exports.VidiunAmazonS3StorageProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunAnnotationOrderBy = module.exports.VidiunAnnotationOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_TIME_ASC : "+endTime",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
START_TIME_ASC : "+startTime",
TRIGGERED_AT_ASC : "+triggeredAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_TIME_DESC : "-endTime",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
START_TIME_DESC : "-startTime",
TRIGGERED_AT_DESC : "-triggeredAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunApiActionPermissionItemOrderBy = module.exports.VidiunApiActionPermissionItemOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunApiParameterPermissionItemOrderBy = module.exports.VidiunApiParameterPermissionItemOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunAssetOrderBy = module.exports.VidiunAssetOrderBy = {
CREATED_AT_ASC : "+createdAt",
DELETED_AT_ASC : "+deletedAt",
SIZE_ASC : "+size",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DELETED_AT_DESC : "-deletedAt",
SIZE_DESC : "-size",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunAssetParamsOrderBy = module.exports.VidiunAssetParamsOrderBy = {
};

var VidiunAssetParamsOutputOrderBy = module.exports.VidiunAssetParamsOutputOrderBy = {
};

var VidiunAttachmentAssetOrderBy = module.exports.VidiunAttachmentAssetOrderBy = {
CREATED_AT_ASC : "+createdAt",
DELETED_AT_ASC : "+deletedAt",
SIZE_ASC : "+size",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DELETED_AT_DESC : "-deletedAt",
SIZE_DESC : "-size",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunAttachmentType = module.exports.VidiunAttachmentType = {
TEXT : "1",
MEDIA : "2",
DOCUMENT : "3",
};

var VidiunAuditTrailAction = module.exports.VidiunAuditTrailAction = {
CHANGED : "CHANGED",
CONTENT_VIEWED : "CONTENT_VIEWED",
COPIED : "COPIED",
CREATED : "CREATED",
DELETED : "DELETED",
FILE_SYNC_CREATED : "FILE_SYNC_CREATED",
RELATION_ADDED : "RELATION_ADDED",
RELATION_REMOVED : "RELATION_REMOVED",
VIEWED : "VIEWED",
};

var VidiunAuditTrailObjectType = module.exports.VidiunAuditTrailObjectType = {
BATCH_JOB : "BatchJob",
EMAIL_INGESTION_PROFILE : "EmailIngestionProfile",
FILE_SYNC : "FileSync",
VSHOW_VUSER : "VshowVuser",
METADATA : "Metadata",
METADATA_PROFILE : "MetadataProfile",
PARTNER : "Partner",
PERMISSION : "Permission",
UPLOAD_TOKEN : "UploadToken",
USER_LOGIN_DATA : "UserLoginData",
USER_ROLE : "UserRole",
ACCESS_CONTROL : "accessControl",
CATEGORY : "category",
CONVERSION_PROFILE_2 : "conversionProfile2",
ENTRY : "entry",
FLAVOR_ASSET : "flavorAsset",
FLAVOR_PARAMS : "flavorParams",
FLAVOR_PARAMS_CONVERSION_PROFILE : "flavorParamsConversionProfile",
FLAVOR_PARAMS_OUTPUT : "flavorParamsOutput",
VSHOW : "vshow",
VUSER : "vuser",
MEDIA_INFO : "mediaInfo",
MODERATION : "moderation",
ROUGHCUT : "roughcutEntry",
SYNDICATION : "syndicationFeed",
THUMBNAIL_ASSET : "thumbAsset",
THUMBNAIL_PARAMS : "thumbParams",
THUMBNAIL_PARAMS_OUTPUT : "thumbParamsOutput",
UI_CONF : "uiConf",
WIDGET : "widget",
};

var VidiunAuditTrailOrderBy = module.exports.VidiunAuditTrailOrderBy = {
CREATED_AT_ASC : "+createdAt",
PARSED_AT_ASC : "+parsedAt",
CREATED_AT_DESC : "-createdAt",
PARSED_AT_DESC : "-parsedAt",
};

var VidiunBaseEntryOrderBy = module.exports.VidiunBaseEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
END_DATE_ASC : "+endDate",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
END_DATE_DESC : "-endDate",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
WEIGHT_DESC : "-weight",
};

var VidiunBaseSyndicationFeedOrderBy = module.exports.VidiunBaseSyndicationFeedOrderBy = {
CREATED_AT_ASC : "+createdAt",
NAME_ASC : "+name",
PLAYLIST_ID_ASC : "+playlistId",
TYPE_ASC : "+type",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
NAME_DESC : "-name",
PLAYLIST_ID_DESC : "-playlistId",
TYPE_DESC : "-type",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunBatchJobOrderBy = module.exports.VidiunBatchJobOrderBy = {
CREATED_AT_ASC : "+createdAt",
ESTIMATED_EFFORT_ASC : "+estimatedEffort",
EXECUTION_ATTEMPTS_ASC : "+executionAttempts",
FINISH_TIME_ASC : "+finishTime",
LOCK_VERSION_ASC : "+lockVersion",
PRIORITY_ASC : "+priority",
QUEUE_TIME_ASC : "+queueTime",
STATUS_ASC : "+status",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ESTIMATED_EFFORT_DESC : "-estimatedEffort",
EXECUTION_ATTEMPTS_DESC : "-executionAttempts",
FINISH_TIME_DESC : "-finishTime",
LOCK_VERSION_DESC : "-lockVersion",
PRIORITY_DESC : "-priority",
QUEUE_TIME_DESC : "-queueTime",
STATUS_DESC : "-status",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunBatchJobType = module.exports.VidiunBatchJobType = {
PARSE_CAPTION_ASSET : "captionSearch.parseCaptionAsset",
DISTRIBUTION_DELETE : "contentDistribution.DistributionDelete",
DISTRIBUTION_DISABLE : "contentDistribution.DistributionDisable",
DISTRIBUTION_ENABLE : "contentDistribution.DistributionEnable",
DISTRIBUTION_FETCH_REPORT : "contentDistribution.DistributionFetchReport",
DISTRIBUTION_SUBMIT : "contentDistribution.DistributionSubmit",
DISTRIBUTION_SYNC : "contentDistribution.DistributionSync",
DISTRIBUTION_UPDATE : "contentDistribution.DistributionUpdate",
CONVERT : "0",
DROP_FOLDER_CONTENT_PROCESSOR : "dropFolder.DropFolderContentProcessor",
DROP_FOLDER_WATCHER : "dropFolder.DropFolderWatcher",
EVENT_NOTIFICATION_HANDLER : "eventNotification.EventNotificationHandler",
INDEX_TAGS : "tagSearch.IndexTagsByPrivacyContext",
TAG_RESOLVE : "tagSearch.TagResolve",
VIRUS_SCAN : "virusScan.VirusScan",
WIDEVINE_REPOSITORY_SYNC : "widevine.WidevineRepositorySync",
IMPORT : "1",
DELETE : "2",
FLATTEN : "3",
BULKUPLOAD : "4",
DVDCREATOR : "5",
DOWNLOAD : "6",
OOCONVERT : "7",
CONVERT_PROFILE : "10",
POSTCONVERT : "11",
EXTRACT_MEDIA : "14",
MAIL : "15",
NOTIFICATION : "16",
CLEANUP : "17",
SCHEDULER_HELPER : "18",
BULKDOWNLOAD : "19",
DB_CLEANUP : "20",
PROVISION_PROVIDE : "21",
CONVERT_COLLECTION : "22",
STORAGE_EXPORT : "23",
PROVISION_DELETE : "24",
STORAGE_DELETE : "25",
EMAIL_INGESTION : "26",
METADATA_IMPORT : "27",
METADATA_TRANSFORM : "28",
FILESYNC_IMPORT : "29",
CAPTURE_THUMB : "30",
DELETE_FILE : "31",
INDEX : "32",
MOVE_CATEGORY_ENTRIES : "33",
COPY : "34",
CONCAT : "35",
CONVERT_LIVE_SEGMENT : "36",
COPY_PARTNER : "37",
VALIDATE_LIVE_MEDIA_SERVERS : "38",
SYNC_CATEGORY_PRIVACY_CONTEXT : "39",
};

var VidiunBulkUploadObjectType = module.exports.VidiunBulkUploadObjectType = {
ENTRY : "1",
CATEGORY : "2",
USER : "3",
CATEGORY_USER : "4",
CATEGORY_ENTRY : "5",
};

var VidiunBulkUploadOrderBy = module.exports.VidiunBulkUploadOrderBy = {
};

var VidiunCaptionAssetOrderBy = module.exports.VidiunCaptionAssetOrderBy = {
CREATED_AT_ASC : "+createdAt",
DELETED_AT_ASC : "+deletedAt",
SIZE_ASC : "+size",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DELETED_AT_DESC : "-deletedAt",
SIZE_DESC : "-size",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunCaptionParamsOrderBy = module.exports.VidiunCaptionParamsOrderBy = {
};

var VidiunCaptionType = module.exports.VidiunCaptionType = {
SRT : "1",
DFXP : "2",
WEBVTT : "3",
};

var VidiunCategoryEntryAdvancedOrderBy = module.exports.VidiunCategoryEntryAdvancedOrderBy = {
CREATED_AT_ASC : "+createdAt",
CREATED_AT_DESC : "-createdAt",
};

var VidiunCategoryEntryOrderBy = module.exports.VidiunCategoryEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
CREATED_AT_DESC : "-createdAt",
};

var VidiunCategoryOrderBy = module.exports.VidiunCategoryOrderBy = {
CREATED_AT_ASC : "+createdAt",
DEPTH_ASC : "+depth",
DIRECT_ENTRIES_COUNT_ASC : "+directEntriesCount",
DIRECT_SUB_CATEGORIES_COUNT_ASC : "+directSubCategoriesCount",
ENTRIES_COUNT_ASC : "+entriesCount",
FULL_NAME_ASC : "+fullName",
MEMBERS_COUNT_ASC : "+membersCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DEPTH_DESC : "-depth",
DIRECT_ENTRIES_COUNT_DESC : "-directEntriesCount",
DIRECT_SUB_CATEGORIES_COUNT_DESC : "-directSubCategoriesCount",
ENTRIES_COUNT_DESC : "-entriesCount",
FULL_NAME_DESC : "-fullName",
MEMBERS_COUNT_DESC : "-membersCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunCategoryUserOrderBy = module.exports.VidiunCategoryUserOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunCodeCuePointOrderBy = module.exports.VidiunCodeCuePointOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_TIME_ASC : "+endTime",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
START_TIME_ASC : "+startTime",
TRIGGERED_AT_ASC : "+triggeredAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_TIME_DESC : "-endTime",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
START_TIME_DESC : "-startTime",
TRIGGERED_AT_DESC : "-triggeredAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunConfigurableDistributionProfileOrderBy = module.exports.VidiunConfigurableDistributionProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunContainerFormat = module.exports.VidiunContainerFormat = {
_3GP : "3gp",
APPLEHTTP : "applehttp",
AVI : "avi",
BMP : "bmp",
COPY : "copy",
FLV : "flv",
HLS : "hls",
ISMV : "ismv",
JPG : "jpg",
MKV : "mkv",
MOV : "mov",
MP3 : "mp3",
MP4 : "mp4",
MPEG : "mpeg",
MPEGTS : "mpegts",
OGG : "ogg",
OGV : "ogv",
PDF : "pdf",
PNG : "png",
SWF : "swf",
WAV : "wav",
WEBM : "webm",
WMA : "wma",
WMV : "wmv",
WVM : "wvm",
};

var VidiunControlPanelCommandOrderBy = module.exports.VidiunControlPanelCommandOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunConversionProfileAssetParamsOrderBy = module.exports.VidiunConversionProfileAssetParamsOrderBy = {
};

var VidiunConversionProfileOrderBy = module.exports.VidiunConversionProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
CREATED_AT_DESC : "-createdAt",
};

var VidiunConversionProfileStatus = module.exports.VidiunConversionProfileStatus = {
DISABLED : "1",
ENABLED : "2",
DELETED : "3",
};

var VidiunConversionProfileType = module.exports.VidiunConversionProfileType = {
MEDIA : "1",
LIVE_STREAM : "2",
};

var VidiunCuePointOrderBy = module.exports.VidiunCuePointOrderBy = {
CREATED_AT_ASC : "+createdAt",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
START_TIME_ASC : "+startTime",
TRIGGERED_AT_ASC : "+triggeredAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
START_TIME_DESC : "-startTime",
TRIGGERED_AT_DESC : "-triggeredAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunCuePointType = module.exports.VidiunCuePointType = {
AD : "adCuePoint.Ad",
ANNOTATION : "annotation.Annotation",
CODE : "codeCuePoint.Code",
};

var VidiunDataEntryOrderBy = module.exports.VidiunDataEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
END_DATE_ASC : "+endDate",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
END_DATE_DESC : "-endDate",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
WEIGHT_DESC : "-weight",
};

var VidiunDistributionProfileOrderBy = module.exports.VidiunDistributionProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunDistributionProviderOrderBy = module.exports.VidiunDistributionProviderOrderBy = {
};

var VidiunDistributionProviderType = module.exports.VidiunDistributionProviderType = {
ATT_UVERSE : "attUverseDistribution.ATT_UVERSE",
AVN : "avnDistribution.AVN",
COMCAST_MRSS : "comcastMrssDistribution.COMCAST_MRSS",
CROSS_VIDIUN : "crossVidiunDistribution.CROSS_VIDIUN",
DAILYMOTION : "dailymotionDistribution.DAILYMOTION",
DOUBLECLICK : "doubleClickDistribution.DOUBLECLICK",
FREEWHEEL : "freewheelDistribution.FREEWHEEL",
FREEWHEEL_GENERIC : "freewheelGenericDistribution.FREEWHEEL_GENERIC",
FTP : "ftpDistribution.FTP",
FTP_SCHEDULED : "ftpDistribution.FTP_SCHEDULED",
HULU : "huluDistribution.HULU",
IDETIC : "ideticDistribution.IDETIC",
METRO_PCS : "metroPcsDistribution.METRO_PCS",
MSN : "msnDistribution.MSN",
NDN : "ndnDistribution.NDN",
PODCAST : "podcastDistribution.PODCAST",
QUICKPLAY : "quickPlayDistribution.QUICKPLAY",
SYNACOR_HBO : "synacorHboDistribution.SYNACOR_HBO",
TIME_WARNER : "timeWarnerDistribution.TIME_WARNER",
TVCOM : "tvComDistribution.TVCOM",
UVERSE_CLICK_TO_ORDER : "uverseClickToOrderDistribution.UVERSE_CLICK_TO_ORDER",
UVERSE : "uverseDistribution.UVERSE",
VERIZON_VCAST : "verizonVcastDistribution.VERIZON_VCAST",
YAHOO : "yahooDistribution.YAHOO",
YOUTUBE : "youTubeDistribution.YOUTUBE",
YOUTUBE_API : "youtubeApiDistribution.YOUTUBE_API",
GENERIC : "1",
SYNDICATION : "2",
};

var VidiunDocumentEntryOrderBy = module.exports.VidiunDocumentEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
END_DATE_ASC : "+endDate",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
END_DATE_DESC : "-endDate",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
WEIGHT_DESC : "-weight",
};

var VidiunDocumentFlavorParamsOrderBy = module.exports.VidiunDocumentFlavorParamsOrderBy = {
};

var VidiunDocumentFlavorParamsOutputOrderBy = module.exports.VidiunDocumentFlavorParamsOutputOrderBy = {
};

var VidiunDrmDeviceOrderBy = module.exports.VidiunDrmDeviceOrderBy = {
CREATED_AT_ASC : "+createdAt",
CREATED_AT_DESC : "-createdAt",
};

var VidiunDrmLicenseScenario = module.exports.VidiunDrmLicenseScenario = {
};

var VidiunDrmPolicyOrderBy = module.exports.VidiunDrmPolicyOrderBy = {
};

var VidiunDrmProfileOrderBy = module.exports.VidiunDrmProfileOrderBy = {
ID_ASC : "+id",
NAME_ASC : "+name",
ID_DESC : "-id",
NAME_DESC : "-name",
};

var VidiunDrmProviderType = module.exports.VidiunDrmProviderType = {
WIDEVINE : "widevine.WIDEVINE",
};

var VidiunDropFolderErrorCode = module.exports.VidiunDropFolderErrorCode = {
ERROR_CONNECT : "1",
ERROR_AUTENTICATE : "2",
ERROR_GET_PHISICAL_FILE_LIST : "3",
ERROR_GET_DB_FILE_LIST : "4",
DROP_FOLDER_APP_ERROR : "5",
CONTENT_MATCH_POLICY_UNDEFINED : "6",
};

var VidiunDropFolderFileErrorCode = module.exports.VidiunDropFolderFileErrorCode = {
ERROR_ADDING_BULK_UPLOAD : "dropFolderXmlBulkUpload.ERROR_ADDING_BULK_UPLOAD",
ERROR_ADD_CONTENT_RESOURCE : "dropFolderXmlBulkUpload.ERROR_ADD_CONTENT_RESOURCE",
ERROR_IN_BULK_UPLOAD : "dropFolderXmlBulkUpload.ERROR_IN_BULK_UPLOAD",
ERROR_WRITING_TEMP_FILE : "dropFolderXmlBulkUpload.ERROR_WRITING_TEMP_FILE",
LOCAL_FILE_WRONG_CHECKSUM : "dropFolderXmlBulkUpload.LOCAL_FILE_WRONG_CHECKSUM",
LOCAL_FILE_WRONG_SIZE : "dropFolderXmlBulkUpload.LOCAL_FILE_WRONG_SIZE",
MALFORMED_XML_FILE : "dropFolderXmlBulkUpload.MALFORMED_XML_FILE",
XML_FILE_SIZE_EXCEED_LIMIT : "dropFolderXmlBulkUpload.XML_FILE_SIZE_EXCEED_LIMIT",
ERROR_UPDATE_ENTRY : "1",
ERROR_ADD_ENTRY : "2",
FLAVOR_NOT_FOUND : "3",
FLAVOR_MISSING_IN_FILE_NAME : "4",
SLUG_REGEX_NO_MATCH : "5",
ERROR_READING_FILE : "6",
ERROR_DOWNLOADING_FILE : "7",
ERROR_UPDATE_FILE : "8",
ERROR_ADDING_CONTENT_PROCESSOR : "10",
ERROR_IN_CONTENT_PROCESSOR : "11",
ERROR_DELETING_FILE : "12",
FILE_NO_MATCH : "13",
};

var VidiunDropFolderFileHandlerType = module.exports.VidiunDropFolderFileHandlerType = {
XML : "dropFolderXmlBulkUpload.XML",
CONTENT : "1",
};

var VidiunDropFolderFileOrderBy = module.exports.VidiunDropFolderFileOrderBy = {
CREATED_AT_ASC : "+createdAt",
FILE_NAME_ASC : "+fileName",
FILE_SIZE_ASC : "+fileSize",
FILE_SIZE_LAST_SET_AT_ASC : "+fileSizeLastSetAt",
ID_ASC : "+id",
PARSED_FLAVOR_ASC : "+parsedFlavor",
PARSED_SLUG_ASC : "+parsedSlug",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
FILE_NAME_DESC : "-fileName",
FILE_SIZE_DESC : "-fileSize",
FILE_SIZE_LAST_SET_AT_DESC : "-fileSizeLastSetAt",
ID_DESC : "-id",
PARSED_FLAVOR_DESC : "-parsedFlavor",
PARSED_SLUG_DESC : "-parsedSlug",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunDropFolderOrderBy = module.exports.VidiunDropFolderOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunDropFolderType = module.exports.VidiunDropFolderType = {
WEBEX : "WebexDropFolder.WEBEX",
LOCAL : "1",
FTP : "2",
SCP : "3",
SFTP : "4",
S3 : "6",
};

var VidiunDurationType = module.exports.VidiunDurationType = {
LONG : "long",
MEDIUM : "medium",
NOT_AVAILABLE : "notavailable",
SHORT : "short",
};

var VidiunDynamicEnum = module.exports.VidiunDynamicEnum = {
};

var VidiunEmailNotificationTemplateOrderBy = module.exports.VidiunEmailNotificationTemplateOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunEntryAttendeeOrderBy = module.exports.VidiunEntryAttendeeOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunEntryAttendeeStatus = module.exports.VidiunEntryAttendeeStatus = {
PENDING : "1",
DELETED : "3",
};

var VidiunEntryDistributionOrderBy = module.exports.VidiunEntryDistributionOrderBy = {
CREATED_AT_ASC : "+createdAt",
SUBMITTED_AT_ASC : "+submittedAt",
SUNRISE_ASC : "+sunrise",
SUNSET_ASC : "+sunset",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
SUBMITTED_AT_DESC : "-submittedAt",
SUNRISE_DESC : "-sunrise",
SUNSET_DESC : "-sunset",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunEntryReplacementStatus = module.exports.VidiunEntryReplacementStatus = {
NONE : "0",
APPROVED_BUT_NOT_READY : "1",
READY_BUT_NOT_APPROVED : "2",
NOT_READY_AND_NOT_APPROVED : "3",
};

var VidiunEntryStatus = module.exports.VidiunEntryStatus = {
ERROR_IMPORTING : "-2",
ERROR_CONVERTING : "-1",
SCAN_FAILURE : "virusScan.ScanFailure",
IMPORT : "0",
INFECTED : "virusScan.Infected",
PRECONVERT : "1",
READY : "2",
DELETED : "3",
PENDING : "4",
MODERATE : "5",
BLOCKED : "6",
NO_CONTENT : "7",
};

var VidiunEntryType = module.exports.VidiunEntryType = {
AUTOMATIC : "-1",
EXTERNAL_MEDIA : "externalMedia.externalMedia",
MEDIA_CLIP : "1",
MIX : "2",
PLAYLIST : "5",
DATA : "6",
LIVE_STREAM : "7",
LIVE_CHANNEL : "8",
DOCUMENT : "10",
};

var VidiunEventNotificationTemplateOrderBy = module.exports.VidiunEventNotificationTemplateOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunEventNotificationTemplateType = module.exports.VidiunEventNotificationTemplateType = {
EMAIL : "emailNotification.Email",
HTTP : "httpNotification.Http",
};

var VidiunExternalMediaEntryOrderBy = module.exports.VidiunExternalMediaEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_DATE_ASC : "+endDate",
LAST_PLAYED_AT_ASC : "+lastPlayedAt",
MEDIA_TYPE_ASC : "+mediaType",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
PLAYS_ASC : "+plays",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
VIEWS_ASC : "+views",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_DATE_DESC : "-endDate",
LAST_PLAYED_AT_DESC : "-lastPlayedAt",
MEDIA_TYPE_DESC : "-mediaType",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
PLAYS_DESC : "-plays",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
VIEWS_DESC : "-views",
WEIGHT_DESC : "-weight",
};

var VidiunExternalMediaSourceType = module.exports.VidiunExternalMediaSourceType = {
INTERCALL : "InterCall",
YOUTUBE : "YouTube",
};

var VidiunFileAssetObjectType = module.exports.VidiunFileAssetObjectType = {
UI_CONF : "2",
};

var VidiunFileAssetOrderBy = module.exports.VidiunFileAssetOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunFileAssetStatus = module.exports.VidiunFileAssetStatus = {
PENDING : "0",
UPLOADING : "1",
READY : "2",
DELETED : "3",
ERROR : "4",
};

var VidiunFileSyncObjectType = module.exports.VidiunFileSyncObjectType = {
DISTRIBUTION_PROFILE : "contentDistribution.DistributionProfile",
ENTRY_DISTRIBUTION : "contentDistribution.EntryDistribution",
GENERIC_DISTRIBUTION_ACTION : "contentDistribution.GenericDistributionAction",
EMAIL_NOTIFICATION_TEMPLATE : "emailNotification.EmailNotificationTemplate",
HTTP_NOTIFICATION_TEMPLATE : "httpNotification.HttpNotificationTemplate",
ENTRY : "1",
UICONF : "2",
BATCHJOB : "3",
ASSET : "4",
FLAVOR_ASSET : "4",
METADATA : "5",
METADATA_PROFILE : "6",
SYNDICATION_FEED : "7",
CONVERSION_PROFILE : "8",
FILE_ASSET : "9",
};

var VidiunFileSyncOrderBy = module.exports.VidiunFileSyncOrderBy = {
CREATED_AT_ASC : "+createdAt",
FILE_SIZE_ASC : "+fileSize",
READY_AT_ASC : "+readyAt",
SYNC_TIME_ASC : "+syncTime",
UPDATED_AT_ASC : "+updatedAt",
VERSION_ASC : "+version",
CREATED_AT_DESC : "-createdAt",
FILE_SIZE_DESC : "-fileSize",
READY_AT_DESC : "-readyAt",
SYNC_TIME_DESC : "-syncTime",
UPDATED_AT_DESC : "-updatedAt",
VERSION_DESC : "-version",
};

var VidiunFlavorAssetOrderBy = module.exports.VidiunFlavorAssetOrderBy = {
CREATED_AT_ASC : "+createdAt",
DELETED_AT_ASC : "+deletedAt",
SIZE_ASC : "+size",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DELETED_AT_DESC : "-deletedAt",
SIZE_DESC : "-size",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunFlavorParamsOrderBy = module.exports.VidiunFlavorParamsOrderBy = {
};

var VidiunFlavorParamsOutputOrderBy = module.exports.VidiunFlavorParamsOutputOrderBy = {
};

var VidiunFtpDropFolderOrderBy = module.exports.VidiunFtpDropFolderOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunGenericDistributionProfileOrderBy = module.exports.VidiunGenericDistributionProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunGenericDistributionProviderActionOrderBy = module.exports.VidiunGenericDistributionProviderActionOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunGenericDistributionProviderOrderBy = module.exports.VidiunGenericDistributionProviderOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunGenericSyndicationFeedOrderBy = module.exports.VidiunGenericSyndicationFeedOrderBy = {
CREATED_AT_ASC : "+createdAt",
NAME_ASC : "+name",
PLAYLIST_ID_ASC : "+playlistId",
TYPE_ASC : "+type",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
NAME_DESC : "-name",
PLAYLIST_ID_DESC : "-playlistId",
TYPE_DESC : "-type",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunGenericXsltSyndicationFeedOrderBy = module.exports.VidiunGenericXsltSyndicationFeedOrderBy = {
CREATED_AT_ASC : "+createdAt",
NAME_ASC : "+name",
PLAYLIST_ID_ASC : "+playlistId",
TYPE_ASC : "+type",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
NAME_DESC : "-name",
PLAYLIST_ID_DESC : "-playlistId",
TYPE_DESC : "-type",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunGoogleVideoSyndicationFeedOrderBy = module.exports.VidiunGoogleVideoSyndicationFeedOrderBy = {
CREATED_AT_ASC : "+createdAt",
NAME_ASC : "+name",
PLAYLIST_ID_ASC : "+playlistId",
TYPE_ASC : "+type",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
NAME_DESC : "-name",
PLAYLIST_ID_DESC : "-playlistId",
TYPE_DESC : "-type",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunHttpNotificationTemplateOrderBy = module.exports.VidiunHttpNotificationTemplateOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunITunesSyndicationFeedOrderBy = module.exports.VidiunITunesSyndicationFeedOrderBy = {
CREATED_AT_ASC : "+createdAt",
NAME_ASC : "+name",
PLAYLIST_ID_ASC : "+playlistId",
TYPE_ASC : "+type",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
NAME_DESC : "-name",
PLAYLIST_ID_DESC : "-playlistId",
TYPE_DESC : "-type",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunImageFlavorParamsOrderBy = module.exports.VidiunImageFlavorParamsOrderBy = {
};

var VidiunImageFlavorParamsOutputOrderBy = module.exports.VidiunImageFlavorParamsOutputOrderBy = {
};

var VidiunKontikiStorageProfileOrderBy = module.exports.VidiunKontikiStorageProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunLanguage = module.exports.VidiunLanguage = {
AB : "Abkhazian",
AA : "Afar",
AF : "Afrikaans",
SQ : "Albanian",
AM : "Amharic",
AR : "Arabic",
HY : "Armenian",
AS_ : "Assamese",
AY : "Aymara",
AZ : "Azerbaijani",
BA : "Bashkir",
EU : "Basque",
BN : "Bengali (Bangla)",
DZ : "Bhutani",
BH : "Bihari",
BI : "Bislama",
BR : "Breton",
BG : "Bulgarian",
MY : "Burmese",
BE : "Byelorussian (Belarusian)",
KM : "Cambodian",
CA : "Catalan",
ZH : "Chinese",
CO : "Corsican",
HR : "Croatian",
CS : "Czech",
DA : "Danish",
NL : "Dutch",
EN : "English",
EO : "Esperanto",
ET : "Estonian",
FO : "Faeroese",
FA : "Farsi",
FJ : "Fiji",
FI : "Finnish",
FR : "French",
FY : "Frisian",
GV : "Gaelic (Manx)",
GD : "Gaelic (Scottish)",
GL : "Galician",
KA : "Georgian",
DE : "German",
EL : "Greek",
KL : "Greenlandic",
GN : "Guarani",
GU : "Gujarati",
HA : "Hausa",
IW : "Hebrew",
HE : "Hebrew",
HI : "Hindi",
HU : "Hungarian",
IS : "Icelandic",
IN : "Indonesian",
ID : "Indonesian",
IA : "Interlingua",
IE : "Interlingue",
IU : "Inuktitut",
IK : "Inupiak",
GA : "Irish",
IT : "Italian",
JA : "Japanese",
JV : "Javanese",
KN : "Kannada",
KS : "Kashmiri",
KK : "Kazakh",
RW : "Kinyarwanda (Ruanda)",
KY : "Kirghiz",
RN : "Kirundi (Rundi)",
KO : "Korean",
KU : "Kurdish",
LO : "Laothian",
LA : "Latin",
LV : "Latvian (Lettish)",
LI : "Limburgish ( Limburger)",
LN : "Lingala",
LT : "Lithuanian",
MK : "Macedonian",
MG : "Malagasy",
MS : "Malay",
ML : "Malayalam",
MT : "Maltese",
MI : "Maori",
MR : "Marathi",
MO : "Moldavian",
MN : "Mongolian",
NA : "Nauru",
NE : "Nepali",
NO : "Norwegian",
OC : "Occitan",
OR_ : "Oriya",
OM : "Oromo (Afan, Galla)",
PS : "Pashto (Pushto)",
PL : "Polish",
PT : "Portuguese",
PA : "Punjabi",
QU : "Quechua",
RM : "Rhaeto-Romance",
RO : "Romanian",
RU : "Russian",
SM : "Samoan",
SG : "Sangro",
SA : "Sanskrit",
SR : "Serbian",
SH : "Serbo-Croatian",
ST : "Sesotho",
TN : "Setswana",
SN : "Shona",
SD : "Sindhi",
SI : "Sinhalese",
SS : "Siswati",
SK : "Slovak",
SL : "Slovenian",
SO : "Somali",
ES : "Spanish",
SU : "Sundanese",
SW : "Swahili (Kiswahili)",
SV : "Swedish",
TL : "Tagalog",
TG : "Tajik",
TA : "Tamil",
TT : "Tatar",
TE : "Telugu",
TH : "Thai",
BO : "Tibetan",
TI : "Tigrinya",
TO : "Tonga",
TS : "Tsonga",
TR : "Turkish",
TK : "Turkmen",
TW : "Twi",
UG : "Uighur",
UK : "Ukrainian",
UR : "Urdu",
UZ : "Uzbek",
VI : "Vietnamese",
VO : "Volapuk",
CY : "Welsh",
WO : "Wolof",
XH : "Xhosa",
YI : "Yiddish",
JI : "Yiddish",
YO : "Yoruba",
ZU : "Zulu",
};

var VidiunLiveAssetOrderBy = module.exports.VidiunLiveAssetOrderBy = {
CREATED_AT_ASC : "+createdAt",
DELETED_AT_ASC : "+deletedAt",
SIZE_ASC : "+size",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DELETED_AT_DESC : "-deletedAt",
SIZE_DESC : "-size",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunLiveChannelOrderBy = module.exports.VidiunLiveChannelOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_DATE_ASC : "+endDate",
LAST_PLAYED_AT_ASC : "+lastPlayedAt",
MEDIA_TYPE_ASC : "+mediaType",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
PLAYS_ASC : "+plays",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
VIEWS_ASC : "+views",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_DATE_DESC : "-endDate",
LAST_PLAYED_AT_DESC : "-lastPlayedAt",
MEDIA_TYPE_DESC : "-mediaType",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
PLAYS_DESC : "-plays",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
VIEWS_DESC : "-views",
WEIGHT_DESC : "-weight",
};

var VidiunLiveChannelSegmentOrderBy = module.exports.VidiunLiveChannelSegmentOrderBy = {
CREATED_AT_ASC : "+createdAt",
START_TIME_ASC : "+startTime",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
START_TIME_DESC : "-startTime",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunLiveChannelSegmentStatus = module.exports.VidiunLiveChannelSegmentStatus = {
ACTIVE : "2",
DELETED : "3",
};

var VidiunLiveEntryOrderBy = module.exports.VidiunLiveEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_DATE_ASC : "+endDate",
LAST_PLAYED_AT_ASC : "+lastPlayedAt",
MEDIA_TYPE_ASC : "+mediaType",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
PLAYS_ASC : "+plays",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
VIEWS_ASC : "+views",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_DATE_DESC : "-endDate",
LAST_PLAYED_AT_DESC : "-lastPlayedAt",
MEDIA_TYPE_DESC : "-mediaType",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
PLAYS_DESC : "-plays",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
VIEWS_DESC : "-views",
WEIGHT_DESC : "-weight",
};

var VidiunLiveParamsOrderBy = module.exports.VidiunLiveParamsOrderBy = {
};

var VidiunLiveStreamAdminEntryOrderBy = module.exports.VidiunLiveStreamAdminEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_DATE_ASC : "+endDate",
LAST_PLAYED_AT_ASC : "+lastPlayedAt",
MEDIA_TYPE_ASC : "+mediaType",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
PLAYS_ASC : "+plays",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
VIEWS_ASC : "+views",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_DATE_DESC : "-endDate",
LAST_PLAYED_AT_DESC : "-lastPlayedAt",
MEDIA_TYPE_DESC : "-mediaType",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
PLAYS_DESC : "-plays",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
VIEWS_DESC : "-views",
WEIGHT_DESC : "-weight",
};

var VidiunLiveStreamEntryOrderBy = module.exports.VidiunLiveStreamEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_DATE_ASC : "+endDate",
LAST_PLAYED_AT_ASC : "+lastPlayedAt",
MEDIA_TYPE_ASC : "+mediaType",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
PLAYS_ASC : "+plays",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
VIEWS_ASC : "+views",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_DATE_DESC : "-endDate",
LAST_PLAYED_AT_DESC : "-lastPlayedAt",
MEDIA_TYPE_DESC : "-mediaType",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
PLAYS_DESC : "-plays",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
VIEWS_DESC : "-views",
WEIGHT_DESC : "-weight",
};

var VidiunMediaEntryOrderBy = module.exports.VidiunMediaEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_DATE_ASC : "+endDate",
LAST_PLAYED_AT_ASC : "+lastPlayedAt",
MEDIA_TYPE_ASC : "+mediaType",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
PLAYS_ASC : "+plays",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
VIEWS_ASC : "+views",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_DATE_DESC : "-endDate",
LAST_PLAYED_AT_DESC : "-lastPlayedAt",
MEDIA_TYPE_DESC : "-mediaType",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
PLAYS_DESC : "-plays",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
VIEWS_DESC : "-views",
WEIGHT_DESC : "-weight",
};

var VidiunMediaFlavorParamsOrderBy = module.exports.VidiunMediaFlavorParamsOrderBy = {
};

var VidiunMediaFlavorParamsOutputOrderBy = module.exports.VidiunMediaFlavorParamsOutputOrderBy = {
};

var VidiunMediaInfoOrderBy = module.exports.VidiunMediaInfoOrderBy = {
};

var VidiunMediaServerOrderBy = module.exports.VidiunMediaServerOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunMetadataObjectType = module.exports.VidiunMetadataObjectType = {
AD_CUE_POINT : "adCuePointMetadata.AdCuePoint",
ANNOTATION : "annotationMetadata.Annotation",
CODE_CUE_POINT : "codeCuePointMetadata.CodeCuePoint",
ENTRY : "1",
CATEGORY : "2",
USER : "3",
PARTNER : "4",
};

var VidiunMetadataOrderBy = module.exports.VidiunMetadataOrderBy = {
CREATED_AT_ASC : "+createdAt",
METADATA_PROFILE_VERSION_ASC : "+metadataProfileVersion",
UPDATED_AT_ASC : "+updatedAt",
VERSION_ASC : "+version",
CREATED_AT_DESC : "-createdAt",
METADATA_PROFILE_VERSION_DESC : "-metadataProfileVersion",
UPDATED_AT_DESC : "-updatedAt",
VERSION_DESC : "-version",
};

var VidiunMetadataProfileOrderBy = module.exports.VidiunMetadataProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunMixEntryOrderBy = module.exports.VidiunMixEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_DATE_ASC : "+endDate",
LAST_PLAYED_AT_ASC : "+lastPlayedAt",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
PLAYS_ASC : "+plays",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
VIEWS_ASC : "+views",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_DATE_DESC : "-endDate",
LAST_PLAYED_AT_DESC : "-lastPlayedAt",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
PLAYS_DESC : "-plays",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
VIEWS_DESC : "-views",
WEIGHT_DESC : "-weight",
};

var VidiunPartnerOrderBy = module.exports.VidiunPartnerOrderBy = {
ADMIN_EMAIL_ASC : "+adminEmail",
ADMIN_NAME_ASC : "+adminName",
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
STATUS_ASC : "+status",
WEBSITE_ASC : "+website",
ADMIN_EMAIL_DESC : "-adminEmail",
ADMIN_NAME_DESC : "-adminName",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
STATUS_DESC : "-status",
WEBSITE_DESC : "-website",
};

var VidiunPdfFlavorParamsOrderBy = module.exports.VidiunPdfFlavorParamsOrderBy = {
};

var VidiunPdfFlavorParamsOutputOrderBy = module.exports.VidiunPdfFlavorParamsOutputOrderBy = {
};

var VidiunPermissionItemOrderBy = module.exports.VidiunPermissionItemOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunPermissionItemType = module.exports.VidiunPermissionItemType = {
API_ACTION_ITEM : "vApiActionPermissionItem",
API_PARAMETER_ITEM : "vApiParameterPermissionItem",
};

var VidiunPermissionOrderBy = module.exports.VidiunPermissionOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunPlayableEntryOrderBy = module.exports.VidiunPlayableEntryOrderBy = {
CREATED_AT_ASC : "+createdAt",
DURATION_ASC : "+duration",
END_DATE_ASC : "+endDate",
LAST_PLAYED_AT_ASC : "+lastPlayedAt",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
PLAYS_ASC : "+plays",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
VIEWS_ASC : "+views",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
DURATION_DESC : "-duration",
END_DATE_DESC : "-endDate",
LAST_PLAYED_AT_DESC : "-lastPlayedAt",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
PLAYS_DESC : "-plays",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
VIEWS_DESC : "-views",
WEIGHT_DESC : "-weight",
};

var VidiunPlaybackProtocol = module.exports.VidiunPlaybackProtocol = {
APPLE_HTTP : "applehttp",
AUTO : "auto",
AKAMAI_HD : "hdnetwork",
AKAMAI_HDS : "hdnetworkmanifest",
HDS : "hds",
HLS : "hls",
HTTP : "http",
MPEG_DASH : "mpegdash",
MULTICAST_SL : "multicast_silverlight",
RTMP : "rtmp",
RTSP : "rtsp",
SILVER_LIGHT : "sl",
};

var VidiunPlaylistOrderBy = module.exports.VidiunPlaylistOrderBy = {
CREATED_AT_ASC : "+createdAt",
END_DATE_ASC : "+endDate",
MODERATION_COUNT_ASC : "+moderationCount",
NAME_ASC : "+name",
PARTNER_SORT_VALUE_ASC : "+partnerSortValue",
RANK_ASC : "+rank",
RECENT_ASC : "+recent",
START_DATE_ASC : "+startDate",
TOTAL_RANK_ASC : "+totalRank",
UPDATED_AT_ASC : "+updatedAt",
WEIGHT_ASC : "+weight",
CREATED_AT_DESC : "-createdAt",
END_DATE_DESC : "-endDate",
MODERATION_COUNT_DESC : "-moderationCount",
NAME_DESC : "-name",
PARTNER_SORT_VALUE_DESC : "-partnerSortValue",
RANK_DESC : "-rank",
RECENT_DESC : "-recent",
START_DATE_DESC : "-startDate",
TOTAL_RANK_DESC : "-totalRank",
UPDATED_AT_DESC : "-updatedAt",
WEIGHT_DESC : "-weight",
};

var VidiunRemoteDropFolderOrderBy = module.exports.VidiunRemoteDropFolderOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunReportOrderBy = module.exports.VidiunReportOrderBy = {
CREATED_AT_ASC : "+createdAt",
CREATED_AT_DESC : "-createdAt",
};

var VidiunScpDropFolderOrderBy = module.exports.VidiunScpDropFolderOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunSearchConditionComparison = module.exports.VidiunSearchConditionComparison = {
EQUAL : "1",
GREATER_THAN : "2",
GREATER_THAN_OR_EQUAL : "3",
LESS_THAN : "4",
LESS_THAN_OR_EQUAL : "5",
};

var VidiunSftpDropFolderOrderBy = module.exports.VidiunSftpDropFolderOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunShortLinkOrderBy = module.exports.VidiunShortLinkOrderBy = {
CREATED_AT_ASC : "+createdAt",
EXPIRES_AT_ASC : "+expiresAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
EXPIRES_AT_DESC : "-expiresAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunSourceType = module.exports.VidiunSourceType = {
LIMELIGHT_LIVE : "limeLight.LIVE_STREAM",
VELOCIX_LIVE : "velocix.VELOCIX_LIVE",
FILE : "1",
WEBCAM : "2",
URL : "5",
SEARCH_PROVIDER : "6",
AKAMAI_LIVE : "29",
MANUAL_LIVE_STREAM : "30",
AKAMAI_UNIVERSAL_LIVE : "31",
LIVE_STREAM : "32",
LIVE_CHANNEL : "33",
RECORDED_LIVE : "34",
CLIP : "35",
};

var VidiunSshDropFolderOrderBy = module.exports.VidiunSshDropFolderOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunStorageProfileOrderBy = module.exports.VidiunStorageProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunStorageProfileProtocol = module.exports.VidiunStorageProfileProtocol = {
KONTIKI : "kontiki.KONTIKI",
VIDIUN_DC : "0",
FTP : "1",
SCP : "2",
SFTP : "3",
S3 : "6",
LOCAL : "7",
};

var VidiunSwfFlavorParamsOrderBy = module.exports.VidiunSwfFlavorParamsOrderBy = {
};

var VidiunSwfFlavorParamsOutputOrderBy = module.exports.VidiunSwfFlavorParamsOutputOrderBy = {
};

var VidiunSyndicationDistributionProfileOrderBy = module.exports.VidiunSyndicationDistributionProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunSyndicationDistributionProviderOrderBy = module.exports.VidiunSyndicationDistributionProviderOrderBy = {
};

var VidiunTaggedObjectType = module.exports.VidiunTaggedObjectType = {
ENTRY : "1",
CATEGORY : "2",
};

var VidiunThumbAssetOrderBy = module.exports.VidiunThumbAssetOrderBy = {
CREATED_AT_ASC : "+createdAt",
DELETED_AT_ASC : "+deletedAt",
SIZE_ASC : "+size",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DELETED_AT_DESC : "-deletedAt",
SIZE_DESC : "-size",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunThumbParamsOrderBy = module.exports.VidiunThumbParamsOrderBy = {
};

var VidiunThumbParamsOutputOrderBy = module.exports.VidiunThumbParamsOutputOrderBy = {
};

var VidiunTubeMogulSyndicationFeedOrderBy = module.exports.VidiunTubeMogulSyndicationFeedOrderBy = {
CREATED_AT_ASC : "+createdAt",
NAME_ASC : "+name",
PLAYLIST_ID_ASC : "+playlistId",
TYPE_ASC : "+type",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
NAME_DESC : "-name",
PLAYLIST_ID_DESC : "-playlistId",
TYPE_DESC : "-type",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunUiConfAdminOrderBy = module.exports.VidiunUiConfAdminOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunUiConfOrderBy = module.exports.VidiunUiConfOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunUploadTokenOrderBy = module.exports.VidiunUploadTokenOrderBy = {
CREATED_AT_ASC : "+createdAt",
CREATED_AT_DESC : "-createdAt",
};

var VidiunUserLoginDataOrderBy = module.exports.VidiunUserLoginDataOrderBy = {
};

var VidiunUserOrderBy = module.exports.VidiunUserOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
};

var VidiunUserRoleOrderBy = module.exports.VidiunUserRoleOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunVirusScanEngineType = module.exports.VidiunVirusScanEngineType = {
CLAMAV_SCAN_ENGINE : "clamAVScanEngine.ClamAV",
SYMANTEC_SCAN_DIRECT_ENGINE : "symantecScanEngine.SymantecScanDirectEngine",
SYMANTEC_SCAN_ENGINE : "symantecScanEngine.SymantecScanEngine",
SYMANTEC_SCAN_JAVA_ENGINE : "symantecScanEngine.SymantecScanJavaEngine",
};

var VidiunVirusScanProfileOrderBy = module.exports.VidiunVirusScanProfileOrderBy = {
CREATED_AT_ASC : "+createdAt",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunWebexDropFolderFileOrderBy = module.exports.VidiunWebexDropFolderFileOrderBy = {
CREATED_AT_ASC : "+createdAt",
FILE_NAME_ASC : "+fileName",
FILE_SIZE_ASC : "+fileSize",
FILE_SIZE_LAST_SET_AT_ASC : "+fileSizeLastSetAt",
ID_ASC : "+id",
PARSED_FLAVOR_ASC : "+parsedFlavor",
PARSED_SLUG_ASC : "+parsedSlug",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
FILE_NAME_DESC : "-fileName",
FILE_SIZE_DESC : "-fileSize",
FILE_SIZE_LAST_SET_AT_DESC : "-fileSizeLastSetAt",
ID_DESC : "-id",
PARSED_FLAVOR_DESC : "-parsedFlavor",
PARSED_SLUG_DESC : "-parsedSlug",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunWebexDropFolderOrderBy = module.exports.VidiunWebexDropFolderOrderBy = {
CREATED_AT_ASC : "+createdAt",
ID_ASC : "+id",
NAME_ASC : "+name",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
ID_DESC : "-id",
NAME_DESC : "-name",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunWidevineFlavorAssetOrderBy = module.exports.VidiunWidevineFlavorAssetOrderBy = {
CREATED_AT_ASC : "+createdAt",
DELETED_AT_ASC : "+deletedAt",
SIZE_ASC : "+size",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
DELETED_AT_DESC : "-deletedAt",
SIZE_DESC : "-size",
UPDATED_AT_DESC : "-updatedAt",
};

var VidiunWidevineFlavorParamsOrderBy = module.exports.VidiunWidevineFlavorParamsOrderBy = {
};

var VidiunWidevineFlavorParamsOutputOrderBy = module.exports.VidiunWidevineFlavorParamsOutputOrderBy = {
};

var VidiunWidevineProfileOrderBy = module.exports.VidiunWidevineProfileOrderBy = {
ID_ASC : "+id",
NAME_ASC : "+name",
ID_DESC : "-id",
NAME_DESC : "-name",
};

var VidiunWidgetOrderBy = module.exports.VidiunWidgetOrderBy = {
CREATED_AT_ASC : "+createdAt",
CREATED_AT_DESC : "-createdAt",
};

var VidiunYahooSyndicationFeedOrderBy = module.exports.VidiunYahooSyndicationFeedOrderBy = {
CREATED_AT_ASC : "+createdAt",
NAME_ASC : "+name",
PLAYLIST_ID_ASC : "+playlistId",
TYPE_ASC : "+type",
UPDATED_AT_ASC : "+updatedAt",
CREATED_AT_DESC : "-createdAt",
NAME_DESC : "-name",
PLAYLIST_ID_DESC : "-playlistId",
TYPE_DESC : "-type",
UPDATED_AT_DESC : "-updatedAt",
};
