const chalk = require('chalk');
const fileExists = require('file-exists');
const exec = require('child_process').exec;
const Log = require('single-line-log').stdout;
const ConfigFile = process.env.PWD + '/.ciffisettings';

const emptyCallback = () => {
};

class Assets {
  
  constructor(callback = emptyCallback) {
    
    if (fileExists.sync(ConfigFile)) {
      this.config = require(ConfigFile);
    } else {
      console.error(chalk.red.bold('☠️  Project build failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
      return console.log('');
    }
    
    let process = exec(this.getAssets());
    
    process.stdout.on('data', (res) => {
      if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0) {
        console.log(chalk.red(res));
      } else {
        Log('🏗  ' + chalk.blue(res));
      }
    });
    
    process.stderr.on('data', (res) => {
      if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0) {
        console.log(chalk.red(res));
      } else {
        Log('🏗  ' + chalk.blue(res));
      }
    });
    
    process.on('close', (res) => {
      if (res === 0) {
        Log(chalk.blue('🏗  Assets copied in ') + ' ' + this.config.assetsPath + '/ ' + chalk.green.bold(' OK'));
        console.log('');
        callback();
      }
    });
    
  }
  
  getAssets() {
    const staticFolders = this.config.staticFolders;
    const assetPath = this.config.assetsPath;
    const assetPathName = this.config.assetsPathName;
    const pathsArray = staticFolders && staticFolders.length ? staticFolders : ['images', 'videos', 'pdf', 'fonts'];
    let temp = '';
    
    for (let i = 0; i < pathsArray.length; i++) {
      temp += '\'' + assetPathName + '/' + pathsArray[i] + '/**/*.*\' ';
    }
    
    return './node_modules/.bin/copyfiles -u 1 ' + temp + assetPath + '/';
  }
  
}

module.exports = Assets;