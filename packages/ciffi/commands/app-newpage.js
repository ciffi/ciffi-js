let chalk = require('chalk');
let shell = require('shelljs');
let fileExists = require('file-exists');
let inquirer = require('inquirer');
let pathExists = require('path-exists');
let replace = require('replace-in-file');
let NewPage = (function (modulePath) {
	
	let ASSETSPATHNAME = 'static';
	let ASSETSBUNDLE = 'webpack';
	
	function NewPage(config) {
		
		askForName(config.pageName, start);
	}
	
	function start(pageName) {
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
		
		let _fileName = pageName.split('/')[pageName.split('/').length - 1] + '.js';
		let _fullName = pageName + '.js';
		let _pathName = _fullName.replace(_fileName, '');
		let _tempFileJs = _tempPath + _fileName;
		let _resourceJs = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-' + ASSETSBUNDLE + '/resources/newpage/page.js';
		let _projectPagesJs = process.env.PWD + '/' + ASSETSPATHNAME + '/scripts/pages/' + _pathName;
		let _projectFileJs = _projectPagesJs + _fileName;
		
		if (fileExists.sync(_projectFileJs)) {
			console.log(chalk.red('☠️  File already exists: ' + _projectFileJs + ' ☠️'));
		} else {
			pathExists(_projectPagesJs).then(function (res) {
				
				if (!res) {
					shell.mkdir('-p', _projectPagesJs);
				}
				
				shell.cp('-rf', _resourceJs, _tempFileJs);
				replacePageName(_tempFileJs, pageName, function () {
					shell.cp('-rf', _tempFileJs, _projectFileJs);
					shell.rm('-rf', _tempFileJs);
					console.log(chalk.green('New file created: ' + _projectFileJs));
				});
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
	
	function replacePageName(file, pageName, callback) {
		replace({
			files: [
				file
			],
			from: /@REPLACE__PAGENAME@/g,
			to: capitalizeFirstLetter(pageName)
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
				message: 'Specify page name',
				default: 'page-name',
				validate: function (res) {
					
					let done = this.async();
					
					setTimeout(function () {
						
						let _test = new RegExp(/^$|\s+|\w\s+|[\/]|^\.|\.$/);
						let _testResult = _test.test(res);
						
						if (typeof res !== 'string' || _testResult) {
							done('☠️  Page must have real name ☠️');
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
	
	return NewPage;
	
});

module.exports = NewPage;