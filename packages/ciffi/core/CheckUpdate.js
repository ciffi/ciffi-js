const chalk = require('chalk');
const ProcessManager = require('./ProcessManager');
const Loading = require('./Loading');

class CheckUpdate {
  
  constructor(callback) {
    
    console.log('👀' + chalk.blue('Looking for updates'));
    
    this.getCurrentVersion((currentVersion) => {
      this.getNewVersion((newVersion) => {
        this.checkUpdate(currentVersion, newVersion, callback);
      });
    });
    
  }
  
  getCurrentVersion(callback) {
    let version;
    new ProcessManager({
      process: 'ciffi -v',
      onMessage: (res) => {
        version = res;
      },
      onClose: () => {
        callback(version);
      }
    });
  }
  
  getNewVersion(callback) {
    let version;
    new ProcessManager({
      process: 'npm info ciffi version',
      onMessage: (res) => {
        version = res;
      },
      onClose: () => {
        this.newVersion = version;
        callback(version);
      }
    });
  }
  
  update(callback) {
    Loading.start('Download and install ' + chalk.blue('ciffi'));
    new ProcessManager({
      process: `npm i -g ciffi@${this.newVersion}`,
      onClose: () => {
        Loading.stop('Download and install ' + chalk.blue('ciffi') + chalk.green.bold(' OK'));
        callback();
      }
    });
  }
  
  checkUpdate(currentVersion, newVersion, callback) {
    const current = currentVersion.split('.');
    const latest = newVersion.split('.');
    let hasNewVersion = 0;
    
    for (let i = 0; i < current.length; i++) {
      if (parseInt(latest[i]) > parseInt(current[i])) {
        hasNewVersion++;
      }
    }
    
    callback(hasNewVersion > 0, currentVersion, newVersion);
  }
}

module.exports = CheckUpdate;