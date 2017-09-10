var chalk = require('chalk');
var shell = require('shelljs');
var fileExists = require('file-exists');
var inquirer = require('inquirer');
var pathExists = require('path-exists');
var replace = require('replace-in-file');
var NewModule = (function (modulePath) {
	
	var ASSETSPATHNAME = 'static';
	var ASSETSBUNDLE = 'webpack';
	
	function NewModule(config) {
		
		askForName(config.moduleName, start);
		
	}
	
	function start(moduleName) {
		var _tempPath = process.env.PWD + '/.ciffi/';
		
		pathExists(_tempPath).then(function (res) {
			if (!res) {
				shell.mkdir(_tempPath);
			}
		});
		
		var _configFile = process.env.PWD + '/.ciffisettings';
		
		if (fileExists.sync(_configFile)) {
			
			var _appConfig = require(_configFile);
			ASSETSPATHNAME = _appConfig.assetsPathName;
			//ASSETSBUNDLE = _appConfig.bundle || ASSETSBUNDLE;
			
		}
		
		var _tempFileJs = _tempPath + moduleName + '.js';
		var _resourceJs = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-' + ASSETSBUNDLE + '/resources/newmodule/module.js';
		var _projectModules = process.env.PWD + '/' + ASSETSPATHNAME + '/scripts/modules/';
		var _projectFileJs = process.env.PWD + '/' + ASSETSPATHNAME + '/scripts/modules/' + moduleName + '.js';
		
		if (fileExists.sync(_projectFileJs)) {
			console.log(chalk.red('☠️  File already exists: ' + _projectFileJs + ' ☠️'));
		} else {
			pathExists(_projectModules).then(function (res) {
				if (res) {
					shell.cp(_resourceJs, _tempFileJs);
					replaceModuleName(_tempFileJs, moduleName, function () {
						shell.cp(_tempFileJs, _projectFileJs);
						shell.rm('-rf', _tempFileJs);
						console.log(chalk.green('New file created: ' + _projectFileJs));
					});
				} else {
					shell.mkdir(_projectModules);
					console.log(chalk.green('New folder created: ' + _projectModules));
					shell.cp(_resourceJs, _tempFileJs);
					replaceModuleName(_tempFileJs, moduleName, function () {
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
	
	function replaceModuleName(file, moduleName, callback) {
		replace({
			files: [
				file
			],
			replace: /@REPLACE__MODULENAME@/g,
			with: capitalizeFirstLetter(moduleName)
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
				message: 'Specify module name',
				default: 'new-module',
				validate: function (res) {
					
					var done = this.async();
					
					setTimeout(function () {
						
						var _test = new RegExp(/^$|\s+|\w\s+|[\/]|^\.|\.$/);
						var _testResult = _test.test(res);
						
						if (typeof res !== 'string' || _testResult) {
							done('☠️  Module must have real name ☠️');
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
	
	return NewModule;
	
});

module.exports = NewModule;