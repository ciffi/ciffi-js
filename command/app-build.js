var chalk = require('chalk');
var fileExists = require('file-exists');
var exec = require('child_process').exec;
var Log = require('single-line-log').stdout;
var ConfigFile = process.env.PWD + '/.ciffisettings';

var Build = (function (env) {
	
	var _CONFIG;
	
	function Build() {
		
		if (fileExists(ConfigFile)) {
			_CONFIG = require(ConfigFile);
		} else {
			console.log(chalk.red.bold('☠️  Project build failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
			return console.log('');
		}
		
		if (fileExists(process.env.PWD + '/src/scripts/config/env/' + env + '.js')) {
			build();
		} else {
			console.log(chalk.red.bold('☠️  Project build failed:') + ' ' + chalk.blue('can\'t find src/scripts/config/env/' + env + '.js file ☠️'));
			return console.log('');
		}
		
	}
	
	function build() {
		var _assetPath = _CONFIG.assetsPath;
		var _assetPathName = _CONFIG.assetsPathName;
		var _concat = ' && ';
		var _createConfig = 'cp ' + _assetPathName + '/scripts/config/env/' + env + '.js ' + _assetPathName + '/scripts/config/config.js';
		var _cleanDist = 'rm -rf ' + _assetPath + '/*';
		var _css = './node_modules/.bin/node-sass ' + _assetPathName + '/styles/main.scss ' + _assetPath + '/' + _CONFIG.stylesOutputName;
		var _autoprefixer = './node_modules/.bin/postcss --use autoprefixer --autoprefixer.browsers \'last 12 versions\' -o ' + _assetPath + '/' + _CONFIG.stylesOutputName + ' ' + _assetPath + '/' + _CONFIG.stylesOutputName;
		var _cleancss = './node_modules/.bin/cleancss -o ' + _assetPath + '/' + _CONFIG.stylesOutputName + ' ' + _assetPath + '/' + _CONFIG.stylesOutputName;
		var _styles = _css + _concat + _autoprefixer + _concat + _cleancss;
		var _js = './node_modules/.bin/webpack --config build.config.js -p --progress';
		var _assets = 'ciffi assets';
		
		exec(_createConfig);
		
		console.log('');
		console.log(chalk.blue('🦄 Generate config for ') + env + ' ' + chalk.green.bold(' OK'));
		console.log('');
		console.log('');
		
		var _process = exec(_cleanDist + _concat + _styles + _concat + _js + _concat + _assets);
		
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
				Log(chalk.blue('🏗  Project build for ') + env + chalk.blue(' in ') + _assetPath + ' ' + chalk.green.bold(' OK'));
			}
			console.log('');
		});
	}
	
	return new Build();
});

module.exports = Build;