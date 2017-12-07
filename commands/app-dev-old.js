let chalk = require('chalk');
let exec = require('child_process').exec;
let Log = require('single-line-log').stdout;
let fileExists = require('file-exists');
let ConfigFile = process.env.PWD + '/.ciffisettings';
let npm = require('npm');

let Dev = (function () {
	
	let _CONFIG;
	
	function Dev() {
		
		if (fileExists.sync(ConfigFile)) {
			_CONFIG = require(ConfigFile);
			
			_CONFIG.stylesOutputName = _CONFIG.stylesOutputName ? _CONFIG.stylesOutputName : 'main.css';
			
			build();
		} else {
			console.log(chalk.red.bold('☠️  Project dev failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
			return console.log('');
		}
		
	}
	
	function build() {
		let _assetPath = _CONFIG.assetsPath;
		let _assetPathName = _CONFIG.assetsPathName;
		let _concat = ' && ';
		let _liveCssFirst = './node_modules/.bin/node-sass ' + _assetPathName + '/styles/main.scss ' + _assetPath + '/' + _CONFIG.stylesOutputName + ' --source-map true';
		let _assets = 'ciffi assets';
		let _liveServer = './node_modules/.bin/livereload ' + _assetPath;
		let _liveCss = './node_modules/.bin/node-sass ' + _assetPathName + '/styles/main.scss ' + _assetPath + '/' + _CONFIG.stylesOutputName + ' --watch --source-map true';
		let _liveJs = './node_modules/.bin/webpack --config dev.config.js --progress';
		let _processServer = exec(_liveCssFirst + _concat + _assets + _concat + _liveServer);
		let _processCss = exec(_liveCss);
		let _processJS = exec(_liveJs);
		
		logger([_processServer, _processCss, _processJS]);
	}
	
	function logger(processes) {
		for (let i = 0; i < processes.length; i++) {
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