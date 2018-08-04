let chalk = require('chalk');
let replace = require('replace-in-file');
let fileExists = require('file-exists');
let pathExists = require('path-exists');
let Loading = require('./Loading');
let ProcessManager = require('./ProcessManager');

class CreateSettings {
  
  constructor(config, callback) {
    console.log('');
    
    this.config = config;
    this.tempPath = `${process.env.PWD}/.ciffi/`;
    this.fileName = `ciffisettings`;
    this.hiddenFileName = `.${this.fileName}`;
    this.tempFile = `${this.tempPath}${this.fileName}`;
    this.resource = `${this.config.modulePath}/lib/node_modules/ciffi/node_modules/ciffi-js-webpack/resources/core/${this.fileName}`;
    this.projectRoot = `${process.env.PWD}/`;
    this.projectFile = `${this.projectRoot}${this.hiddenFileName}`;
    
    Loading.start('Generate ' + chalk.blue(this.hiddenFileName));
    
    this.init(() => {
      
      Loading.stop('Generate ' + chalk.blue(this.hiddenFileName) + chalk.green.bold(' OK'));
      
      callback();
      
    });
  }
  
  init(callback) {
    
    this.createTempPath(() => {
      
      new ProcessManager({
        process: `cp ${this.resource} ${this.tempFile}`,
        onClose: () => {
          
          this.replaceAll(() => {
            
            if (fileExists.sync(this.projectFile)) {
              console.log(chalk.red('File already exists: ' + this.projectFile));
            } else {
              pathExists(this.projectRoot).then((res) => {
                if (res) {
                  const copy = `cp ${this.tempFile} ${this.projectFile}`;
                  const removeTempFile = `rm -rf ${this.tempFile}`;
                  const removeNewFile = `rm -rf ${this.projectRoot}/${this.fileName}`;
                  const copyAndClear = `${copy} && ${removeTempFile} && ${removeNewFile}`;
                  new ProcessManager({
                    process: copyAndClear,
                    onClose: callback
                  });
                }
              });
            }
            
          });
          
        }
      });
    });
  }
  
  createTempPath(callback) {
    
    pathExists(this.tempPath).then((res) => {
      if (!res) {
        new ProcessManager({
          process: `mkdir ${this.tempPath}`,
          onClose: callback
        });
      } else {
        callback();
      }
    });
  }
  
  replaceAll(callback) {
    this.replaceBuildPath(() => {
      this.replaceBundler(() => {
        this.replaceConfig(() => {
          this.replaceHTTPS(() => {
            this.replaceFeatures(() => {
              callback();
            });
          });
        });
      });
    });
  }
  
  replaceBuildPath(callback) {
    replace({
      files: [this.tempFile],
      from: /@REPLACE__ASSETS@/g,
      to: this.config.assetsPath
    }, (error) => {
      if (error) {
        return console.error('Error occurred:', error);
      }
      replace({
        files: [this.tempFile],
        from: /@REPLACE__ASSETS__NAME@/g,
        to: 'src'
      }, (error) => {
        if (error) {
          return console.error('Error occurred:', error);
        }
        callback();
      });
    });
  }
  
  replaceBundler(callback) {
    replace({
      files: [this.tempFile],
      from: /@REPLACE__BUNDLER@/g,
      to: this.config.bundler
    }, (error) => {
      if (error) {
        return console.error('Error occurred:', error);
      }
      callback();
    });
  }
  
  replaceConfig(callback) {
    
    replace({
      files: [this.tempFile],
      from: /@REPLACE__CONFIG@/g,
      to: this.config.projectName
    }, (error) => {
      if (error) {
        return console.error('Error occurred:', error);
      }
      callback();
    });
  }
  
  replaceHTTPS(callback) {
    
    replace({
      files: [this.tempFile],
      from: /@REPLACE__HTTPS@/g,
      to: this.config.https
    }, (error) => {
      if (error) {
        return console.error('Error occurred:', error);
      }
      callback();
    });
  }
  
  replaceFeatures(callback) {
    
    const feature = this.config.features;
    const livereload = this.config.livereload;
    
    feature.push(livereload);
    
    replace({
      files: [this.tempFile],
      from: /@REPLACE__FEATURES@/g,
      to: JSON.stringify(feature).replace(/"/g, '\'')
    }, (error) => {
      if (error) {
        return console.error('Error occurred:', error);
      }
      callback();
    });
  }
}

module.exports = CreateSettings;