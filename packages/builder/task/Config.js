const chalk = require('chalk');
const fileExists = require('file-exists');
const exec = require('child_process').exec;
const ConfigFile = process.env.PWD + '/.ciffisettings';

const emptyCallback = () => {};

class Config {
  
  constructor(env, callback = emptyCallback) {
    
    if (fileExists.sync(ConfigFile)) {
      this.config = require(ConfigFile);
    } else {
      console.error(chalk.red.bold('☠️  Project build failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
      return console.log('');
    }
    
    if (fileExists.sync(process.env.PWD + '/src/scripts/config/env/' + env + '.js')) {
      this.init(callback);
    } else {
      console.error(chalk.red.bold('☠️  Project build failed:') + ' ' + chalk.blue('can\'t find src/scripts/config/env/' + env + '.js file ☠️'));
      return console.log('');
    }
  }
  
  init(callback) {
    const assetPathName = this.config.assetsPathName;
    const createConfig = 'cp ' + assetPathName + '/scripts/config/env/' + env + '.js ' + assetPathName + '/scripts/config/config.js';
    
    exec(createConfig);
    
    console.log('');
    console.log(chalk.blue('🦄 Generate config for ') + env + ' ' + chalk.green.bold(' OK'));
    console.log('');
    console.log('');
  
    callback();
  }
}

module.exports = Config;