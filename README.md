## play-server

The Vidiun 'play-server' cloud manages all client HLS manifest and segment requests. 
This enables the swapping of individual segments with respective alternate pieces of content. Ads are configured against the Vidiun Ad cuepoint API, or represented directly on the ingest stream. Ad events include a VAST ad tag URL. After the play server reaches a time that includes an ad, a VAST request is made on the server to retrieve ads for each client that is consuming the stream. 

Ad tags should be configured with respective substitutions as described in:

[Integrating Vidiun with VAST adTag URL article] (http://knowledge.vidiun.com/integrating-vidiun-vast-adtag-url)

### Deployment
Please see [Deployment doc] (https://github.com/vidiun/play-server/blob/master/play_server_deployment.md)

### Copyright & License

All code in this project is released under the [AGPLv3 license](http://www.gnu.org/licenses/agpl-3.0.html) unless a different license for a particular library is specified in the applicable library path. 

Copyright © Vidiun Inc. All rights reserved.
