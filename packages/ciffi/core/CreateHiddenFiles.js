let chalk = require('chalk');
let fileExists = require('file-exists');
let pathExists = require('path-exists');
let Loading = require('./Loading');
let ProcessManager = require('./ProcessManager');

class CreateHiddenFiles {
  
  constructor(config, callback) {
    
    console.log('');
    
    this.config = {
      ...config
    };
    
    this.files = ['babelrc', 'editorconfig', 'eslintrc', 'gitignore', 'prettierignore', 'prettierrc'];
    this.tempPath = `${process.env.PWD}/.ciffi/`;
    
    const loadingString = this.files.map((fileName, index) => {
      const withAnd = index === this.files.length - 1 ? '' : ' and';
      return `${chalk.blue(`.${fileName}`)}${withAnd}`
    });
    
    Loading.start(`Generate ${loadingString.join(' ')}`);
    
    this.init(() => {
      
      Loading.stop(`Generate ${loadingString.join(' ')} ${chalk.green.bold(' OK')}`);
      
      callback();
    });
    
  }
  
  init(callback) {
    
    this.files.map((fileName, index) => {
      this.createFile(fileName);
      
      if (index === this.files.length - 1) {
        callback();
      }
      
    });
  }
  
  checkPath(callback) {
    
    pathExists(this.tempPath).then((res) => {
      if (!res) {
        new ProcessManager({
          process: `mkdir ${this.tempPath}`,
          onClose: () => {
            callback();
          }
        });
      } else {
        callback();
      }
    });
  }
  
  createFile(fileName) {
    
    const tempFile = `${this.tempPath}${fileName}`;
    const resource = `${this.config.modulePath}/lib/node_modules/ciffi/node_modules/ciffi-js-webpack/resources/core/${fileName}`;
    const projectRoot = `${process.env.PWD}/`;
    const projectFile = `${process.env.PWD}/.${fileName}`;
    
    this.checkPath(() => {
      if (fileExists.sync(projectFile)) {
        console.log(chalk.red(`File already exists: ${projectFile}`));
      } else {
        pathExists(projectRoot).then((res) => {
          if (res) {
            new ProcessManager({
              process: `cp ${resource} ${tempFile} && cp ${tempFile} ${projectFile} && rm -rf ${tempFile}`
            });
          }
        });
      }
    });
  }
}

module.exports = CreateHiddenFiles;