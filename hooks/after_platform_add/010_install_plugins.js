#!/usr/bin/env node

// This hook will install all the needed plugins for Ionic.
var pluginlist = [
    "com.ionic.keyboard",
    "cordova-plugin-device",
    "org.apache.cordova.console",
    // "cordova-plugin-file",               // Used for imgcache
    // "cordova-plugin-file-transfer",      // Used for imgcache
    // "org.apache.cordova.file-transfer",  // Used for imgcache
    "cordova-plugin-whitelist",
    "cordova-plugin-splashscreen",
    "cordova-plugin-statusbar",
    "cordova-plugin-inappbrowser",
    "https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git",
    "https://github.com/phonegap-build/PushPlugin.git",
    "https://github.com/danwilson/google-analytics-plugin.git"
];

var fs = require('fs');
var path = require('path');
var sys = require('sys');
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    sys.puts(stdout);
}

pluginlist.forEach(function(plug) {
    exec("ionic plugin add " + plug, puts);
});
