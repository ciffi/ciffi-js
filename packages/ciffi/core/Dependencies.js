const chalk = require('chalk');
const Loading = require('./Loading');
const ProcessManager = require('./ProcessManager');

class Dependencies {
  
  constructor(config, callback) {
    
    let process = 'npm install --no-progress';
    
    this.startDownload(process, callback);
  }
  
  startDownload(process, successCallback, failCallback) {
    console.log('');
    Loading.start('Download and install ' + chalk.blue('dependencies'));
    let processError;
    
    new ProcessManager({
      process,
      onMessage: (res) => {
        if (res.indexOf('command not found') >= 0) {
          console.log(res);
        }
      },
      onError: (res) => {
        switch (res) {
          case ' ':
            break;
          default:
            if (res.indexOf('command not found') >= 0) {
              processError = ' - ' + chalk.red.bold(res.split(': ')[1]) + chalk.red(' not found') + ' - ';
            }
        }
      },
      onClose: (res) => {
        switch (res) {
          case 0 :
            this.onDownloadEnd(successCallback);
            break;
          case 1 :
            this.onDownloadEnd(successCallback);
            break;
          case 'null' :
            this.onDownloadEnd(successCallback);
            break;
          case null :
            this.onDownloadEnd(successCallback);
            break;
          case 127 :
            const error = processError || ' - ' + chalk.red.bold(' yarn') + chalk.red(' not found') + ' - ';
            Loading.stop('Download and install ' + chalk.blue('dependencies') + error + chalk.red.bold(' FAIL'));
            console.log('');
            if (failCallback && typeof failCallback === 'function') {
              failCallback();
            }
            break;
          default:
            console.log('exit -- ' + res);
        }
      }
    });
  }
  
  onDownloadEnd(successCallback) {
    Loading.stop('Download and install ' + chalk.blue('dependencies') + chalk.green.bold(' OK'));
    console.log('');
    if (successCallback && typeof successCallback === 'function') {
      successCallback();
    }
  }
}

module.exports = Dependencies;