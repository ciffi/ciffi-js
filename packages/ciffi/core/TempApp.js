const ProcessManager = require('./ProcessManager');
const pathExists = require('path-exists');

class TempApp {
  
  constructor(modulePath, callback) {
    
    this.config = {
      callback: callback,
      modulePath: modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-webpack/frontend/*',
      tempPath: process.env.PWD + '/.ciffi/'
    };
    
    pathExists(this.config.tempPath).then((res) => {
      if (!res) {
        new ProcessManager({
          process: `mkdir ${this.config.tempPath}`,
          onClose: () => {
            this.copy(this.config.callback)
          }
        })
      } else {
        this.copy(this.config.callback);
      }
    });
  }
  
  copy(onClose) {
    new ProcessManager({
      process: `cp -R ${this.config.modulePath} ${this.config.tempPath}`,
      onClose
    });
  }
}

module.exports = TempApp;