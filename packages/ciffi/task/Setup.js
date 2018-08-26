const chalk = require('chalk');
const inquirer = require('inquirer');
const replace = require('replace-in-file');
const emptyDir = require('empty-dir');
const cliCursor = require('cli-cursor');
const CiffiJsWebpack = require('ciffi-js-webpack');
const Loading = require('../core/Loading');
const CheckUpdate = require('../core/CheckUpdate');
const ProcessManager = require('../core/ProcessManager');
const TempApp = require('../core/TempApp');
const CreateSettings = require('../core/CreateSettings');
const CreatePackage = require('../core/CreatePackage');
const CreateHiddenFiles = require('../core/CreateHiddenFiles');
const CreateSSL = require('../core/CreateSSL');
const MoveApp = require('../core/MoveApp');
const Dependencies = require('../core/Dependencies');
const { showGreetings, showUpdate } = require('../core/Messages');

class Setup {
  constructor(config) {
    this.config = {
      ...config,
      ciffiSrc: '.ciffi/src',
      ciffiSrcName: 'src'
    };
    
    this.init();
  }
  
  init() {
    this.checkUpdates(() => {
      this.beforeStart(({ buildPath, features, livereload, https, bundler }) => {
        this.config.features = features;
        this.config.livereload = livereload;
        this.config.buildPath = buildPath;
        this.config.https = https;
        this.config.bundler = bundler;
        
        new TempApp(this.config.modulePath, () => {
          this.start();
        });
      });
    });
  }
  
  checkUpdates(callback) {
    const updateChecker = new CheckUpdate((hasUpdate, oldVersion, newVersion) => {
      if (hasUpdate) {
        showUpdate(oldVersion, newVersion);
        //console.log('🚀 ' + chalk.green('New version found'));
        console.log();
        
        /*updateChecker.update(() => {
          console.log('😎 ' + chalk.green('Latest version installed'));
          console.log('🦄 ' + chalk.yellow('Restart setup task'));
          console.log();
        });*/
      } else {
        console.log('😎 ' + chalk.green('Latest version installed'));
        console.log();
        callback();
      }
    });
  }
  
  askForUpdate(callback) {
    if (this.config.silent) {
      return callback(true);
    }
    
    console.log('');
    inquirer
      .prompt({
        type: 'list',
        name: 'wantUpdate',
        message: 'Update ciffi before setup?',
        default: 0,
        choices: ['yes', 'no']
      })
      .then(res => {
        callback(res.wantUpdate === 'yes');
      });
  }
  
  askForSSL(callback) {
    if (this.config.silent) {
      return callback(false);
    }
    
    console.log('');
    inquirer
      .prompt({
        type: 'list',
        name: 'wantHTTPS',
        message: 'Want HTTPS?',
        default: 0,
        choices: ['yes', 'no']
      })
      .then(res => {
        callback(res.wantHTTPS === 'yes');
      });
  }
  
  askForBundler(callback) {
    if (this.config.silent) {
      return callback('parcel');
    }
    inquirer
      .prompt({
        type: 'list',
        name: 'bundler',
        message: 'What bundler do you want to use for this project?',
        default: 0,
        choices: ['webpack', 'parcel']
      })
      .then(res => {
        callback(res.bundler);
      });
  }
  
  askForLiveReload(callback) {
    if (this.config.silent) {
      return callback('none');
    }
    
    inquirer
      .prompt({
        type: 'list',
        name: 'livereload',
        message: 'What file watcher do you want to include in this project?',
        default: 2,
        choices: ['none', 'livereload']
      })
      .then(res => {
        callback(res.livereload);
      });
  }
  
  askForProjectName(callback) {
    if (this.config.silent) {
      this.config.projectName = 'test';
      return callback();
    }
    
    const projectName = this.config.projectName;
    if (!projectName) {
      inquirer
        .prompt({
          type: 'input',
          name: 'projectName',
          message: 'Specify project name',
          default: 'test',
          validate: function (res) {
            const done = this.async();
            
            setTimeout(() => {
              const test = new RegExp(/^$|\s+|\w\s+|[\/]|^\.|\.$/);
              const testResult = test.test(res);
              
              if (typeof res !== 'string' || testResult) {
                done('☠️  Project must have real name ☠️');
                return;
              }
              
              done(null, true);
            }, 10);
          }
        })
        .then(res => {
          this.config.projectName = res.projectName;
          callback();
        });
    } else {
      callback();
    }
  }
  
  replaceBuildPath(newString, callback) {
    const files = [
      process.env.PWD +
      '/' +
      this.config.ciffiSrc +
      '/scripts/config/config.js',
      process.env.PWD +
      '/' +
      this.config.ciffiSrc +
      '/scripts/config/env/dev.js',
      process.env.PWD +
      '/' +
      this.config.ciffiSrc +
      '/scripts/config/env/local.js',
      process.env.PWD +
      '/' +
      this.config.ciffiSrc +
      '/scripts/config/env/stage.js',
      process.env.PWD +
      '/' +
      this.config.ciffiSrc +
      '/scripts/config/env/prod.js',
      process.env.PWD + '/.ciffi/package.json'
    ];
    
    replace(
      {
        files,
        from: /@REPLACE__ASSETS@/g,
        to: newString
      },
      error => {
        if (error) {
          return console.error('Error occurred:', error);
        }
        
        replace(
          {
            files,
            from: /@REPLACE__ASSETS__NAME@/g,
            to: this.config.ciffiSrcName
          },
          error => {
            if (error) {
              return console.error('Error occurred:', error);
            }
            callback();
          }
        );
      }
    );
  }
  
