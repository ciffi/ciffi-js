const chalk = require('chalk');
const fileExists = require('file-exists');
const exec = require('child_process').exec;
const path = require('path');
const ConfigFile = path.join(process.cwd(), '.ciffisettings');

const emptyCallback = () => {
};

class Config {
  
  constructor(env, callback = emptyCallback) {
    
    if (fileExists.sync(ConfigFile)) {
      this.config = require(ConfigFile);
      this.env = env;
    } else {
      console.error(chalk.red.bold('☠️ Project build failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
      console.log('');
      return process.exit(1);
    }
    
    if (fileExists.sync(`${path.join(process.cwd(), 'src', 'scripts', 'config', 'env', this.env)}.js`)) {
      this.init(callback);
    } else {
      console.error(chalk.red.bold('☠️ Project build failed:') + ' ' + chalk.blue('can\'t find src/scripts/config/env/' + this.env + '.js file ☠️'));
      console.log('');
      return process.exit(1);
    }
  }
  
  init(callback) {
    const assetPathName = this.config.assetsPathName;
    const copyCommand = process.platform === 'win32' ? 'copy' : 'cp';
    const createConfig = `${copyCommand} ${path.join(assetPathName, 'scripts', 'config', 'env', this.env)}.js ${path.join(assetPathName, 'scripts', 'config', 'config')}.js`;
    
    exec(createConfig);
    
    console.log('');
    console.log(chalk.blue('🦄 Generate config for ') + this.env + ' ' + chalk.green.bold(' OK'));
    console.log('');
    console.log('');
    
    callback();
  }
}

module.exports = Config;
