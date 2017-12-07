let chalk = require('chalk');
let shell = require('shelljs');
let fileExists = require('file-exists');
let pathExists = require('path-exists');
let Loading = require('./loading');

let SetupHiddenFiles = (function (isNewVersion, modulePath) {
	
	let _CONFIG = {
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
		
		let _tempPath = process.env.PWD + '/.ciffi/';
		
		pathExists(_tempPath).then(function (res) {
			if (!res) {
				shell.mkdir(_tempPath);
			}
		});
		
		let _tempFile = _tempPath + fileName;
		let _resource = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-' + _CONFIG.corePath + '/resources/core/' + fileName;
		let _projectRoot = process.env.PWD + '/';
		let _projectFile = process.env.PWD + '/.' + fileName;
		
		if (fileExists.sync(_projectFile)) {
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