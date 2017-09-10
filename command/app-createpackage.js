var chalk = require('chalk');
var shell = require('shelljs');
var fileExists = require('file-exists');
var pathExists = require('path-exists');
var Loading = require('./loading');

var CreatePackage = (function (features, modulePath, callback) {
	
	function CreatePackage() {
		console.log('');
		
		Loading.start('Generate ' + chalk.blue('package.json'));
		
		yeah('package.json', features, function (wantRouter) {
			
			Loading.stop('Generate ' + chalk.blue('package.json') + chalk.green.bold(' OK'));
			
			callback(wantRouter);
			
		});
	}
	
	function generateFile(features, callback) {
		
		var _fileName = 'lite.json';
		var _features = features.join('+');
		var _wantRouter = true;
		
		if (_features.indexOf('router+') === 0) {
			_features = _features.replace('router+', '');
		} else if (_features.indexOf('router') === 0) {
			_features = _features.replace('router', '');
		} else {
			_wantRouter = false;
		}
		
		switch (_features) {
			case 'testing' :
				_fileName = 'testing.json';
				break;
			case 'styleguides' :
				_fileName = 'styleguides.json';
				addTestingDependencies();
				break;
			case 'testing+styleguides' :
				_fileName = 'full.json';
				addTestingDependencies();
				break;
			default:
				_fileName = 'lite.json'
		}
		
		callback(_fileName, _wantRouter);
	}
	
	function yeah(fileName, features, callback) {
		
		var _tempPath = process.env.PWD + '/.ciffi/';
		
		pathExists(_tempPath).then(function (res) {
			if (!res) {
				shell.mkdir(_tempPath);
			}
		});
		
		generateFile(features, function (generatedFile, wantRouter) {
			var _generatedFile = generatedFile;
			
			var _tempFile = _tempPath + fileName;
			var _resource = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-' + 'webpack' + '/resources/package/' + _generatedFile;
			var _projectRoot = process.env.PWD + '/';
			var _projectFile = process.env.PWD + '/' + fileName;
			
			shell.cp(_resource, _tempFile);
			
			if (fileExists.sync(_projectFile)) {
				console.log(chalk.red('File already exists: ' + _projectFile));
			} else {
				pathExists(_projectRoot).then(function (res) {
					if (res) {
						shell.cp(_tempFile, _projectFile);
						shell.rm('-rf', _tempFile);
						//shell.rm('-rf', _projectRoot + '/' + fileName);
						addRouterDependencies(wantRouter, function () {
							callback(wantRouter);
						});
					}
				});
			}
		});
		
	}
	
	function addTestingDependencies() {
		var _tempPath = process.env.PWD + '/.ciffi/';
		var _resource = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-webpack/resources/frontend/test/*';
		_destination = _tempPath + 'test/';
		
		shell.mkdir(_destination);
		shell.cp('-r', _resource, _destination);
	}
	
	function addRouterDependencies(wantRouter, callback) {
		var _tempPath = process.env.PWD + '/.ciffi/';
		var _resource = '';
		var _destination = '';
		var _mainJS = wantRouter ? 'main-router' : 'main';
		
		if (wantRouter) {
			// pages.js
			_resource = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-webpack/resources/frontend/scripts/config/pages.js';
			_destination = _tempPath + 'src/scripts/config/';
			
			shell.cp(_resource, _destination);
			
			//pages folder
			_resource = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-webpack/resources/frontend/scripts/pages/*';
			_destination = _tempPath + 'src/scripts/pages/';
			
			shell.mkdir(_destination);
			shell.cp('-r', _resource, _destination);
			
			//views folder
			_resource = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-webpack/resources/frontend/views/*';
			_destination = _tempPath + 'src/views/';
			
			shell.mkdir(_destination);
			shell.cp('-r', _resource, _destination);
			
		}
		
		//main.js
		_resource = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-webpack/resources/frontend/scripts/' + _mainJS + '.js';
		_destination = _tempPath + 'src/scripts/main.js';
		
		shell.cp(_resource, _destination);
		
		callback();
	}
	
	return new CreatePackage();
	
});

module.exports = CreatePackage;