  replaceConfig(newString, callback) {
    replace(
      {
        files: [
          process.env.PWD +
          '/' +
          this.config.ciffiSrc +
          '/scripts/config/config.js',
          process.env.PWD +
          '/' +
          this.config.ciffiSrc +
          '/scripts/config/env/dev.js',
          process.env.PWD +
          '/' +
          this.config.ciffiSrc +
          '/scripts/config/env/local.js',
          process.env.PWD +
          '/' +
          this.config.ciffiSrc +
          '/scripts/config/env/stage.js',
          process.env.PWD +
          '/' +
          this.config.ciffiSrc +
          '/scripts/config/env/prod.js'
        ],
        from: /@REPLACE__CONFIG@/g,
        to: newString
      },
      error => {
        if (error) {
          return console.error('Error occurred:', error);
        }
        callback();
      }
    );
  }
  
  filter(filepath) {
    return !/(^|\/)\.[^\/\.]/g.test(filepath);
  }
  
  start() {
    let fixedAssetsUrl = this.config.buildPath;
    
    if (
      fixedAssetsUrl.substring(
        fixedAssetsUrl.length - 1,
        fixedAssetsUrl.length
      ) === '/'
    ) {
      fixedAssetsUrl = fixedAssetsUrl.substring(0, fixedAssetsUrl.length - 1);
    }
    
    this.replaceBuildPath(fixedAssetsUrl, () => {
      cliCursor.hide();
      
      console.log('');
      
      Loading.start(
        'Generate project tree for ' + chalk.blue(this.config.projectName)
      );
      
      this.replaceConfig(this.config.projectName, () => {
        const pathName = fixedAssetsUrl.split('/')[
        fixedAssetsUrl.split('/').length - 1
          ];
        
        if (pathName !== 'src') {
          new ProcessManager({
            process: `${process.env.PWD}/${this.config.ciffiSrc}/, ${
              process.env.PWD
              }/.ciffi/${this.config.ciffiSrc}/`
          });
        }
        
        Loading.stop(
          'Generate project tree for ' +
          chalk.blue(this.config.projectName) +
          chalk.green.bold(' OK')
        );
        
        new CreateSettings(
          {
            projectName: this.config.projectName,
            assetsPath: fixedAssetsUrl,
            pathName: pathName,
            https: this.config.https,
            features: this.config.features,
            bundler: this.config.bundler,
            livereload: this.config.livereload,
            modulePath: this.config.modulePath
          },
          () => {
            new CreatePackage(this.config, () => {
              new CreateHiddenFiles(this.config, () => {
                new CreateSSL(this.config, () => {
                  new MoveApp(() => {
                    new Dependencies(this.config, () => {
                      showGreetings();
                    });
                  });
                });
              });
            });
          }
        );
      });
    });
  }
  
  askForBuildPath(callback) {
    if (this.config.silent) {
      return callback('../static');
    }
    
    inquirer
      .prompt({
        type: 'input',
        name: 'buildPath',
        message: 'Specify relative build path',
        default: '../static',
        validate: function (res) {
          const done = this.async();
          
          setTimeout(() => {
            const test = new RegExp(/^(\.\.\/){1,}\w/);
            const testResult = test.test(res);
            
            if (typeof res !== 'string' || !testResult) {
              done(
                '☠️  Build path must be out of this project setup folder ☠️'
              );
              return;
            }
            
            done(null, true);
          }, 10);
        }
      })
      .then(res => {
        callback(res.buildPath);
      });
  }
  
  testNpm5(callback) {
    let version;
    new ProcessManager({
      process: 'npm -v',
      onMessage: res => {
        version = parseInt(res.split('.')[0]) >= 5;
      },
      onError: () => {
        version = false;
      },
      onClose: () => {
        if (version) {
          callback();
        } else {
          console.log(
            chalk.red.bold('☠️ Setup error: ') +
            chalk.red('npm@5.0.0 is required ☠️')
          );
          console.log(
            chalk.blue.bold('update with: ') +
            chalk.blue('npm install -g npm@latest')
          );
        }
      }
    });
  }
  
  beforeStart(callback) {
    this.testNpm5(() => {
      emptyDir(process.env.PWD + '/', this.filter, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log('');
          console.log('');
          console.log(chalk.green.bold('-- Ciffi Frontend Generator --'));
          console.log('');
          
          if (result) {
            this.askForProjectName(() => {
              this.askForSSL((https) => {
                this.askForBundler(bundler => {
                  this.askForLiveReload(livereload => {
                    this.askForBuildPath(buildPath => {
                      callback({
                        buildPath,
                        livereload,
                        https,
                        bundler,
                        features: []
                      });
                    });
                  });
                });
              });
            });
          } else {
            console.log(
              chalk.red.bold('☠️  Project setup failed:') +
              ' ' +
              chalk.blue('the path must be empty ☠️')
            );
            console.log('');
          }
        }
      });
    });
  }
}

module.exports = Setup;
