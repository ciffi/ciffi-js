var chalk = require('chalk');
var fileExists = require('file-exists');
var exec = require('child_process').exec;
var Log = require('single-line-log').stdout;
var ConfigFile = process.env.PWD + '/.ciffisettings';

var Build = (function () {
	
	var _CONFIG;
	
	function Build() {
		
		if (fileExists(ConfigFile)) {
			_CONFIG = require(ConfigFile);
		} else {
			console.log(chalk.red.bold('☠️  Project build failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
			return console.log('');
		}
		
		var _assetPath = _CONFIG.assetsPath;
		var _assetPathName = _CONFIG.assetsPathName;
		var _concat = ' && ';
		var _cleanDist = 'rm -rf ' + _assetPath + '/*';
		var _css = './node_modules/node-sass/bin/node-sass ' + _assetPathName + '/styles/main.scss ' + _assetPath + '/main.css';
		var _js = './node_modules/webpack/bin/webpack.js --config build.config.js -p --progress';
		var _copyImages = './node_modules/copyfiles/copyfiles -u 1 \'' + _assetPathName + '/images/**/*.*\' ' + _assetPath + '/';
		var _copyFonts = './node_modules/copyfiles/copyfiles -u 1 \'' + _assetPathName + '/fonts/**/*.*\' ' + _assetPath + '/';
		var _copyPdf = './node_modules/copyfiles/copyfiles -u 1 \'' + _assetPathName + '/pdf/**/*.*\' ' + _assetPath + '/';
		var _copyVideos = './node_modules/copyfiles/copyfiles -u 1 \'' + _assetPathName + '/videos/**/*.*\' ' + _assetPath + '/';
		var _assets = _copyImages + _concat + _copyFonts + _concat + _copyPdf + _concat + _copyVideos;
		var _process = exec(_cleanDist + _concat + _css + _concat + _js + _concat + _assets);
		
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
				Log(chalk.blue('🏗  Project build') + ' ' + _assetPath + ' ' + chalk.green.bold(' OK'));
			}
			console.log('');
		});
		
	}
	
	return new Build();
})();

module.exports = Build;