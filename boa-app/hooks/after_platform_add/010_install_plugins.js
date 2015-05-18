#!/usr/bin/env node
 
//this hook installs all your plugins
 
// add your plugins to this list--either 
// the identifier, the filesystem location 
// or the URL
var pluginlist = [
    "org.apache.cordova.device",
    "org.apache.cordova.geolocation",
    "cordova plugin add https://github.com/phonegap-build/PushPlugin.git",
    "cordova plugin add de.appplant.cordova.plugin.local-notification",
    "cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git",
    "cordova plugin add org.apache.cordova.network-information", 
    "cordova plugin add https://github.com/katzer/cordova-plugin-badge.git",
    "cordova plugin add org.apache.cordova.camera",
    "cordova plugin add org.apache.cordova.media-capture"
];
 
// no need to configure below
 
var fs = require('fs');
var path = require('path');
var sys = require('sys')
var exec = require('child_process').exec;
 
function puts(error, stdout, stderr) {
    sys.puts(stdout)
}
 
pluginlist.forEach(function(plug) {
    exec("cordova plugin add " + plug, puts);
});