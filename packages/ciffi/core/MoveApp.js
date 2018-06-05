const ProcessManager = require('./ProcessManager');

class MoveApp {
  
  constructor(callback) {
    
    const tempPath = `${process.env.PWD}/.ciffi/*`;
    const projectPath = `${process.env.PWD}/`;
    
    new ProcessManager({
      process: `cp -R ${tempPath} ${projectPath} && rm -rf ${tempPath}`,
      onClose: callback
    });
  }
}

module.exports = MoveApp;