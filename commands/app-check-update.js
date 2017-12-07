let chalk = require('chalk');
let exec = require('child_process').exec;

let CheckUpdate = (function () {
	
	function CheckUpdate() {
		
	}
	
	CheckUpdate.prototype.check = function (callback) {
		let _processCurrentVersion = 'ciffi -v';
		let _processNewVersion = 'npm info ciffi version';
		let _currentVersion;
		let _newVersion;
		
		addProcessListeners(exec(_processCurrentVersion), function (res) {
			_currentVersion = res;
			addProcessListeners(exec(_processNewVersion), function (res) {
				_newVersion = res;
				
				checkUpdate(_currentVersion, _newVersion, callback);
			});
		});
	};
	
	CheckUpdate.prototype.update = function (callback) {
		
		let _process = 'npm i -g ciffi';
		
		addUpdateProcessListeners(exec(_process), callback);
	};
	
	function addProcessListeners(process, successCallback) {
		let _version;
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
		let _current = _currentVersion.split('.');
		let _new = _newVersion.split('.');
		let _hasNewVersion = 0;
		
		for (let i = 0; i < _current.length; i++) {
			if (parseInt(_new[i]) > parseInt(_current[i])) {
				_hasNewVersion++;
			}
		}
		
		callback(_hasNewVersion > 0);
	}
	
	return new CheckUpdate();
	
})();

module.exports = CheckUpdate;