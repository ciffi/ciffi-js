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

Object.keys(opts).forEach(function (key) {
	var legacyKey = key.replace(/[A-Z]/g, function (m) {
		return '-' + m.toLowerCase();
	});

	opts[legacyKey] = opts[key];
});

console.log('');
console.log('');
console.log('CiffiDesign Frontend Generator');
console.log('');
console.log('');
console.log('Comandi disponibili:');
console.log('');
console.log('- setup progetto');
console.log('');
console.log('ciffidesign:setup');
console.log('');
console.log('');
console.log(opts);
console.log(args);
console.log(cmd);