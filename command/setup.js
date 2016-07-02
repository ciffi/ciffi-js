#! /usr/bin/env node
var shell = require('shelljs');

var _modulePath = process.config.variables.node_prefix+'/lib/node_modules/ciffi/webpack/*';
var _projectPath = process.env.PWD+'/';

shell.cp('-R',_modulePath,_projectPath);

var npm = require('npm');
npm.load(function(err) {

  npm.commands.run(['setup'], function(er, data) {
    
  });

  npm.on('log', function(message) {
    console.log(message);
  });

});