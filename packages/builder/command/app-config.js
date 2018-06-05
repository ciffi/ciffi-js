let chalk = require('chalk');
let fileExists = require('file-exists');
let exec = require('child_process').exec;
let ConfigFile = process.env.PWD + '/.ciffisettings';

let Config = (function (env) {
  
  let _CONFIG;
  
  function Config() {
    
    if (fileExists.sync(ConfigFile)) {
      _CONFIG = require(ConfigFile);
    } else {
      console.log(chalk.red.bold('☠️  Project build failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
      return console.log('');
    }
    
    if (fileExists.sync(process.env.PWD + '/src/scripts/config/env/' + env + '.js')) {
      build();
    } else {
      console.log(chalk.red.bold('☠️  Project build failed:') + ' ' + chalk.blue('can\'t find src/scripts/config/env/' + env + '.js file ☠️'));
      return console.log('');
    }
    
  }
  
  function build() {
    let _assetPathName = _CONFIG.assetsPathName;
    let _createConfig = 'cp ' + _assetPathName + '/scripts/config/env/' + env + '.js ' + _assetPathName + '/scripts/config/config.js';
    
    exec(_createConfig);
    
    console.log('');
    console.log(chalk.blue('🦄 Generate config for ') + env + ' ' + chalk.green.bold(' OK'));
    console.log('');
    console.log('');
  }
  
  return new Config();
});

module.exports = Config;