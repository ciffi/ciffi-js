let chalk = require('chalk');
let exec = require('child_process').exec;
let _package = require('../package');

module.exports = (function () {
	
	return new function CheckUpdate() {
		
		this.newVersion = 'latest';
		
		this.check = (callback) => {
			let _processNewVersion = 'npm info ' + _package.name + ' version';
			let _newVersion;
			
			addProcessListeners(exec(_processNewVersion), (res) => {
				_newVersion = res;
				this.newVersion = res;
				checkUpdate(_package.version, _newVersion, (hasNewVersion) => {
					if (hasNewVersion) {
						this.update(callback);
					} else {
						callback();
					}
				});
			});
		};
		
		this.update = (callback) => {
			
			let _process = exec('npm config get prefix');
			
			_process.stdout.on('data', (path) => {
				let _modulePath = path.trim() + '/lib/node_modules/ciffi';
				
				let _process = exec('cd ' + _modulePath + ' && npm i ' + _package.name + '@' + this.newVersion);
				addUpdateProcessListeners(_process, () => {
					callback({
						text: chalk.yellow('🤟 Frontend base project updated')
					});
				});
			});
		};
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
			// console.log(res);
		});
		
		process.stderr.on('data', function (res) {
			// console.log(chalk.red('please contact ciffi - bad bad bad!!'));
			// console.log(res);
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
	
})();