let chalk = require('chalk');
let shell = require('shelljs');
let fileExists = require('file-exists');
let inquirer = require('inquirer');
let pathExists = require('path-exists');
let replace = require('replace-in-file');
let NewComponent = (function (modulePath) {
	
	let ASSETSPATHNAME = 'static';
	let ASSETSBUNDLE = 'webpack';
	
	function NewComponent(config) {
		
		askForName(config.componentName, start);
	}
	
	function start(componentName) {
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
		
		let _tempFileJs = _tempPath + componentName + '.js';
		let _resourceJs = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-' + ASSETSBUNDLE + '/resources/newcomponent/component.js';
		let _projectComponents = process.env.PWD + '/' + ASSETSPATHNAME + '/scripts/components/';
		let _projectFileJs = process.env.PWD + '/' + ASSETSPATHNAME + '/scripts/components/' + componentName + '.js';
		
		if (fileExists.sync(_projectFileJs)) {
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
		let _capitalized = string.charAt(0).toUpperCase() + string.slice(1);
		let _stringArray = _capitalized.split('-');
		let _result = '';
		for (let i = 0; i < _stringArray.length; i++) {
			_result += _stringArray[i].charAt(0).toUpperCase() + _stringArray[i].slice(1)
		}
		return _result;
	}
	
	function replaceComponentName(file, componentName, callback) {
		replace({
			files: [
				file
			],
			from: /@REPLACE__COMPONENTNAME@/g,
			to: capitalizeFirstLetter(componentName)
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
				message: 'Specify component name',
				default: 'new-component',
				validate: function (res) {
					
					let done = this.async();
					
					setTimeout(function () {
						
						let _test = new RegExp(/^$|\s+|\w\s+|[\/]|^\.|\.$/);
						let _testResult = _test.test(res);
						
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