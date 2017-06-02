var chalk = require('chalk');
var Loading = require('./loading');
var exec = require('child_process').exec;

var AppDependencies = (function () {
	
	function AppDependencies() {
		
		this.download = function (callback) {
			addProcessListeners(exec('npm install'), callback);
			// addProcessListeners(exec('yarn'), callback, function () {
			// 	console.log('👀 ' + chalk.blue(' try npm'));
			//
			// });
		}
		
	}
	
	function addProcessListeners(process, successCallback, failCallback) {
		console.log('');
		Loading.start('Download and install ' + chalk.blue('dependencies'));
		var _processError;
		process.stdout.on('data', function (res) {
			if (res.indexOf('command not found') >= 0) {
				console.log(res);
			}
		});
		
		process.stderr.on('data', function (res) {
			switch (res) {
				case ' ':
					break;
				default:
					if (res.indexOf('command not found') >= 0) {
						_processError = ' - ' + chalk.red.bold(res.split(': ')[1]) + chalk.red(' not found') + ' - ';
					}
			}
		});
		
		process.on('close', function (res) {
			switch (res) {
				case 0 :
					onDownloadEnd(successCallback);
					break;
				case 1 :
					onDownloadEnd(successCallback);
					break;
				case 'null' :
					onDownloadEnd(successCallback);
					break;
				case null :
					onDownloadEnd(successCallback);
					break;
				case 127 :
					var _error = _processError || ' - ' + chalk.red.bold(' yarn') + chalk.red(' not found') + ' - ';
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
	
	function onDownloadEnd(successCallback) {
		Loading.stop('Download and install ' + chalk.blue('dependencies') + chalk.green.bold(' OK'));
		console.log('');
		if (successCallback && typeof successCallback === 'function') {
			successCallback();
		}
	}
	
	return new AppDependencies();
	
})();

module.exports = AppDependencies;