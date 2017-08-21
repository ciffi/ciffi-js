#! /usr/bin/env node
'use strict';

var meow = require('meow');
var chalk = require('chalk');
var pkg = require('./package.json');
var cliCursor = require('cli-cursor');
var Commands = require('./command/app-commands');
var exec = require('child_process').exec;
var fileExists = require('file-exists');
var ConfigFile = process.env.PWD + '/.ciffisettings';

var cli = meow({
	pkg: pkg
});

var opts = cli.flags;
var args = cli.input;
var cmd = args[0];
var projectName = args[1];

pkg = cli.pkg;

Object.keys(opts).forEach(function (key) {
	var legacyKey = key.replace(/[A-Z]/g, function (m) {
		return '-' + m.toLowerCase();
	});
	
	opts[legacyKey] = opts[key];
});

var _process = exec('npm config get prefix');

_process.stdout.on('data', function (path) {
	var _modulePath = path.trim();
	
	start(_modulePath);
});

function start(modulePath) {
	if (!cmd) {
		if (opts.h) {
			showCommandListMsg();
		} else if (opts.v) {
			console.log(chalk.magenta.bold(pkg.version));
		} else if (opts.a) {
			console.log(chalk.blue(pkg.author.name));
		} else if (opts.logo) {
			showLogo();
		} else if (opts.postsetup) {
			cliCursor.show();
			showGreetings();
		} else {
			showCommandErrorMessage();
		}
	} else {
		
		var _cmd = cmd;
		var _env = fileExists(ConfigFile) && require(ConfigFile).defaultBuildEnv ? require(ConfigFile).defaultBuildEnv : 'local';
		
		if (cmd.indexOf('build:') === 0) {
			_cmd = 'build';
			_env = cmd.split(':')[1];
		}
		
		switch (_cmd) {
			case 'setup':
				var Setup = require('./command/app-setup')(modulePath);
				new Setup({
					projectName: projectName
				});
				break;
			case 'update':
				require('./command/app-update');
				break;
			case 'serve':
				require('./command/app-serve');
				break;
			case 'dev':
				require('./command/app-dev');
				break;
			case 'build':
				require('./command/app-build')(_env);
				break;
			case 'build-es6':
				require('./command/app-build-es6');
				break;
			case 'build-prod':
				console.log(chalk.red.bold('Sorry, but build-prod task is still not available'));
				//require('./command/app-build-prod');
				break;
			case 'dev-old':
				require('./command/app-dev-old');
				break;
			case 'build-old':
				require('./command/app-build-prod');
				break;
			case 'dev-unit':
				console.log(chalk.red.bold('Sorry, but dev-unit task is still not available'));
				//require('./command/app-test').devUnit();
				break;
			case 'unit':
				console.log(chalk.red.bold('Sorry, but unit task is still not available'));
				//require('./command/app-test').unit();
				break;
			case 'e2e':
				var _args = false;
				if (args[1]) {
					_args = args;
				}
				require('./command/app-test').e2e(_args);
				break;
			case 'newpage':
				var Page = require('./command/app-newpage')(modulePath);
				new Page({
					pageName: projectName
				});
				break;
			case 'newmodule':
				var Module = require('./command/app-newmodule')(modulePath);
				new Module({
					moduleName: projectName
				});
				break;
			case 'newcomponent':
				var Component = require('./command/app-newcomponent')(modulePath);
				new Component({
					componentName: projectName
				});
				break;
			case 'jsdoc':
				require('./command/app-doc').jsdoc();
				break;
			case 'cssdoc':
				require('./command/app-doc').cssdoc();
				break;
			case 'styleguide':
				require('./command/app-doc').styleguide();
				break;
			case 'assets':
				require('./command/app-assets');
				break;
			case 'styles':
				require('./command/app-styles');
				break;
			default:
				showCommandErrorMessage();
				break;
		}
	}
}

function showCommandErrorMessage() {
	console.log('');
	console.log('');
	console.log(chalk.red.bold('Command not found'));
	console.log('');
	console.log(chalk.blue('ciffi -h') + chalk.green(' -- commands list --'));
	console.log('');
}

function showGreetings() {
	console.log('');
	console.log('');
	Commands.show();
	console.log(chalk.blue.bold(pkg.author.name) + chalk.blue.bold(' ^_^'));
	console.log('');
}

function showCommandListMsg() {
	console.log('');
	console.log('');
	console.log(chalk.green.bold('-- Ciffi Frontend Generator --'));
	console.log('');
	console.log('');
	console.log('Available commands:');
	console.log('');
	Commands.show();
	console.log('');
}

function showLogo() {
	console.log(chalk.black(''));
	console.log(chalk.black('           `-+shmNNNNNNmhy+:`           '));
	console.log(chalk.black('        .odNmmNNNNNNNNNNNNmmNdo-        '));
	console.log(chalk.black('      /dNmmNMMMMMMMMMMMMsmMMNmmNm+      '));
	console.log(chalk.black('    :mNmNMMMMMMm:NMMMMMM:NMMMMMNmNN/    '));
	console.log(chalk.black('   sMmNMMMMMMMMMm:NMMMMM-MMMMMMMMhmMh`  '));
	console.log(chalk.black('  hMdMhssymMMMMMMd:MMMMyoMMMMMNs+dMdNm` '));
	console.log(chalk.black(' yMdMMMMMNhsoyNMMMsoMMy+MMMMmoomMMMMdMd '));
	console.log(chalk.black(':MdMMMMMMMMMMNsosNM-NsoMmysosNMMMMMMMdM+'));
	console.log(chalk.black('hMdMMMMMMMMMMdos:-+:+-s::+sssssNMMMMMmMm'));
	console.log(chalk.black('mMmMMMMMMMMNy.dMdM:-mmooddohMMMMMMMMMMdM'));
	console.log(chalk.black('mMmMMMMMMMMNy.mMmM:-mmoodhohMMMMMMMMMMdM'));
	console.log(chalk.black('hMdMMMMMMMMMMdos:-/:+-o-:osssssNMMMMMmNm'));
	console.log(chalk.black(':MdMMMMMMMMMMNyosNM-NsoMmysoyMMMMMMMMdMo'));
	console.log(chalk.black(' yMdMMMMMNhsosmMMMyoMMy+MMMMmooNMMMMdNm '));
	console.log(chalk.black(' `dMdMhssydMMMMMMd:MMMMyoMMMMMNsodMmNm. '));
	console.log(chalk.black('   yMmNMMMMMMMMMm:NMMMMM-MMMMMMMMhmMh`  '));
	console.log(chalk.black('    :mNmNMMMMMMm:NMMMMMM:NMMMMMNmNN+    '));
	console.log(chalk.black('      /dNmmNMMMMMMMMMMMMsmMMNmmNm+`     '));
	console.log(chalk.black('        .odNmmNNNNNMMMNNNNmmNms-        '));
	console.log(chalk.black('           `:oydmNNNNNNmdyo:`           '));
	console.log(chalk.black(''));
}