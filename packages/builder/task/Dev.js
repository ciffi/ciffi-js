const chalk = require('chalk');
const spawnCommand = require('spawn-command')
const Log = require('single-line-log').stdout;
const fileExists = require('file-exists');
const ConfigFile = process.env.PWD + '/.ciffisettings';
const Notify = require('./Notify');
const Assets = require('./Assets');
const Config = require('./Config');

class Dev {
  
  
  constructor(withServer) {
    
    if (fileExists.sync(ConfigFile)) {
      this.config = require(ConfigFile);
      this.env = 'dev';
      this.withServer = withServer;
      this.init();
    } else {
      console.log(chalk.red.bold('☠️  Project dev failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
      Notify.sendError('☠️  Project dev failed: can\'t find .ciffisettings file ☠️');
      return console.log('');
    }
    
  }
  
  init() {
    const assetPath = this.config.assetsPath;
    const assetPathName = this.config.assetsPathName;
    const liveCssFirst = './node_modules/.bin/node-sass ' + assetPathName + '/styles/main.scss ' + assetPath + '/' + this.config.stylesOutputName + ' --source-map true';
    const liveServer = this.defineLiveServer();
    const liveCss = './node_modules/.bin/node-sass ' + assetPathName + '/styles/main.scss ' + assetPath + '/' + this.config.stylesOutputName + ' --watch --source-map true';
    const liveJs = './node_modules/.bin/webpack --config dev.config.js --progress';
    
    if (this.withServer) {
      require('@ciffi-js/dev-server');
    }
    
    new Config(this.env, () => {
      new Assets(() => {
        const processServer = spawnCommand(liveCssFirst + liveServer);
        const processCss = spawnCommand(liveCss);
        const processJS = spawnCommand(liveJs);
        
        this.logger([processServer, processCss, processJS]);
      });
    });
  }
  
  defineLiveServer() {
    const liveServerFeature = this.config.features[this.config.features.length - 1];
    
    switch (liveServerFeature) {
      case 'browsersync':
        return ' && ./node_modules/.bin/browser-sync start --config ' + this.config.serverConfig;
      case 'livereload':
        return ' && ./node_modules/.bin/livereload ' + this.config.assetsPath;
      default:
        return '';
    }
  }
  
  logger(processes) {
    for (let i = 0; i < processes.length; i++) {
      processes[i].stdout.on('data', (res) => {
        if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0 || res.indexOf('error ') >= 0) {
          console.log(chalk.red(res));
          Notify.sendObjError(res);
        } else {
          
          Log(chalk.blue(res));
          
          if (res.indexOf('Built at: ') >= 0) {
            Notify.sendReady('🏗 DEV ready - click to open');
          }
        }
      });
      
      processes[i].stderr.on('data', (res) => {
        if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0 || res.indexOf('error ') >= 0) {
          console.log(chalk.red(res));
          Notify.sendObjError(chalk(res));
        } else {
          Log(chalk.blue(res));
        }
      });
      
      processes[i].on('close', (res) => {
        if (res !== 0) {
          Log(chalk.green(res));
        }
      });
    }
  }
}

module.exports = Dev;