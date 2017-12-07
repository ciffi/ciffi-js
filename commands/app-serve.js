let chalk = require('chalk');
let fileExists = require('file-exists');
let exec = require('child_process').exec;
let Log = require('single-line-log').stdout;
let ConfigFile = process.env.PWD + '/.ciffisettings';

let Serve = (function () {
	
	let _CONFIG;
	
	function Serve() {
		
		if (fileExists.sync(ConfigFile)) {
			_CONFIG = require(ConfigFile);
		} else {
			console.log(chalk.red.bold('☠️  Project serve failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
			return console.log('');
		}
		
		let _disabled = _CONFIG && _CONFIG.bundle && _CONFIG.bundle !== 'webpack';
		
		if (_disabled) {
			return console.log(chalk.red.bold('Sorry, but serve task is still not available'));
		}
		
		let _process = exec('./node_modules/.bin/webpack-dev-server --config serve.config.js --progress --inline --hot');
		
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