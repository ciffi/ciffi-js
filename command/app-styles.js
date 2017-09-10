var chalk = require('chalk');
var fileExists = require('file-exists');
var exec = require('child_process').exec;
var Log = require('single-line-log').stdout;
var ConfigFile = process.env.PWD + '/.ciffisettings';

var Styles = (function (env) {
	
	var _CONFIG;
	
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
		var _assetPath = _CONFIG.assetsPath;
		var _assetPathName = _CONFIG.assetsPathName;
		var _concat = ' && ';
		var _autoprefixerConfig = _CONFIG.autoprefixer || 'last 12 versions';
		var _css = './node_modules/.bin/node-sass ' + _assetPathName + '/styles/main.scss ' + _assetPath + '/' + _CONFIG.stylesOutputName;
		var _autoprefixer = './node_modules/.bin/postcss --use autoprefixer --autoprefixer.browsers \'' + _autoprefixerConfig + '\' -o ' + _assetPath + '/' + _CONFIG.stylesOutputName + ' ' + _assetPath + '/' + _CONFIG.stylesOutputName;
		var _cleancss = './node_modules/.bin/cleancss -o ' + _assetPath + '/' + _CONFIG.stylesOutputName + ' ' + _assetPath + '/' + _CONFIG.stylesOutputName;
		var _styles = _css + _concat + _autoprefixer + _concat + _cleancss;
		var _process = exec(_styles);
		
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