const ProcessManager = require('./ProcessManager');
const { showCommandErrorMessage } = require('./Messages');
const Setup = require('../task/Setup');

class TaskManager {
  constructor({ cmd, opts, projectName }) {
    this.getNPMLocation(modulePath => {
      switch (cmd) {
        case 'setup':
          new Setup({
            modulePath,
            projectName,
            silent: opts.s
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
    });
  }

  getNPMLocation(callback) {
    let modulePath;
    new ProcessManager({
      process: 'npm config get prefix',
      onMessage: res => {
        modulePath = res.trim();
      },
      onClose: () => {
        callback(modulePath);
      }
    });
  }
}

module.exports = TaskManager;
