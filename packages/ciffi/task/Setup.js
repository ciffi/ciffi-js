const chalk = require('chalk');
const inquirer = require('inquirer');
const replace = require('replace-in-file');
const emptyDir = require('empty-dir');
const cliCursor = require('cli-cursor');
const shell = require('shelljs');
const exec = require('child_process').exec;
const CiffiJsWebpack = require('ciffi-js-webpack');
const Loading = require('../core/Loading');
const CheckUpdate = require('../core/CheckUpdate');

class Setup {
  
  constructor(config) {
    this.config = {
      ...config,
      ciffiSrc: '.ciffi/src',
      ciffiSrcName: 'src'
    };
    
    console.log('👀 ' + chalk.blue('looking for updates'));
    
    CheckUpdate.check((res) => {
      
      if (res) {
        console.log('');
        this.askForUpdate((res) => {
          if (res === 'no') {
            updateFrontendProject(() => init(config));
          } else {
            updateFrontendProject(() => {
              CheckUpdate.update(() => {
                init(config);
              });
            });
          }
        });
      } else {
        updateFrontendProject(() => {
          console.log('😎 ' + chalk.green('Latest version installed️'));
          init(config);
        });
      }
      
    });
  }
  
  askForUpdate(callback) {
    inquirer.prompt({
      type: 'list',
      name: 'wantUpdate',
      message: 'Update ciffi before setup?',
      default: 0,
      choices: ['yes', 'no']
    }).then(function (res) {
      callback(res.wantUpdate);
    });
  }
  
  
}

module.exports = Setup;

function init(config) {
  beforeStart(config, function (config) {
    
    askForBundle(function (features) {
      
      askForLiveReload(function (livereload) {
        
        askForBuildPath(function (buildPath) {
          
          let _isNewVersion = true;
          
          require('../core/TempApp')(_isNewVersion, modulePath, function () {
            
            config.bundle = 'webpack3';
            config.isNewVersion = _isNewVersion;
            config.features = features;
            config.livereload = livereload;
            
            start(config, buildPath);
            
          });
          
        });
      });
    });
    
  });
}

function askForBundle(callback) {
  inquirer.prompt({
    type: 'checkbox',
    name: 'features',
    message: 'What features do you want to include in this project?',
    default: false,
    choices: ['router', 'react', 'testing', 'styleguides']
  }).then(function (res) {
    callback(res.features);
  });
}

function askForLiveReload(callback) {
  inquirer.prompt({
    type: 'list',
    name: 'livereload',
    message: 'What file watcher do you want to include in this project?',
    default: 0,
    choices: ['browsersync', 'livereload']
  }).then(function (res) {
    callback(res.livereload);
  });
}

function askForProjectName(config, callback) {
  let _projectName = config.projectName;
  if (!_projectName) {
    inquirer.prompt({
      type: 'input',
      name: 'projectName',
      message: 'Specify project name',
      default: 'test',
      validate: function (res) {
        
        let done = this.async();
        
        setTimeout(function () {
          
          let _test = new RegExp(/^$|\s+|\w\s+|[\/]|^\.|\.$/);
          let _testResult = _test.test(res);
          
          if (typeof res !== 'string' || _testResult) {
            done('☠️  Project must have real name ☠️');
            return;
          }
          
          done(null, true);
          
        }, 10);
      }
    }).then(function (res) {
      callback(res);
    });
  } else {
    callback(config);
  }
}

function replaceBuildPath(config, isNewVersion, callback) {
  
  replace({
    files: [
      process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/config.js',
      process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/env/dev.js',
      process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/env/local.js',
      process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/env/stage.js',
      process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/env/prod.js',
      process.env.PWD + '/.ciffi/dev.config.js',
      process.env.PWD + '/.ciffi/build.config.js',
      process.env.PWD + '/.ciffi/package.json'
    ],
    from: /@REPLACE__ASSETS@/g,
    to: config
  }, function (error) {
    if (error) {
      return console.error('Error occurred:', error);
    }
    
    let _files = [
      process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/config.js',
      process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/env/dev.js',
      process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/env/local.js',
      process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/env/stage.js',
      process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/env/prod.js',
      process.env.PWD + '/.ciffi/dev.config.js',
      process.env.PWD + '/.ciffi/build.config.js',
      process.env.PWD + '/.ciffi/package.json'
    ];
    
    if (!isNewVersion) {
      _files.push(
        process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/styles.js',
        process.env.PWD + '/.ciffi/serve.config.js'
      )
    }
    replace({
      files: _files,
      from: /@REPLACE__ASSETS__NAME@/g,
      to: _CONFIG.ciffiSrcName
    }, function (error) {
      if (error) {
        return console.error('Error occurred:', error);
      }
      callback();
    });
  });
}

