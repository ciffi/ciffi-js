let shell = require('shelljs');
let replace = require('replace-in-file');
let pathExists = require('path-exists');

let TempApp = (function (isNewVersion, modulePath, callback) {
	
	let _CONFIG = {
		isNewVersion: isNewVersion,
		callback: callback,
		frontendPath: 'webpack'
	};
	
	function TempApp() {
		let _modulePath = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-' + _CONFIG.frontendPath + '/frontend/*';
		let _tempPath = process.env.PWD + '/.ciffi/';
		
		pathExists(_tempPath).then(function (res) {
			if (!res) {
				shell.mkdir(_tempPath);
				shell.cp('-R', _modulePath, _tempPath);
			} else {
				shell.cp('-R', _modulePath, _tempPath);
			}
			
			_CONFIG.callback();
		});
	}
	
	return new TempApp();
});

module.exports = TempApp;