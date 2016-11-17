var chalk = require('chalk');
var prompt = require('prompt');
var replace = require('replace-in-file');
var emptydir = require('empty-dir');
var cliCursor = require('cli-cursor');
var shell = require('shelljs');

var AppSetup = (function () {
	
	'use strict';
	
	function AppSetup(config) {
		
		require('./tempApp');
		
		function replaceBuildPath(config, callback) {
			var _pathName = config.split('/')[config.split('/').length - 1];
			replace({
				files: [
					process.env.PWD + '/.ciffi/static/scripts/config/config.js',
					process.env.PWD + '/.ciffi/dev.config.js',
					process.env.PWD + '/.ciffi/build.config.js',
					process.env.PWD + '/.ciffi/package.json'
				],
				replace: /@REPLACE__ASSETS@/g,
				with: config
			}, function (error) {
				if (error) {
					return console.error('Error occurred:', error);
				}
				replace({
					files: [
						process.env.PWD + '/.ciffi/static/scripts/config/config.js',
						process.env.PWD + '/.ciffi/static/styles/config/_config.scss',
						process.env.PWD + '/.ciffi/package.json',
						process.env.PWD + '/.ciffi/serve.config.js',
						process.env.PWD + '/.ciffi/dev.config.js',
						process.env.PWD + '/.ciffi/build.config.js',
						process.env.PWD + '/.ciffi/package.json'
					],
					replace: /@REPLACE__ASSETS__NAME@/g,
					with: _pathName
				}, function (error) {
					if (error) {
						return console.error('Error occurred:', error);
					}
					callback();
				});
			});
		}
		
		function replaceConfig(config, callback) {
			replace({
				files: [
					process.env.PWD + '/.ciffi/static/scripts/config/config.js',
					process.env.PWD + '/.ciffi/dev.config.js'
				],
				replace: /@REPLACE__CONFIG@/g,
				with: config
			}, function (error) {
				if (error) {
					return console.error('Error occurred:', error);
				}
				callback();
			});
		}
		
		function filter(filepath) {
			return !/(^|\/)\.[^\/\.]/g.test(filepath);
		}
		
		emptydir(process.env.PWD + '/', filter, function (err, result) {
			if (err) {
				console.log(err);
			} else {
				if (result) {
					console.log('');
					console.log('');
					console.log(chalk.green.bold('-- CiffiDesign Frontend Generator --'));
					console.log('');
					
					prompt.start();
					
					prompt.get([{
						name: 'assetsUrl',
						default: '../static'
					}], function (err, res) {
						
						replaceBuildPath(res.assetsUrl, function () {
							
							cliCursor.hide();
							
							replaceConfig(config.projectName, function () {
								
								var _pathName = res.assetsUrl.split('/')[res.assetsUrl.split('/').length - 1];
								
								shell.mv(process.env.PWD + '/.ciffi/static/', process.env.PWD + '/.ciffi/' + _pathName + '/');
								
								require('./moveApp');
								
								console.log('');
								console.log(chalk.green.bold('-- new project ') + chalk.blue.bold(config.projectName) + chalk.green.bold(' created --'));
								console.log('');
								console.log(chalk.green.bold('-- start download and install npm dependencies --'));
								console.log('');
							});
						});
						
					});
					
				} else {
					console.log('');
					console.log('');
					console.log(chalk.green.bold('-- CiffiDesign Frontend Generator --'));
					console.log('');
					console.log(chalk.red.bold('Project setup failed:') + ' ' + chalk.blue('the path must be empty'));
					console.log('');
				}
			}
		});
		
	}
	
	return AppSetup;
})();

module.exports = AppSetup;