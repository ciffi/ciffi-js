var chalk = require('chalk');
var shell = require('shelljs');
var fileExists = require('file-exists');
var inquirer = require('inquirer');
var pathExists = require('path-exists');
var replace = require('replace-in-file');
var NewComponent = (function (modulePath) {
	
	var ASSETSPATHNAME = 'static';
	var ASSETSBUNDLE = 'webpack';
	
	function NewComponent(config) {
		
		askForName(config.componentName, start);
	}
	
	function start(componentName) {
		var _tempPath = process.env.PWD + '/.ciffi/';
		
		pathExists(_tempPath).then(function (res) {
			if (!res) {
				shell.mkdir(_tempPath);
			}
		});
		
		var _configFile = process.env.PWD + '/.ciffisettings';
		
		if (fileExists(_configFile)) {
			
			var _appConfig = require(_configFile);
			ASSETSPATHNAME = _appConfig.assetsPathName;
			//ASSETSBUNDLE = _appConfig.bundle || ASSETSBUNDLE;
			
		}
		
		var _tempFileJs = _tempPath + componentName + '.js';
		var _resourceJs = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-' + ASSETSBUNDLE + '/resources/newcomponent/component.js';
		var _projectComponents = process.env.PWD + '/' + ASSETSPATHNAME + '/scripts/components/';
		var _projectFileJs = process.env.PWD + '/' + ASSETSPATHNAME + '/scripts/components/' + componentName + '.js';
		
		if (fileExists(_projectFileJs)) {
			console.log(chalk.red('☠️  File already exists: ' + _projectFileJs + ' ☠️'));
		} else {
			pathExists(_projectComponents).then(function (res) {
				if (res) {
					shell.cp(_resourceJs, _tempFileJs);
					replaceComponentName(_tempFileJs, componentName, function () {
						shell.cp(_tempFileJs, _projectFileJs);
						shell.rm('-rf', _tempFileJs);
						console.log(chalk.green('New file created: ' + _projectFileJs));
					});
				} else {
					shell.mkdir(_projectComponents);
					console.log(chalk.green('New folder created: ' + _projectComponents));
					shell.cp(_resourceJs, _tempFileJs);
					replaceComponentName(_tempFileJs, componentName, function () {
						shell.cp(_tempFileJs, _projectFileJs);
						shell.rm('-rf', _tempFileJs);
						console.log(chalk.green('New file created: ' + _projectFileJs));
					});
				}
			});
		}
	}
	
	function capitalizeFirstLetter(string) {
		var _capitalized = string.charAt(0).toUpperCase() + string.slice(1);
		var _stringArray = _capitalized.split('-');
		var _result = '';
		for (var i = 0; i < _stringArray.length; i++) {
			_result += _stringArray[i].charAt(0).toUpperCase() + _stringArray[i].slice(1)
		}
		return _result;
	}
	
	function replaceComponentName(file, componentName, callback) {
		replace({
			files: [
				file
			],
			replace: /@REPLACE__COMPONENTNAME@/g,
			with: capitalizeFirstLetter(componentName)
		}, function (error, changedFiles) {
			if (error) {
				return console.error('Error occurred:', error);
			}
			callback();
		});
	}
	
	function askForName(name, callback) {
		var _name = name;
		if (!_name) {
			inquirer.prompt({
				type: 'input',
				name: 'name',
				message: 'Specify component name',
				default: 'new-component',
				validate: function (res) {
					
					var done = this.async();
					
					setTimeout(function () {
						
						var _test = new RegExp(/^$|\s+|\w\s+|[\/]|^\.|\.$/);
						var _testResult = _test.test(res);
						
						if (typeof res !== 'string' || _testResult) {
							done('☠️  Component must have real name ☠️');
							return;
						}
						
						done(null, true);
						
					}, 10);
				}
			}).then(function (res) {
				callback(res.name);
			});
		} else {
			callback(_name);
		}
	}
	
	return NewComponent;
	
});

module.exports = NewComponent;