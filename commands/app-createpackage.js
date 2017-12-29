let chalk = require('chalk');
let shell = require('shelljs');
let fileExists = require('file-exists');
let pathExists = require('path-exists');
let Loading = require('./loading');

let CreatePackage = (function (features, modulePath, callback) {
	
	function CreatePackage() {
		console.log('');
		
		Loading.start('Generate ' + chalk.blue('package.json'));
		
		yeah('package.json', features, function (whatWant) {
			
			Loading.stop('Generate ' + chalk.blue('package.json') + chalk.green.bold(' OK'));
			
			callback(whatWant);
			
		});
	}
	
	function generateFile(features, callback) {
		
		let _fileName = 'lite.json';
		let _features = features.join('+');
		let _wantRouter = false;
		let _wantReact = false;
		
		if (_features.indexOf('router+') === 0) {
			_features = _features.replace('router+', '');
			_wantRouter = true;
		} else if (_features.indexOf('router') === 0) {
			_features = _features.replace('router', '');
			_wantRouter = true;
		}
		
		if (_features.indexOf('react+') === 0) {
			_features = _features.replace('react+', '');
			_wantReact = true;
		} else if (_features.indexOf('react') === 0) {
			_features = _features.replace('react', '');
			_wantReact = true;
		}
		
		switch (_features) {
			case 'testing' :
				_fileName = 'testing.json';
				addTestingDependencies();
				break;
			case 'styleguides' :
				_fileName = 'styleguides.json';
				break;
			case 'testing+styleguides' :
				_fileName = 'full.json';
				addTestingDependencies();
				break;
			default:
				_fileName = 'lite.json'
		}
		
		callback(_fileName, {router: _wantRouter, react: _wantReact});
	}
	
	function yeah(fileName, features, callback) {
		
		let _tempPath = process.env.PWD + '/.ciffi/';
		
		pathExists(_tempPath).then(function (res) {
			if (!res) {
				shell.mkdir(_tempPath);
			}
		});
		
		generateFile(features, function (generatedFile, whatWant) {
			let _generatedFile = generatedFile;
			
			let _tempFile = _tempPath + fileName;
			let _resource = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-' + 'webpack' + '/resources/package/' + _generatedFile;
			let _projectRoot = process.env.PWD + '/';
			let _projectFile = process.env.PWD + '/' + fileName;
			
			shell.cp(_resource, _tempFile);
			
			if (fileExists.sync(_projectFile)) {
				console.log(chalk.red('File already exists: ' + _projectFile));
			} else {
				pathExists(_projectRoot).then(function (res) {
					if (res) {
						shell.cp(_tempFile, _projectFile);
						shell.rm('-rf', _tempFile);
						//shell.rm('-rf', _projectRoot + '/' + fileName);
						addRouterDependencies(whatWant.router, function () {
							
							addReactDependencies(whatWant.react, function () {
								
								generateMain(whatWant, function () {
									callback(whatWant);
								});
								
							});
							
						});
					}
				});
			}
		});
		
	}
	
	function addTestingDependencies() {
		let _tempPath = process.env.PWD + '/.ciffi/';
		let _resource = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-webpack/resources/frontend/test/*';
		_destination = _tempPath + 'test/';
		
		shell.mkdir(_destination);
		shell.cp('-r', _resource, _destination);
	}
	
	function addRouterDependencies(wantRouter, callback) {
		let _tempPath = process.env.PWD + '/.ciffi/';
		let _resource = '';
		let _destination = '';
		
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
		
		callback();
	}
	
	function addReactDependencies(wantReact, callback) {
		let _tempPath = process.env.PWD + '/.ciffi/';
		let _resource = '';
		let _destination = '';
		
		if (wantReact) {
			//pages folder
			_resource = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-webpack/resources/react/*';
			_destination = _tempPath + 'src/scripts/components/';
			
			shell.mkdir(_destination);
			shell.cp('-r', _resource, _destination);
			
		}
		
		callback();
	}
	
	function generateMain(whatWant, callback) {
		let _tempPath = process.env.PWD + '/.ciffi/';
		let _resource;
		let _destination;
		let _mainJS = 'main';
		
		if (whatWant.router) {
			_mainJS += '-router';
		}
		
		if (whatWant.react) {
			_mainJS += '-react';
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