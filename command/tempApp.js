var shell = require('shelljs');
var replace = require('replace-in-file');
var pathExists = require('path-exists');

var TempApp = (function (isNewVersion, modulePath, callback) {
	
	var _CONFIG = {
		isNewVersion: isNewVersion,
		callback: callback,
		frontendPath: 'webpack'
	};
	
	function TempApp() {
		var _modulePath = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-' + _CONFIG.frontendPath + '/frontend/*';
		var _tempPath = process.env.PWD + '/.ciffi/';
		
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