let chalk = require('chalk');
let fileExists = require('file-exists');
let pathExists = require('path-exists');
let Loading = require('./Loading');
let ProcessManager = require('./ProcessManager');

class CreatePackage {
  
  constructor(config, callback) {
    
    console.log('');
    
    this.config = {
      ...config
    };
    
    this.defaultFileName = 'default.json';
    this.fileName = 'package.json';
    this.tempPath = `${process.env.PWD}/.ciffi/`;
    this.tempFile = `${this.tempPath}${this.fileName}`;
    this.resource = `${this.config.modulePath}/lib/node_modules/ciffi/node_modules/ciffi-js-webpack/resources/package/${this.defaultFileName}`;
    this.projectRoot = `${process.env.PWD}/`;
    this.projectFile = `${process.env.PWD}/${this.fileName}`;
    
    Loading.start('Generate ' + chalk.blue(this.fileName));
    
    this.init(() => {
      
      Loading.stop('Generate ' + chalk.blue(this.fileName) + chalk.green.bold(' OK'));
      
      callback();
      
    });
  }
  
  init(callback) {
    
    pathExists(this.tempPath).then((res) => {
      if (!res) {
        new ProcessManager({
          process: `mkdir ${this.tempPath}`,
          onClose: () => {
            this.createFile(callback);
          }
        });
      } else {
        this.createFile(callback);
      }
    });
  }
  
  createFile(callback) {
    
    new ProcessManager({
      process: `cp ${this.resource} ${this.tempFile}`,
      onClose: () => {
        if (fileExists.sync(this.projectFile)) {
          console.log(chalk.red(`File already exists: ${this.projectFile}`));
        } else {
          pathExists(this.projectRoot).then((res) => {
            if (res) {
              new ProcessManager({
                process: `cp ${this.tempFile} ${this.projectFile} && rm -rf ${this.tempFile}`,
                onClose: callback
              });
            }
          });
        }
      }
    });
  }
}

module.exports = CreatePackage;