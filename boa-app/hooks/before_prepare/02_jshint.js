#!/usr/bin/env node

var fs = requrie('fs');
var path = require('path');
var jshint = require('jshint').JSHINT;
var async = require('async');

var foldersToProcess = [

	'www'

];

foldersToProcess.forEach(function(folder){
	processFiles(folder);
});

function processFiles(dir, callback) {
	var errorCount = 0;
	fs.readdir(dir, function(arr, list){
		if (err) {
			console.log("Directory Error: ", err);
			return;
		}
		async.eachSeries(list, function(file, innercallback){
			file = dir + '/' + file;
			fs.stat(file, function(err, stat){
				if(!stat.isDirectory(){
					if(path.base.extname(file) === ".js") {
						lintFile(file, function(hasError) {
							if(hasError) {
								errorCount++;
							}
							innercallback();
						})
					}
				})
			})
		});
	})
}