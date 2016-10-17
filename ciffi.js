#! /usr/bin/env node
'use strict';

var meow = require('meow');
var chalk = require('chalk');
var pkg = require('./package.json');
var cliCursor = require('cli-cursor');

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
		console.log('');
		console.log(chalk.green.bold('-- end download and install npm dependencies --'));
		console.log('');
		console.log('');
		require('./command/app-sethiddenfile');
		console.log('');
		console.log('');
		cliCursor.show();
		showGreetings();
	} else {
		showCommandErrorMessage();
	}
} else {
	switch (cmd) {
		case 'setup':
			var Setup = require('./command/app-setup');
			new Setup({
				projectName: projectName
			});
			break;
		case 'serve':
			require('./command/app-serve');
			break;
		case 'dev':
			require('./command/app-dev');
			break;
		case 'build':
			require('./command/app-build');
			break;
		case 'unit':
			require('./command/app-test').unit();
			break;
		case 'e2e':
			var _args = false;
			if (args[1]) {
				_args = args;
			}
			require('./command/app-test').e2e(_args);
			break;
		case 'newpage':
			var Page = require('./command/app-newpage');
			new Page({
				pageName: projectName
			});
			break;
		case 'newmodule':
			var Module = require('./command/app-newmodule');
			new Module({
				moduleName: projectName
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
		default:
			showCommandErrorMessage();
			break;
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
	console.log(chalk.blue('ciffi serve') + chalk.green(' -- start webpack local server css/js --'));
	console.log('');
	console.log(chalk.blue('ciffi dev') + chalk.green(' -- start livereload server and generate local build with watch --'));
	console.log('');
	console.log(chalk.blue('ciffi build') + chalk.green(' -- generate build --'));
	console.log('');
	console.log(chalk.blue('ciffi unit') + chalk.green(' -- start local unit test development with karma and cucumber --'));
	console.log('');
	console.log(chalk.blue('ciffi e2e') + chalk.green(' -- e2e test with nightwatch and cucumber (default configuration) --'));
	console.log('');
	console.log(chalk.blue('ciffi e2e chrome //default, chrome or firefox') + chalk.green(' -- e2e test with nightwatch and cucumber (custom configuration) --'));
	console.log('');
	console.log(chalk.blue('ciffi newpage pagename') + chalk.green(' -- create new html and js page --'));
	console.log('');
	console.log(chalk.blue('ciffi newmodule modulename') + chalk.green(' -- create new js module --'));
	console.log('');
	console.log(chalk.blue('ciffi jsdoc') + chalk.green(' -- generate javascript documentation with jsdoc into ./jsdoc path --'));
	console.log('');
	console.log(chalk.blue.bold(pkg.author.name) + chalk.blue.bold(' ^_^'));
	console.log('');
}

function showCommandListMsg() {
	console.log('');
	console.log('');
	console.log(chalk.green.bold('-- CiffiDesign Frontend Generator --'));
	console.log('');
	console.log('');
	console.log('Available commands:');
	console.log('');
	console.log(chalk.blue('ciffi setup projectname') + chalk.green(' -- create a new project --'));
	console.log('');
	console.log(chalk.blue('ciffi serve') + chalk.green(' -- start webpack local server css/js --'));
	console.log('');
	console.log(chalk.blue('ciffi dev') + chalk.green(' -- start livereload server and generate local build with watch --'));
	console.log('');
	console.log(chalk.blue('ciffi build') + chalk.green(' -- generate build --'));
	console.log('');
	console.log(chalk.blue('ciffi unit') + chalk.green(' -- start local unit test development with karma and cucumber --'));
	console.log('');
	console.log(chalk.blue('ciffi e2e') + chalk.green(' -- e2e test with nightwatch and cucumber (default configuration) --'));
	console.log('');
	console.log(chalk.blue('ciffi e2e chrome //default, chrome or firefox') + chalk.green(' -- e2e test with nightwatch and cucumber (custom configuration) --'));
	console.log('');
	console.log(chalk.blue('ciffi newpage pagename') + chalk.green(' -- create new html and js page --'));
	console.log('');
	console.log(chalk.blue('ciffi newmodule modulename') + chalk.green(' -- create new js module --'));
	console.log('');
	console.log(chalk.blue('ciffi jsdoc') + chalk.green(' -- generate javascript documentation with jsdoc into ./jsdoc path --'));
	console.log('');
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