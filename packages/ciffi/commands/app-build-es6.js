let chalk = require('chalk');
let fileExists = require('file-exists');
let exec = require('child_process').exec;
let Log = require('single-line-log').stdout;
let ConfigFile = process.env.PWD + '/.ciffisettings';

let Build = (function () {
	
	let _CONFIG;
	
	function Build() {
		
		if (fileExists.sync(ConfigFile)) {
			_CONFIG = require(ConfigFile);
		} else {
			console.log(chalk.red.bold('☠️  Project build failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
			return console.log('');
		}
		
		let _assetPath = _CONFIG.assetsPath;
		let _assetPathName = _CONFIG.assetsPathName;
		let _concat = ' && ';
		let _cleanDist = 'rm -rf ' + _assetPath + '/*';
		let _css = './node_modules/.bin/node-sass ' + _assetPathName + '/styles/main.scss ' + _assetPath + '/main.css';
		let _autoprefixer = './node_modules/.bin/postcss --use autoprefixer --autoprefixer.browsers \'last 12 versions\' -o ' + _assetPath + '/main.css ' + _assetPath + '/main.css';
		let _cleancss = './node_modules/.bin/cleancss -o ' + _assetPath + '/main.css ' + _assetPath + '/main.css'
		let _styles = _css + _concat + _autoprefixer + _concat + _cleancss;
		let _js = './node_modules/.bin/webpack --config build.config.js --progress';
		let _assets = 'ciffi assets';
		let _process = exec(_cleanDist + _concat + _styles + _concat + _js + _concat + _assets);
		
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