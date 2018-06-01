let chalk = require('chalk');
let fileExists = require('file-exists');
let exec = require('child_process').exec;
let Log = require('single-line-log').stdout;
let ConfigFile = process.env.PWD + '/.ciffisettings';

let Styles = (function (env) {
	
	let _CONFIG;
	
	function Styles() {
		
		if (fileExists.sync(ConfigFile)) {
			_CONFIG = require(ConfigFile);
			
			build();
		} else {
			console.log(chalk.red.bold('☠️  Project build failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
			return console.log('');
		}
		
	}
	
	function build() {
		let _assetPath = _CONFIG.assetsPath;
		let _assetPathName = _CONFIG.assetsPathName;
		let _concat = ' && ';
		let _autoprefixerConfig = _CONFIG.autoprefixer || 'last 12 versions';
		let _css = './node_modules/.bin/node-sass ' + _assetPathName + '/styles/main.scss ' + _assetPath + '/' + _CONFIG.stylesOutputName;
		let _autoprefixer = './node_modules/.bin/postcss --use autoprefixer --autoprefixer.browsers \'' + _autoprefixerConfig + '\' -o ' + _assetPath + '/' + _CONFIG.stylesOutputName + ' ' + _assetPath + '/' + _CONFIG.stylesOutputName;
		let _cleancss = './node_modules/.bin/cleancss -o ' + _assetPath + '/' + _CONFIG.stylesOutputName + ' ' + _assetPath + '/' + _CONFIG.stylesOutputName;
		let _styles = _css + _concat + _autoprefixer + _concat + _cleancss;
		let _process = exec(_styles);
		
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
	
	return new Styles();
});

module.exports = Styles;