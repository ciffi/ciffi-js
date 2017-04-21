var chalk = require('chalk');
var shell = require('shelljs');
var fileExists = require('file-exists');
var inquirer = require('inquirer');
var pathExists = require('path-exists');
var replace = require('replace-in-file');
var NewPage = (function (modulePath) {
	
	var ASSETSPATHNAME = 'static';
	var ASSETSBUNDLE = 'webpack';
	
	function NewPage(config) {
		
		askForName(config.pageName, start);
	}
	
	function start(pageName) {
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
			ASSETSBUNDLE = _appConfig.bundle || ASSETSBUNDLE;
			
		}
		
		var _tempFileJs = _tempPath + pageName + '.js';
		var _resourceJs = modulePath + '/lib/node_modules/ciffi/resources/' + ASSETSBUNDLE + '/newpage/page.js';
		var _projectPagesJs = process.env.PWD + '/' + ASSETSPATHNAME + '/scripts/pages/';
		var _projectFileJs = process.env.PWD + '/' + ASSETSPATHNAME + '/scripts/pages/' + pageName + '.js';
		
		if (fileExists(_projectFileJs)) {
			console.log(chalk.red('☠️  File already exists: ' + _projectFileJs + ' ☠️'));
		} else {
			pathExists(_projectPagesJs).then(function (res) {
				if (res) {
					shell.cp(_resourceJs, _tempFileJs);
					replacePageName(_tempFileJs, pageName, function () {
						shell.cp(_tempFileJs, _projectFileJs);
						shell.rm('-rf', _tempFileJs);
						console.log(chalk.green('New file created: ' + _projectFileJs));
					});
				} else {
					console.log(chalk.red('☠️  Pages path does not exists: ' + _projectModuless + ' ☠️'));
				}
			});
		}
		
		var _tempFileHtml = _tempPath + pageName + '.html';
		var _resourceHtml = modulePath + '/lib/node_modules/ciffi/resources/webpack/newpage/page.html';
		var _projectDevPath = process.env.PWD + '/' + ASSETSPATHNAME + '/';
		var _projectFileHtml = process.env.PWD + '/' + ASSETSPATHNAME + '/' + pageName + '.html';
		
		if (fileExists(_projectFileHtml)) {
			console.log(chalk.red('☠️  File already exists: ' + _projectFileHtml + ' ☠️'));
		} else {
			pathExists(_projectDevPath).then(function (res) {
				if (res) {
					shell.cp(_resourceHtml, _tempFileHtml);
					replacePageName(_tempFileHtml, pageName, function () {
						shell.cp(_tempFileHtml, _projectFileHtml);
						shell.rm('-rf', _tempFileHtml);
						console.log(chalk.green('New file created: ' + _projectFileHtml));
					});
				} else {
					console.log(chalk.red('☠️  Project dev does not exists: ' + _projectDevPath + ' ☠️'));
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
	
	function replacePageName(file, pageName, callback) {
		replace({
			files: [
				file
			],
			replace: /@REPLACE__PAGENAME@/g,
			with: capitalizeFirstLetter(pageName)
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
				message: 'Specify page name',
				default: 'page-name',
				validate: function (res) {
					
					var done = this.async();
					
					setTimeout(function () {
						
						var _test = new RegExp(/^$|\s+|\w\s+|[\/]|^\.|\.$/);
						var _testResult = _test.test(res);
						
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