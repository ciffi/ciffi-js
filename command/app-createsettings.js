var chalk = require('chalk');
var shell = require('shelljs');
var replace = require('replace-in-file');
var fileExists = require('file-exists');
var pathExists = require('path-exists');
var Loading = require('./loading');

var CreateSettingsFile = (function (config, modulePath) {
	
	var _CONFIG = config;
	
	function CreateSettingsFile() {
		console.log('');
		
		Loading.start('Generate ' + chalk.blue('.ciffisettings'));
		
		yeah('ciffisettings', _CONFIG);
		
		Loading.stop('Generate ' + chalk.blue('.ciffisettings') + chalk.green.bold(' OK'));
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
	
	function replaceBundleName(config, file, callback) {
		replace({
			files: [file],
			replace: /@REPLACE__BUNDLE__NAME@/g,
			with: config
		}, function (error) {
			if (error) {
				return console.error('Error occurred:', error);
			}
			callback();
		});
	}
	
	function yeah(fileName, appConfig) {
		
		var _tempPath = process.env.PWD + '/.ciffi/';
		
		pathExists(_tempPath).then(function (res) {
			if (!res) {
				shell.mkdir(_tempPath);
			}
		});
		
		var _tempFile = _tempPath + fileName;
		var _resource = modulePath + '/lib/node_modules/ciffi/resources/' + _CONFIG.bundle + '/core/' + fileName;
		var _projectRoot = process.env.PWD + '/';
		var _projectFile = process.env.PWD + '/.' + fileName;
		
		shell.cp(_resource, _tempFile);
		
		replaceBundleName(appConfig.bundle, _tempFile, function () {
			replaceBuildPath(appConfig.assetsPath, _tempFile, function () {
				replaceConfig(appConfig.projectName, _tempFile, function () {
					
					if (fileExists(_projectFile)) {
						console.log(chalk.red('File already exists: ' + _projectFile));
					} else {
						pathExists(_projectRoot).then(function (res) {
							if (res) {
								shell.cp(_tempFile, _projectFile);
								shell.rm('-rf', _tempFile);
								shell.rm('-rf', _projectRoot + '/' + fileName);
							}
						});
					}
					
				});
			});
		});
		
	}
	
	return new CreateSettingsFile();
	
});

module.exports = CreateSettingsFile;