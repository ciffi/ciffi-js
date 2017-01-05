var chalk = require('chalk');
var prompt = require('prompt');
var replace = require('replace-in-file');
var emptydir = require('empty-dir');
var cliCursor = require('cli-cursor');
var fileExists = require('file-exists');
var pathExists = require('path-exists');
var shell = require('shelljs');
var exec = require('child_process').exec;
var log = require('single-line-log').stdout;

var AppUpdate = (function () {
	
	'use strict';
	
	function AppUpdate() {
		
		var _resource = process.config.variables.node_prefix + '/lib/node_modules/ciffi/webpack/package.json';
		var _projectRoot = process.env.PWD + '/';
		var _packageFile = process.env.PWD + '/package.json';
		var _tempPath = process.env.PWD + '/.ciffi/';
		var _tempFile = _tempPath + '/package.json';
		
		var _count = 0;
		var _string = '.';
		var _interval = setInterval(function () {
			for (var _i = 0; _i <= _count; _i++) {
				_string += '.';
			}
			;
			log(chalk.green('Update in progress: ' + _string));
		}, 250);
		
		exec('npm install ciffi -g && npm run setup', function (errors, data) {
			
			clearInterval(_interval);
			
			console.log('');
			console.log(data);
			
			var _configFile = process.env.PWD + '/.ciffisettings';
			
			if (fileExists(_configFile)) {
				
				var _appConfig = require(_configFile);
				
				shell.rm('-rf', _packageFile);
				
				pathExists(_tempPath).then(function (res) {
					if (!res) {
						shell.mkdir(_tempPath);
					}
				});
				
				shell.cp(_resource, _tempFile);
				
				replaceBuildPath(_appConfig.assetsPath, _tempFile, function () {
					
					replaceConfig(_appConfig.projectName, _tempFile, function () {
						
						pathExists(_projectRoot).then(function (res) {
							if (res) {
								shell.cp(_tempFile, _packageFile);
								shell.rm('-rf', _tempFile);
								console.log(chalk.green('New file created: ' + _packageFile));
							}
						});
						
					});
				});
				
			} else {
				console.log(chalk.red('Current project cannot be updated: .ciffisettings file not found'));
			}
		});
		
		
	}
	
	function replaceBuildPath(config, file, callback) {
		var _pathName = config.split('/')[config.split('/').length - 1];
		replace({
			files: [file],
			replace: /@REPLACE__ASSETS@/g,
			with: config
		}, function (error) {
			if (error) {
				return console.error('Error occurred:', error);
			}
			replace({
				files: [file],
				replace: /@REPLACE__ASSETS__NAME@/g,
				with: _pathName
			}, function (error) {
				if (error) {
					return console.error('Error occurred:', error);
				}
				callback();
			});
		});
	}
	
	function replaceConfig(config, file, callback) {
		replace({
			files: [file],
			replace: /@REPLACE__CONFIG@/g,
			with: config
		}, function (error) {
			if (error) {
				return console.error('Error occurred:', error);
			}
			callback();
		});
	}
	
	return new AppUpdate();
})();

module.exports = AppUpdate;