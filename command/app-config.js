var chalk = require('chalk');
var fileExists = require('file-exists');
var exec = require('child_process').exec;
var ConfigFile = process.env.PWD + '/.ciffisettings';

var Config = (function (env) {
	
	var _CONFIG;
	
	function Config() {
		
		if (fileExists.sync(ConfigFile)) {
			_CONFIG = require(ConfigFile);
		} else {
			console.log(chalk.red.bold('☠️  Config generation failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
			return console.log('');
		}
		
		if (fileExists.sync(process.env.PWD + '/src/scripts/config/env/' + env + '.js')) {
			build();
		} else {
			console.log(chalk.red.bold('☠️  Config generation failed:') + ' ' + chalk.blue('can\'t find src/scripts/config/env/' + env + '.js file ☠️'));
			return console.log('');
		}
		
	}
	
	function build() {
		var _assetPathName = _CONFIG.assetsPathName;
		var _createConfig = 'cp ' + _assetPathName + '/scripts/config/env/' + env + '.js ' + _assetPathName + '/scripts/config/config.js';
		
		exec(_createConfig);
		
		console.log('');
		console.log(chalk.blue('🦄 Generate config for ') + env + ' ' + chalk.green.bold(' OK'));
		console.log('');
		console.log('');
	}
	
	return new Config();
});

module.exports = Config;