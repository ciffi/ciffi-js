#! /usr/bin/env node
'use strict';

var meow = require('meow');
var pkg = require('./package.json');

var cli = meow({
	pkg: pkg
});

var opts = cli.flags;
var args = cli.input;
var cmd = args[0];
var projectName = args[1];

Object.keys(opts).forEach(function (key) {
	var legacyKey = key.replace(/[A-Z]/g, function (m) {
		return '-' + m.toLowerCase();
	});

	opts[legacyKey] = opts[key];
});

if(!cmd) {
	console.log(opts);
	showDefaultMsg();
}else {
	switch(cmd) {
		case 'setup':
			var Setup = require('./command/setup');
			var newProject = new Setup({
				projectName: projectName
			});
			break;
		default:
			console.log('Comando non disponibile - ciffi -c per la lista dei comandi disponibili');
			break;
	}
}

function showDefaultMsg() {
	console.log('');
	console.log('');
	console.log('CiffiDesign Frontend Generator');
	console.log('');
	console.log('');
}

function showCommandListMsg() {
	console.log('');
	console.log('');
	console.log('CiffiDesign Frontend Generator');
	console.log('');
	console.log('');
	console.log('Comandi disponibili:');
	console.log('');
	console.log('- setup progetto');
	console.log('');
	console.log('ciffi setup projectName');
	console.log('');
	console.log('');
	console.log('- sviluppo locale progetto');
	console.log('');
	console.log('ciffi dev');
	console.log('');
	console.log('');
	console.log('- build progetto');
	console.log('');
	console.log('ciffi build');
	console.log('');
	console.log('');
}