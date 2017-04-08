var chalk = require('chalk');
var fileExists = require('file-exists');
var exec = require('child_process').exec;
var Log = require('single-line-log').stdout;
var ConfigFile = process.env.PWD + '/.ciffisettings';

var Serve = (function () {
	
	var _CONFIG;
	
	function Serve() {
		
		if (fileExists(ConfigFile)) {
			_CONFIG = require(ConfigFile);
		} else {
			console.log(chalk.red.bold('☠️  Project serve failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
			return console.log('');
		}
		
		var _disabled = _CONFIG && _CONFIG.bundle === 'webpack2';
		
		if (_disabled) {
			return console.log(chalk.red.bold('Sorry, but serve task is still not available'));
		}
		
		var _process = exec('./node_modules/.bin/webpack-dev-server --config serve.config.js --progress --inline --hot');
		
		_process.stdout.on('data', function (res) {
			if (res.indexOf('ERROR in') >= 0) {
				Log(chalk.red(res));
			} else {
				Log(chalk.blue(res));
			}
		});
		
		_process.stderr.on('data', function (res) {
			if (res.indexOf('ERROR in') >= 0) {
				Log(chalk.red(res));
			} else {
				Log(chalk.blue(res));
			}
		});
		
		_process.on('close', function (res) {
			Log(chalk.green(res));
		});
	}
	
	return new Serve();
})();

module.exports = Serve;