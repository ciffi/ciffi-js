var chalk = require('chalk');
var Loading = require('./loading');
var exec = require('child_process').exec;

var AppDependencies = (function () {
	
	function AppDependencies() {
		
		this.download = function (callback) {
			addProcessListeners(exec('yarn'), callback, function () {
				console.log('👀 ' + chalk.blue(' try npm'));
				addProcessListeners(exec('npm install'), callback);
			});
		}
		
	}
	
	function addProcessListeners(process, successCallback, failCallback) {
		console.log('');
		Loading.start('Download and install ' + chalk.blue('dependencies'));
		var _processError;
		process.stdout.on('data', function (res) {
			if (res.indexOf('command not found') >= 0) {
				console.log(res);
			} else {
				//console.log(res);
			}
		});
		
		process.stderr.on('data', function (res) {
			if (res.indexOf('command not found') >= 0) {
				_processError = ' - ' + chalk.red.bold(res.split(': ')[1]) + chalk.red(' not found') + ' - ';
			} else {
				switch (res) {
					case ' ':
						break;
					default:
				}
			}
		});
		
		process.on('close', function (res) {
			switch (res) {
				case 0 :
					Loading.stop('Download and install ' + chalk.blue('dependencies') + chalk.green.bold(' OK'));
					console.log('');
					if (successCallback && typeof successCallback === 'function') {
						successCallback();
					}
					break;
				case 127 :
					var _error = _processError || 'yarn';
					Loading.stop('Download and install ' + chalk.blue('dependencies') + _error + chalk.red.bold(' FAIL'));
					console.log('');
					if (failCallback && typeof failCallback === 'function') {
						failCallback();
					}
					break;
				default:
					console.log('exit -- ' + res);
			}
		});
	}
	
	return new AppDependencies();
	
})();

module.exports = AppDependencies;