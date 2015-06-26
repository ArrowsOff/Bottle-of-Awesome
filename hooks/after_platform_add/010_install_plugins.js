#!/usr/bin/env node
 
//this hook installs all your plugins
 
// add your plugins to this list--either 
// the identifier, the filesystem location 
// or the URL 
    
var pluginlist = [
    "com.ionic.keyboard",
    "cordova-plugin-device",
    "org.apache.cordova.console",
    // "cordova-plugin-geolocation",
    // "https://github.com/phonegap-build/PushPlugin.git",
    // "https://github.com/apache/cordova-plugin-file.git",
    "cordova-plugin-file",
    "cordova-plugin-file-transfer",
    "cordova-plugin-media",
    "cordova-plugin-whitelist",
    "https://github.com/danwilson/google-analytics-plugin.git",
    "cordova-plugin-splashscreen",
    "cordova-plugin-statusbar",
    "https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git"
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
    exec("ionic plugin add " + plug, puts);
});