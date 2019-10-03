const chalk = require('chalk')
const inquirer = require('inquirer')
const replace = require('replace-in-file')
const emptyDir = require('empty-dir')
const cliCursor = require('cli-cursor')
const Loading = require('../core/Loading')
const CheckUpdate = require('../core/CheckUpdate')
const ProcessManager = require('../core/ProcessManager')
const TempApp = require('../core/TempApp')
const CreateSettings = require('../core/CreateSettings')
const CreatePackage = require('../core/CreatePackage')
const CreateHiddenFiles = require('../core/CreateHiddenFiles')
const CreateSSL = require('../core/CreateSSL')
const MoveApp = require('../core/MoveApp')
const Dependencies = require('../core/Dependencies')
const Questions = require('../core/Questions')
const path = require('path')
const {
  showGreetings,
  showUpdate,
  showWindowsSetupError
} = require('../core/Messages')

class Setup {
  constructor(config) {
    this.config = {
      ...config,
      ciffiSrc: '.ciffi/src',
      ciffiSrcName: 'src'
    }
    
    this.init()
  }
  
  init() {
    this.checkUpdates(() => {
      this.beforeStart(
        ({ buildPath, features, livereload, https, bundler }) => {
          this.config.features = features
          this.config.livereload = livereload
          this.config.buildPath = buildPath
          this.config.https = https
          this.config.bundler = bundler
          
          new TempApp(this.config.modulePath, () => {
            this.start()
          })
        }
      )
    })
  }
  
  checkUpdates(callback) {
    const updateChecker = new CheckUpdate(
      (hasUpdate, oldVersion, newVersion) => {
        if (hasUpdate) {
          showUpdate(oldVersion, newVersion)
          console.log()
        } else {
          console.log('😎 ' + chalk.green('Latest version installed'))
          console.log()
          callback()
        }
      }
    )
  }
  
  replaceBuildPath(newString, callback) {
    const files = [
      path.normalize(
        process.cwd() + '/' + this.config.ciffiSrc + '/config/config.js'
      ),
      path.normalize(
        process.cwd() + '/' + this.config.ciffiSrc + '/config/env/dev.js'
      ),
      path.normalize(
        process.cwd() + '/' + this.config.ciffiSrc + '/config/env/local.js'
      ),
      path.normalize(
        process.cwd() + '/' + this.config.ciffiSrc + '/config/env/stage.js'
      ),
      path.normalize(
        process.cwd() + '/' + this.config.ciffiSrc + '/config/env/prod.js'
      ),
      path.normalize(process.cwd() + '/.ciffi/package.json')
    ]
    
    replace(
      {
        files,
        from: /@REPLACE__ASSETS@/g,
        to: newString
      },
      error => {
        if (error) {
          return console.error('Error occurred:', error)
        }
        
        replace(
          {
            files,
            from: /@REPLACE__ASSETS__NAME@/g,
            to: this.config.ciffiSrcName
          },
          error => {
            if (error) {
              return console.error('Error occurred:', error)
            }
            callback()
          }
        )
      }
    )
  }
  
  replaceConfig(newString, callback) {
    replace(
      {
        files: [
          path.normalize(
            process.cwd() + '/' + this.config.ciffiSrc + '/config/config.js'
          ),
          path.normalize(
            process.cwd() + '/' + this.config.ciffiSrc + '/config/env/dev.js'
          ),
          path.normalize(
            process.cwd() + '/' + this.config.ciffiSrc + '/config/env/local.js'
          ),
          path.normalize(
            process.cwd() + '/' + this.config.ciffiSrc + '/config/env/stage.js'
          ),
          path.normalize(
            process.cwd() + '/' + this.config.ciffiSrc + '/config/env/prod.js'
          )
        ],
        from: /@REPLACE__CONFIG@/g,
        to: newString
      },
      error => {
        if (error) {
          return console.error('Error occurred:', error)
        }
        callback()
      }
    )
  }
  
  filter(filepath) {
    return !/(^|\/)\.[^\/\.]/g.test(filepath)
  }
  
  start() {
    let fixedAssetsUrl = this.config.buildPath
    
    if (
      fixedAssetsUrl.substring(
        fixedAssetsUrl.length - 1,
        fixedAssetsUrl.length
      ) === '/'
    ) {
      fixedAssetsUrl = fixedAssetsUrl.substring(0, fixedAssetsUrl.length - 1)
    }
    
    this.replaceBuildPath(fixedAssetsUrl, () => {
      cliCursor.hide()
      
      console.log('')
      
      Loading.start(
        'Generate project tree for ' + chalk.blue(this.config.projectName)
      )
      
      this.replaceConfig(this.config.projectName, () => {
        const pathName = fixedAssetsUrl.split('/')[
        fixedAssetsUrl.split('/').length - 1
          ]
        
        if (pathName !== 'src') {
          new ProcessManager({
            process: path.normalize(
              `${process.cwd()}/${
                this.config.ciffiSrc
              }/, ${process.cwd()}/.ciffi/${this.config.ciffiSrc}/`
            )
          })
        }
        
        Loading.stop(
          'Generate project tree for ' +
          chalk.blue(this.config.projectName) +
          chalk.green.bold(' OK')
        )
        
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
                      showGreetings()
                    })
                  })
                })
              })
            })
          }
        )
      })
    })
  }
  
  testNpm5(callback) {
    let version
    new ProcessManager({
      process: 'npm -v',
      onMessage: res => {
        version = parseInt(res.split('.')[0]) >= 5
      },
      onError: () => {
        version = false
      },
      onClose: () => {
        if (version) {
          callback()
        } else {
          console.log(
            chalk.red.bold('☠️ Setup error: ') +
            chalk.red('npm@5.0.0 is required ☠️')
          )
          console.log(
            chalk.blue.bold('update with: ') +
            chalk.blue('npm install -g npm@latest')
          )
        }
      }
    })
  }
  
  beforeStart(callback) {
    this.testNpm5(() => {
      emptyDir(
        path.normalize(process.cwd() + '/'),
        this.filter,
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log('')
            console.log('')
            console.log(chalk.green.bold('-- Ciffi Frontend Generator --'))
            console.log('')
            
            if (process.platform === 'win32') {
              return showWindowsSetupError()
            }
            
            if (result) {
              if (!this.config.silent) {
                inquirer
                  .prompt(new Questions(this.config.projectName))
                  .then(res => {
                    if (res.projectName) {
                      this.config.projectName = res.projectName
                    }
                    callback({
                      buildPath: res.buildPath,
                      livereload: true,//res.livereload,
                      https: false,//res.wantHTTPS === 'yes',
                      features: [],
                      bundler: 'webpack'
                    })
                  })
              } else {
                this.config.projectName = this.config.projectName || 'test'
                callback({
                  buildPath: '../static',
                  livereload: 'none',
                  https: false,
                  features: ['livereload'],
                  bundler: 'webpack'
                })
              }
            } else {
              console.log(
                chalk.red.bold('☠️  Project setup failed:') +
                ' ' +
                chalk.blue('the path must be empty ☠️')
              )
              console.log('')
            }
          }
        }
      )
    })
  }
}

module.exports = Setup
