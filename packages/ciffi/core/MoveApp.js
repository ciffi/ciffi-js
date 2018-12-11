const ProcessManager = require('./ProcessManager');

class MoveApp {
  
  constructor(callback) {
    
    const tempPath = `${process.cwd()}/.ciffi/*`;
    const projectPath = `${process.cwd()}/`;
    
    new ProcessManager({
      process: `cp -R ${tempPath} ${projectPath} && rm -rf ${tempPath}`,
      onClose: callback
    });
  }
}

module.exports = MoveApp;