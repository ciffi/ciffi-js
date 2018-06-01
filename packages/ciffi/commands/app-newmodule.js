let chalk = require('chalk');
let shell = require('shelljs');
let fileExists = require('file-exists');
let inquirer = require('inquirer');
let pathExists = require('path-exists');
let replace = require('replace-in-file');
let NewModule = (function (modulePath) {
	
	let ASSETSPATHNAME = 'static';
	let ASSETSBUNDLE = 'webpack';
	
	function NewModule(config) {
		
		askForName(config.moduleName, start);
		
	}
	
	function start(moduleName) {
		let _tempPath = process.env.PWD + '/.ciffi/';
		
		pathExists(_tempPath).then(function (res) {
			if (!res) {
				shell.mkdir(_tempPath);
			}
		});
		
		let _configFile = process.env.PWD + '/.ciffisettings';
		
		if (fileExists.sync(_configFile)) {
			
			let _appConfig = require(_configFile);
			ASSETSPATHNAME = _appConfig.assetsPathName;
			//ASSETSBUNDLE = _appConfig.bundle || ASSETSBUNDLE;
			
		}
		
		let _tempFileJs = _tempPath + moduleName + '.js';
		let _resourceJs = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-' + ASSETSBUNDLE + '/resources/newmodule/module.js';
		let _projectModules = process.env.PWD + '/' + ASSETSPATHNAME + '/scripts/modules/';
		let _projectFileJs = process.env.PWD + '/' + ASSETSPATHNAME + '/scripts/modules/' + moduleName + '.js';
		
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
		let _capitalized = string.charAt(0).toUpperCase() + string.slice(1);
		let _stringArray = _capitalized.split('-');
		let _result = '';
		for (let i = 0; i < _stringArray.length; i++) {
			_result += _stringArray[i].charAt(0).toUpperCase() + _stringArray[i].slice(1)
		}
		return _result;
	}
	
	function replaceModuleName(file, moduleName, callback) {
		replace({
			files: [
				file
			],
			from: /@REPLACE__MODULENAME@/g,
			to: capitalizeFirstLetter(moduleName)
		}, function (error, changedFiles) {
			if (error) {
				return console.error('Error occurred:', error);
			}
			callback();
		});
	}
	
	function askForName(name, callback) {
		let _name = name;
		if (!_name) {
			inquirer.prompt({
				type: 'input',
				name: 'name',
				message: 'Specify module name',
				default: 'new-module',
				validate: function (res) {
					
					let done = this.async();
					
					setTimeout(function () {
						
						let _test = new RegExp(/^$|\s+|\w\s+|[\/]|^\.|\.$/);
						let _testResult = _test.test(res);
						
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