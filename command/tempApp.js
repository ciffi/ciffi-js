var shell = require('shelljs');
var replace = require('replace-in-file');
var pathExists = require('path-exists');

var TempApp = (function() {

	function TempApp() {
		var _modulePath = process.config.variables.node_prefix+'/lib/node_modules/ciffi/webpack/*';
		var _tempPath = process.config.variables.node_prefix+'/lib/node_modules/ciffi/tmp/';

		pathExists(_tempPath).then(function(res) {
			if(!res) {
				shell.mkdir(_tempPath);
				shell.cp('-R',_modulePath,_tempPath);
			}else {
				shell.cp('-R',_modulePath,_tempPath);
			}
		});
	}

	return new TempApp();
})();

module.exports = TempApp;