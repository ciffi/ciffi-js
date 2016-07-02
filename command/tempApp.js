var shell = require('shelljs');

var TempApp = (function() {

	function TempApp() {
		var _modulePath = process.config.variables.node_prefix+'/lib/node_modules/ciffi/webpack/*';
		var _tempPath = process.config.variables.node_prefix+'/lib/node_modules/ciffi/tmp/';

		shell.cp('-R',_modulePath,_tempPath);
	}

	return new TempApp();
})();

module.exports = TempApp;