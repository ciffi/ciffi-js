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
		
		if (fileExists(process.env.PWD + '/src/scripts/config/env/' + _CONFIG.defaultDevEnv + '.js')) {
			build();
		} else {
			console.log(chalk.red.bold('☠️  Project dev failed:') + ' ' + chalk.blue('can\'t find src/scripts/config/env/dev' + _CONFIG.defaultDevEnv + '.js file ☠️'));
			return console.log('');
		}
		
	}
	
	function build() {
		var _assetPath = _CONFIG.assetsPath;
		var _assetPathName = _CONFIG.assetsPathName;
		var _concat = ' && ';
		var _createConfig = 'cp ' + _assetPathName + '/scripts/config/env/' + _CONFIG.defaultDevEnv + '.js ' + _assetPathName + '/scripts/config/config.js';
		var _liveCssFirst = './node_modules/.bin/node-sass ' + _assetPathName + '/styles/main.scss ' + _assetPath + '/' + _CONFIG.stylesOutputName + ' --source-map true';
		var _assets = 'ciffi assets';
		var _liveServer = './node_modules/.bin/livereload ' + _assetPath;
		var _liveCss = './node_modules/.bin/node-sass ' + _assetPathName + '/styles/main.scss ' + _assetPath + '/' + _CONFIG.stylesOutputName + ' --watch --source-map true';
		var _liveJs = './node_modules/.bin/webpack --config dev.config.js --progress';
		var _processServer = exec(_createConfig + _concat + _liveCssFirst + _concat + _assets + _concat + _liveServer);
		var _processCss = exec(_liveCss);
		var _processJS = exec(_liveJs);
		
		logger([_processServer, _processCss, _processJS]);
	}
	
	function logger(processes) {
		for (var i = 0; i < processes.length; i++) {
			processes[i].stdout.on('data', function (res) {
				if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0) {
					console.log(chalk.red(res));
				} else {
					Log(chalk.blue(res));
				}
			});
			
			processes[i].stderr.on('data', function (res) {
				if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0) {
					console.log(chalk.red(res));
				} else {
					Log(chalk.blue(res));
				}
			});
			
			processes[i].on('close', function (res) {
				Log(chalk.green(res));
			});
		}
	}
	
	return new Dev();
})();

module.exports = Dev;