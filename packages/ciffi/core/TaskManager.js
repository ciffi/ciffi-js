const {showCommandErrorMessage} = require('./Messages');
const Setup = require('../task/Setup');

class TaskManager {
  
  constructor(modulePath, cmd, projectName) {
    
    switch (cmd) {
      case 'setup':
        new Setup({
          modulePath,
          projectName
        });
        break;
      case 'dev-old':
        require('../task/DevOld');
        break;
      case 'build-old':
        require('../task/BuildProd');
        break;
      default:
        showCommandErrorMessage();
        break;
    }
  }
  
}

module.exports = TaskManager;