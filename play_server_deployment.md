Environment:
=======================
 - 1 Memcache server per cloud. [will be installed in next steps]
 - 1 Shared disc per cloud /opt/vidiun/shared
 - 1 Load balancer per cloud (I recommend to use haproxy for QA environment, see http://cbonte.github.io/haproxy-dconv/configuration-1.5.html)

Machine prerequisites:
=======================
- Git (For Ubuntu: https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-12-04)
- Memcahced (For Ubuntu https://www.digitalocean.com/community/tutorials/how-to-install-and-use-memcache-on-ubuntu-12-04)
- Install mediaInfo by running: apt-get install mediainfo
- Run apt-get install python-software-properties
- Install Node.js 0.10.26 or above: installation reference: https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager#ubuntu-mint-elementary-os
- Node Packaged Modules (npm) 1.4.3 or above (see above) 
- Node gyp 0.13.0 or above: npm install -g node-gyp
- Apache Ant 1.8.2 or above: apt-get -u install ant
- Run apt-get install libmemcached-dev
- Run apt-get install libfontconfig1

Vidiun platform required changes:
=======================
- Please note for play-server needs version IX-9.19.1 at least for it to run. So if you are behind please update you Vidiun installation before continuing to any of the next steps.
- Minimum html5 player lib version is v2.15.
- Create play-server partner by running: mysql /opt/vidiun/app/deployment/updates/sql/2014_08_04_create_play_partner.sql?
- Add permission to play server partner by running: php /opt/vidiun/app/deployment/updates/scripts/add_permissions/2014_08_04_play_server_partner_live.php
- update /opt/vidiun/app/configurations/local.ini file and set the play_server_host value to point to your play server host_name/load_balancer. 
- update /opt/vidiun/app/admin.ini file to include the new partner configuration flag for play server. 
To do that add the following section in you admin.ini file (need to clear cache for changes to take affect):
moduls.enablePlayServer.enabled = true
moduls.enablePlayServer.permissionType = 2
moduls.enablePlayServer.label = Enable Play-Server
moduls.enablePlayServer.permissionName = FEATURE_PLAY_SERVER
moduls.enablePlayServer.basePermissionType =
moduls.enablePlayServer.basePermissionName =
moduls.enablePlayServer.group = GROUP_ENABLE_DISABLE_FEATURES

Code:
=======================
create the directory /opt/vidiun/ 
Clone https://github.com/vidiun/play-server to /opt/vidiun/play-server :
sudo git clone -b v1.1 https://github.com/vidiun/play-server

Configure:
=======================
- cp /opt/vidiun/play-server/config/user_input.ini.template /opt/vidiun/play-server/config/user_input.ini
- @CLOUD_SHARED_BASE_PATH@ should be replaced with a real path 
- mkdir @CLOUD_SHARED_BASE_PATH@
- mkdir @CLOUD_SHARED_BASE_PATH@/ad_download
- mkdir @CLOUD_SHARED_BASE_PATH@/ad_transcode
- mkdir @CLOUD_SHARED_BASE_PATH@/segments
- mkdir @CLOUD_SHARED_BASE_PATH@/tmp
- mkdir @CLOUD_SHARED_BASE_PATH@/ad_ts
- mkdir @CLOUD_SHARED_BASE_PATH@/filler
- mkdir /opt/vidiun/log

Replace tokens in user_input.ini files:
=======================
- @SERVICE_URL@ - Vidiun API server host name
- @PLAY_PARTNER_ADMIN_SECRET@ - Admin secret of partner -6.
- @CLOUD_HOSTNAME@ - Hostname of the cloud load balancer.
- @CLOUD_SECRET@ - Random short string, e.g. 'abc'
- @CLOUD_SHARED_BASE_PATH@ - path to shared folder disc, e.g. /opt/vidiun/shared/
- @LOG_DIR@ - Path to logs folder, e.g. /opt/vidiun/log.  

Install:
=======================
 - cd /opt/vidiun/play-server
 - npm install
 - ant -Dversion={version} -DconfigFilePath={user_input.ini file path} (e.g -Dversion=v1.1 -DconfigFilePath=/opt/vidiun/play-server/config/user_input.ini)
 
 Post Install requirements:
 =======================
 - If you are not running with a production environment Wowza license update hackWowzaUniqueSession to 1.
 - play server by default runs on port 80 for http, make sure this port is open. If it's not please change to the correct port in config.ini file.
 
Execute:
=======================
/etc/init.d/vidiun_play start
