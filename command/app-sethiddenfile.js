var chalk = require('chalk');
var shell = require('shelljs');
var fileExists = require('file-exists');
var pathExists = require('path-exists');
var Loading = require('./loading');

var SetupHiddenFiles = (function (isNewVersion, modulePath) {
	
	var _CONFIG = {
		isNewVersion: isNewVersion,
		corePath: 'webpack'
	};
	
	function SetupHiddenFiles() {
		
		console.log('');
		
		Loading.start('Generate ' + chalk.blue('.eslint') + ' and ' + chalk.blue('.gitignore'));
		
		yeah('eslintrc');
		yeah('gitignore');
		
		Loading.stop('Generate ' + chalk.blue('.eslint') + ' and ' + chalk.blue('.gitignore') + chalk.green.bold(' OK'));
		
	}
	
	function yeah(fileName) {
		
		var _tempPath = process.env.PWD + '/.ciffi/';
		
		pathExists(_tempPath).then(function (res) {
			if (!res) {
				shell.mkdir(_tempPath);
			}
		});
		
		var _tempFile = _tempPath + fileName;
		var _resource = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-' + _CONFIG.corePath + '/resources/core/' + fileName;
		var _projectRoot = process.env.PWD + '/';
		var _projectFile = process.env.PWD + '/.' + fileName;
		
		if (fileExists(_projectFile)) {
			console.log(chalk.red('File already exists: ' + _projectFile));
		} else {
			pathExists(_projectRoot).then(function (res) {
				if (res) {
					shell.cp(_resource, _tempFile);
					shell.cp(_tempFile, _projectFile);
					shell.rm('-rf', _tempFile);
				}
			});
		}
		
	}
	
	return new SetupHiddenFiles();
	
});

module.exports = SetupHiddenFiles;