function replaceConfig(config, callback) {
  replace({
    files: [
      process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/config.js',
      process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/env/dev.js',
      process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/env/local.js',
      process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/env/stage.js',
      process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/env/prod.js',
      process.env.PWD + '/.ciffi/dev.config.js'
    ],
    from: /@REPLACE__CONFIG@/g,
    to: config
  }, function (error) {
    if (error) {
      return console.error('Error occurred:', error);
    }
    callback();
  });
}

function filter(filepath) {
  return !/(^|\/)\.[^\/\.]/g.test(filepath);
}

function start(config, res) {
  let _fixedAssetsUrl = res.buildPath;
  
  if (_fixedAssetsUrl.substring(_fixedAssetsUrl.length - 1, _fixedAssetsUrl.length) === '/') {
    _fixedAssetsUrl = _fixedAssetsUrl.substring(0, _fixedAssetsUrl.length - 1)
  }
  
  replaceBuildPath(_fixedAssetsUrl, config.isNewVersion, function () {
    
    cliCursor.hide();
    
    console.log('');
    
    Loading.start('Generate project tree for ' + chalk.blue(config.projectName));
    
    replaceConfig(config.projectName, function () {
      
      let _pathName = _fixedAssetsUrl.split('/')[_fixedAssetsUrl.split('/').length - 1];
      
      if (_pathName !== 'src') {
        shell.mv(process.env.PWD + '/' + _CONFIG.ciffiSrc + '/', process.env.PWD + '/.ciffi/' + _CONFIG.ciffiSrc + '/');
      }
      
      Loading.stop('Generate project tree for ' + chalk.blue(config.projectName) + chalk.green.bold(' OK'));
      
      require('../core/Createsettings')({
        projectName: config.projectName,
        assetsPath: _fixedAssetsUrl,
        pathName: _pathName,
        bundle: config.bundle,
        isNewVersion: config.isNewVersion,
        features: config.features,
        livereload: config.livereload
      }, modulePath, function () {
        require('../core/Createpackage')(config.features, config.livereload, modulePath, function (whatWant) {
          require('../core/Sethiddenfile')(config.isNewVersion, whatWant, modulePath);
          require('../core/MoveApp')(whatWant);
        });
      });
      
    });
  });
}

function askForBuildPath(callback) {
  
  inquirer.prompt({
    type: 'input',
    name: 'buildPath',
    message: 'Specify relative build path',
    default: '../static',
    validate: function (res) {
      
      let done = this.async();
      
      setTimeout(function () {
        
        let _test = new RegExp(/^(\.\.\/){1,}\w/);
        let _testResult = _test.test(res);
        
        if (typeof res !== 'string' || !_testResult) {
          done('☠️  Build path must be out of this project setup folder ☠️');
          return;
        }
        
        done(null, true);
        
      }, 10);
    }
  }).then(function (res) {
    callback(res);
  });
}

function testNpm5(callback) {
  let _process = exec('npm -v');
  let _result;
  _process.stdout.on('data', function (res) {
    _result = parseInt(res.split('.')[0]) >= 5;
  });
  
  _process.stderr.on('data', function () {
    _result = false;
  });
  
  _process.on('close', function () {
    if (_result) {
      callback(_result);
    } else {
      console.log(chalk.red.bold('☠️ Setup error: ') + chalk.red('npm@5.0.0 is required ☠️'));
      console.log(chalk.blue.bold('update with: ') + chalk.blue('npm install -g npm@latest'));
    }
  });
}

function beforeStart(config, callback) {
  
  testNpm5(function () {
    emptyDir(process.env.PWD + '/', filter, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        
        console.log('');
        console.log('');
        console.log(chalk.green.bold('-- Ciffi Frontend Generator --'));
        console.log('');
        
        if (result) {
          askForProjectName(config, function (config) {
            callback(config);
          });
          
        } else {
          console.log(chalk.red.bold('☠️  Project setup failed:') + ' ' + chalk.blue('the path must be empty ☠️'));
          console.log('');
        }
      }
    });
  });
  
}

function updateFrontendProject(callback) {
  CiffiJsWebpack.check((res) => {
    if (res && res.text) {
      console.log(res.text);
    }
    callback();
  });
}