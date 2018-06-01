let chalk = require('chalk');
let fileExists = require('file-exists');
let exec = require('child_process').exec;
let Log = require('single-line-log').stdout;
let ConfigFile = process.env.PWD + '/.ciffisettings';

let Assets = (function () {
	
	let _CONFIG;
	
	function Assets() {
		
		if (fileExists.sync(ConfigFile)) {
			_CONFIG = require(ConfigFile);
		} else {
			console.log(chalk.red.bold('☠️  Project build failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
			return console.log('');
		}
		
		let _process = exec(getAssets());
		
		_process.stdout.on('data', function (res) {
			if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0) {
				console.log(chalk.red(res));
			} else {
				Log('🏗  ' + chalk.blue(res));
			}
		});
		
		_process.stderr.on('data', function (res) {
			if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0) {
				console.log(chalk.red(res));
			} else {
				Log('🏗  ' + chalk.blue(res));
			}
		});
		
		_process.on('close', function (res) {
			if (res === 0) {
				Log(chalk.blue('🏗  Assets copied in ') + ' ' + _CONFIG.assetsPath + '/ ' + chalk.green.bold(' OK'));
			}
			console.log('');
		});
		
		function getAssets() {
			let _staticFolders = _CONFIG.staticFolders;
			let _assetPath = _CONFIG.assetsPath;
			let _assetPathName = _CONFIG.assetsPathName;
			let _pathsArray = _staticFolders && _staticFolders.length ? _staticFolders : ['images', 'videos', 'pdf', 'fonts'];
			let _temp = '';
			let _results = '';
			
			for (let i = 0; i < _pathsArray.length; i++) {
				_temp += '\'' + _assetPathName + '/' + _pathsArray[i] + '/**/*.*\' ';
			}
			
			_results = './node_modules/.bin/copyfiles -u 1 ' + _temp + _assetPath + '/';
			
			return _results;
		}
		
	}
	
	return new Assets();
})();

module.exports = Assets;