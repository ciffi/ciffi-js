var chalk = require('chalk');
var exec = require('child_process').exec;

var CheckUpdate = (function () {
	
	function CheckUpdate() {
		
	}
	
	CheckUpdate.prototype.check = function (callback) {
		var _processCurrentVersion = 'ciffi -v';
		var _processNewVersion = 'npm info ciffi version';
		var _currentVersion;
		var _newVersion;
		
		addProcessListeners(exec(_processCurrentVersion), function (res) {
			_currentVersion = res;
			addProcessListeners(exec(_processNewVersion), function (res) {
				_newVersion = res;
				
				checkUpdate(_currentVersion, _newVersion, callback);
			});
		});
	};
	
	CheckUpdate.prototype.update = function (callback) {
		
		var _process = 'npm i -g ciffi';
		
		addUpdateProcessListeners(exec(_process), callback);
	};
	
	function addProcessListeners(process, successCallback) {
		var _version;
		process.stdout.on('data', function (res) {
			_version = res;
		});
		
		process.stderr.on('data', function (res) {
			console.log(chalk.red('please contact ciffi - bad bad bad!!'));
			console.log(res);
		});
		
		process.on('close', function (res) {
			switch (res) {
				case 0 :
					successCallback(_version);
					break;
				case 1 :
					successCallback(_version);
					break;
				case 'null' :
					successCallback(_version);
					break;
				case null :
					successCallback(_version);
					break;
				default:
					console.log('exit -- ' + res);
			}
		});
	}
	
	function addUpdateProcessListeners(process, successCallback) {
		process.stdout.on('data', function (res) {
			console.log(res);
		});
		
		process.stderr.on('data', function (res) {
			console.log(chalk.red('please contact ciffi - bad bad bad!!'));
			console.log(res);
		});
		
		process.on('close', function (res) {
			switch (res) {
				case 0 :
					successCallback();
					break;
				case 1 :
					successCallback();
					break;
				case 'null' :
					successCallback();
					break;
				case null :
					successCallback();
					break;
				default:
					console.log('exit -- ' + res);
			}
		});
	}
	
	function checkUpdate(_currentVersion, _newVersion, callback) {
		var _current = _currentVersion.split('.');
		var _new = _newVersion.split('.');
		var _hasNewVersion = 0;
		
		for (var i = 0; i < _current.length; i++) {
			if (parseInt(_new[i]) > parseInt(_current[i])) {
				_hasNewVersion++;
			}
		}
		
		callback(_hasNewVersion > 0);
	}
	
	return new CheckUpdate();
	
})();

module.exports = CheckUpdate;