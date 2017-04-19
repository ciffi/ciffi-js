var chalk = require('chalk');
var exec = require('child_process').exec;
var Log = require('single-line-log').stdout;
var fileExists = require('file-exists');
var ConfigFile = process.env.PWD + '/.ciffisettings';
var npm = require('npm');

var Dev = (function () {
	
	var _CONFIG;
	
	function Dev() {
		
		if (fileExists(ConfigFile)) {
			_CONFIG = require(ConfigFile);
		} else {
			console.log(chalk.red.bold('☠️  Project dev failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
			return console.log('');
		}
		
		var _assetPath = _CONFIG.assetsPath;
		var _assetPathName = _CONFIG.assetsPathName;
		var _concat = ' && ';
		var _space = ' ';
		var _liveCssFirst = './node_modules/node-sass/bin/node-sass ' + _assetPathName + '/styles/main.scss ' + _assetPath + '/main.css --source-map true';
		var _copyImages = './node_modules/copyfiles/copyfiles -u 1 \'' + _assetPathName + '/images/**/*.*\' ' + _assetPath + '/';
		var _copyFonts = './node_modules/copyfiles/copyfiles -u 1 \'' + _assetPathName + '/fonts/**/*.*\' ' + _assetPath + '/';
		var _copyPdf = './node_modules/copyfiles/copyfiles -u 1 \'' + _assetPathName + '/pdf/**/*.*\' ' + _assetPath + '/';
		var _copyVideos = './node_modules/copyfiles/copyfiles -u 1 \'' + _assetPathName + '/videos/**/*.*\' ' + _assetPath + '/';
		var _copyViews = './node_modules/copyfiles/copyfiles -u 1 \'' + _assetPathName + '/views/**/*.*\' ' + _assetPath + '/';
		var _assets = _copyImages + _concat + _copyFonts + _concat + _copyPdf + _concat + _copyVideos + _concat + _copyViews;
		var _liveServer = '\'./node_modules/livereload/bin/livereload.js \'' + _assetPath + '\'\'';
		var _liveCss = '\'./node_modules/node-sass/bin/node-sass ' + _assetPathName + '/styles/main.scss ' + _assetPath + '/main.css --watch --source-map true\'';
		var _liveJs = '\'./node_modules/webpack/bin/webpack.js --config dev.config.js --progress\'';
		var _concurrently = './node_modules/.bin/concurrently --kill-others ' + _liveServer + _space + _liveCss + _space + _liveJs;
		var _process = exec(_liveCssFirst + _concat + _assets + _concat + _concurrently);
		
		_process.stdout.on('data', function (res) {
			if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0) {
				console.log(chalk.red(res));
			} else {
				Log(chalk.blue(res));
			}
		});
		
		_process.stderr.on('data', function (res) {
			if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0) {
				console.log(chalk.red(res));
			} else {
				Log(chalk.blue(res));
			}
		});
		
		_process.on('close', function (res) {
			Log(chalk.green(res));
		});
		
	}
	
	return new Dev();
})();

module.exports = Dev;