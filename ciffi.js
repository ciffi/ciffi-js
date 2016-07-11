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
var pkg = cli.pkg;
var projectName = args[1];

Object.keys(opts).forEach(function (key) {
	var legacyKey = key.replace(/[A-Z]/g, function (m) {
		return '-' + m.toLowerCase();
	});

	opts[legacyKey] = opts[key];
});

if(!cmd) {
	if(opts.h) {
		showCommandListMsg();
	}else if(opts.v) {
		console.log(chalk.magenta.bold(pkg.version));
	}else if(opts.a) {
		console.log(chalk.blue(pkg.author.name));
	}else if(opts.logo) {
		showLogo();
	}else if(opts.postsetup) {
		console.log('');
		console.log(chalk.green.bold('-- fine installazione dipendenze --'));
		console.log('');
		console.log('');
		cliCursor.show();
		showGreetings();
	}else {
		showCommandErrorMessage();
	}
}else {
	switch(cmd) {
		case 'setup':
			cliCursor.hide();
			var Setup = require('./command/app-setup');
			var newProject = new Setup({
				projectName: projectName
			});
			break;
		case 'dev':
			require('./command/app-dev');
			break;
		case 'build':
			require('./command/app-build');
			break;
		case 'newpage':
			var Page = require('./command/app-newpage');
			var newPage = new Page({
				pageName: projectName
			});
			break;
		case 'newmodule':
			var Module = require('./command/app-newmodule');
			var newModule = new Module({
				moduleName: projectName
			});
			break;
		default:
			showCommandErrorMessage();
			break;
	}
}

function showCommandErrorMessage() {
	console.log('');
	console.log('');
	console.log(chalk.red.bold('Comando non disponibile'));
	console.log('');
	console.log(chalk.blue('ciffi -h')+chalk.green(' -- lista dei comandi disponibili --'));
	console.log('');
}

function showDefaultMsg() {
	console.log('');
	console.log('');
	console.log(chalk.green.bold('-- CiffiDesign Frontend Generator --'));
	console.log('');
	console.log(chalk.blue('ciffi -h')+chalk.green(' -- lista dei comandi disponibili --'));
	console.log('');
}

function showGreetings() {
  console.log('');
  console.log('');
  console.log(chalk.blue('ciffi dev')+chalk.green(' -- avvia lo sviluppo in locale --'));
  console.log('');
  console.log(chalk.blue('ciffi build')+chalk.green(' -- genera la build di local/stage/produzione --'));
  console.log('');
  console.log(chalk.blue('ciffi newpage nomepagina')+chalk.green(' -- genera una nuova pagina --'));
  console.log('');
  console.log(chalk.blue('ciffi newmodule nomemodulo')+chalk.green(' -- genera un nuovo modulo --'));
  console.log('');
  console.log(chalk.blue.bold(pkg.author.name)+chalk.blue.bold(' ^_^'));
  console.log('');
}

function showCommandListMsg() {
	console.log('');
	console.log('');
	console.log(chalk.green.bold('-- CiffiDesign Frontend Generator --'));
	console.log('');
	console.log('');
	console.log('Comandi disponibili:');
	console.log('');
	console.log(chalk.blue('ciffi setup nomeprogetto')+chalk.green(' -- genera un nuovo progetto --'));
	console.log('');
	console.log(chalk.blue('ciffi dev')+chalk.green(' -- avvia lo sviluppo in locale --'));
	console.log('');
	console.log(chalk.blue('ciffi build')+chalk.green(' -- genera la build di local/stage/produzione --'));
	console.log('');
	console.log(chalk.blue('ciffi newpage nomepagina')+chalk.green(' -- genera una nuova pagina --'));
	console.log('');
	console.log(chalk.blue('ciffi newmodule nomemodulo')+chalk.green(' -- genera un nuovo modulo --'));
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