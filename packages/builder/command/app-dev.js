let chalk = require('chalk');
//let {spawn} = require('child_process');
const spawnCommand = require('spawn-command')
let Log = require('single-line-log').stdout;
let fileExists = require('file-exists');
let ConfigFile = process.env.PWD + '/.ciffisettings';
const Notify = require('./app-notify');

/*const numCPUs = require('os').cpus().length;
return console.log(numCPUs);*/

let Dev = (function () {
  
  let _CONFIG;
  
  function Dev() {
    
    if (fileExists.sync(ConfigFile)) {
      _CONFIG = require(ConfigFile);
    } else {
      Notify.sendError('☠️  Project dev failed: can\'t find .ciffisettings file ☠️');
      console.log(chalk.red.bold('☠️  Project dev failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
      return console.log('');
    }
    
    if (fileExists.sync(process.env.PWD + '/src/scripts/config/env/' + _CONFIG.defaultDevEnv + '.js')) {
      build();
    } else {
      Notify.sendError('☠️  Project dev failed: can\'t find src/scripts/config/env/dev' + _CONFIG.defaultDevEnv + '.js file ☠️');
      console.log(chalk.red.bold('☠️  Project dev failed:') + ' ' + chalk.blue('can\'t find src/scripts/config/env/dev' + _CONFIG.defaultDevEnv + '.js file ☠️'));
      return console.log('');
    }
    
  }
  
  function build() {
    let _assetPath = _CONFIG.assetsPath;
    let _assetPathName = _CONFIG.assetsPathName;
    let _concat = ' && ';
    let _createConfig = 'cp ' + _assetPathName + '/scripts/config/env/' + _CONFIG.defaultDevEnv + '.js ' + _assetPathName + '/scripts/config/config.js';
    let _liveCssFirst = './node_modules/.bin/node-sass ' + _assetPathName + '/styles/main.scss ' + _assetPath + '/' + _CONFIG.stylesOutputName + ' --source-map true';
    let _assets = 'ciffi assets';
    let _liveServer = './node_modules/.bin/livereload ' + _assetPath;
    
    if (_CONFIG.features[_CONFIG.features.length - 1] === 'browsersync') {
      _liveServer = './node_modules/.bin/browser-sync start --config ' + _CONFIG.serverConfig;
    }
    
    let _liveCss = './node_modules/.bin/node-sass ' + _assetPathName + '/styles/main.scss ' + _assetPath + '/' + _CONFIG.stylesOutputName + ' --watch --source-map true';
    let _liveJs = './node_modules/.bin/webpack --config dev.config.js --progress';
    let _processServer = spawnCommand(_createConfig + _concat + _liveCssFirst + _concat + _assets + _concat + _liveServer);
    let _processCss = spawnCommand(_liveCss);
    let _processJS = spawnCommand(_liveJs);
    
    logger([_processServer, _processCss, _processJS]);
  }
  
  function logger(processes) {
    for (let i = 0; i < processes.length; i++) {
      processes[i].stdout.on('data', function (res) {
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
      
      processes[i].stderr.on('data', function (res) {
        if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0 || res.indexOf('error ') >= 0) {
          Notify.sendObjError(chalk(res));
          console.log(chalk.red(res));
        } else {
          Log(chalk.blue(res));
        }
      });
      
      processes[i].on('close', function (res) {
        Log(chalk.green(res));
      });
    }
  }
  
  return new Dev();
})();

module.exports = Dev;