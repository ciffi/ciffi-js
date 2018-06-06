const chalk = require('chalk');
const spawnCommand = require('spawn-command')
const Log = require('single-line-log').stdout;
const fileExists = require('file-exists');
const ConfigFile = process.env.PWD + '/.ciffisettings';
const Notify = require('./Notify');
const Assets = require('./Assets');
const Config = require('./Config');

class Dev {
  
  
  constructor() {
    
    if (fileExists.sync(ConfigFile)) {
      this.config = require(ConfigFile);
      this.env = 'dev';
      this.init();
    } else {
      Notify.sendError('☠️  Project dev failed: can\'t find .ciffisettings file ☠️');
      console.log(chalk.red.bold('☠️  Project dev failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
      return console.log('');
    }
    
  }
  
  init() {
    const assetPath = this.config.assetsPath;
    const assetPathName = this.config.assetsPathName;
    const liveCssFirst = './node_modules/.bin/node-sass ' + assetPathName + '/styles/main.scss ' + assetPath + '/' + this.config.stylesOutputName + ' --source-map true';
    const liveServer = this.defineLiveServer();
    
    const liveCss = './node_modules/.bin/node-sass ' + assetPathName + '/styles/main.scss ' + assetPath + '/' + this.config.stylesOutputName + ' --watch --source-map true';
    const liveJs = './node_modules/.bin/webpack-dev-server --config dev.config.js --progress';
    
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
          Notify.sendObjError(res);
          console.log(chalk.red(res));
        } else {
          
          if (res.indexOf('Entrypoint main = main.js main.js.map') >= 0 || res.indexOf('Entrypoint main [big] = main.js main.js.map')) {
            Notify.sendReady('🏗 DEV ready - click to open');
          }
          
          Log(chalk.blue(res));
        }
      });
      
      processes[i].stderr.on('data', (res) => {
        if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0 || res.indexOf('error ') >= 0) {
          Notify.sendObjError(chalk(res));
          console.log(chalk.red(res));
        } else {
          Log(chalk.blue(res));
        }
      });
      
      processes[i].on('close', (res) => {
        Log(chalk.green(res));
      });
    }
  }
}

module.exports = Dev;