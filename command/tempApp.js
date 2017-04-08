var shell = require('shelljs');
var replace = require('replace-in-file');
var pathExists = require('path-exists');

var TempApp = (function (isNewVersion, callback) {
	
	var _CONFIG = {
		isNewVersion: isNewVersion,
		callback: callback,
		frontendPath: isNewVersion ? 'webpack2' : 'webpack'
	};
	
	function TempApp() {
		var _modulePath = process.config.variables.node_prefix + '/lib/node_modules/ciffi/frontend/' + _CONFIG.frontendPath + '/*';
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