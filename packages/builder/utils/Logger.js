const chalk = require('chalk');
const Log = require('single-line-log').stdout;
const Notify = require('../task/Notify');

class Logger {
  
  constructor(processes, prefix = '') {
    for (let i = 0; i < processes.length; i++) {
      processes[i].stdout.on('data', res => {
        if (
          res.indexOf('ERROR in') >= 0 ||
          res.indexOf('Error:') >= 0 ||
          res.indexOf('error ') >= 0 ||
          res.indexOf('Errors:') >= 0
        ) {
          console.log(
            chalk.bgRed(' ' + prefix + ' -->') + ' ' + chalk.red(res)
          );
          Notify.sendObjError(res);
        } else {
          Log(chalk.green(prefix + ' --> ') + chalk.blue(res));
          
          if (res.indexOf('Built at: ') >= 0 || res.indexOf('Built in ') >= 0) {
            Notify.sendReady('🏗 DEV ready - click to open');
          }
        }
      });
      
      processes[i].stderr.on('data', res => {
        if (
          res.indexOf('ERROR in') >= 0 ||
          res.indexOf('Error:') >= 0 ||
          res.indexOf('error ') >= 0 ||
          res.indexOf('Errors:') >= 0
        ) {
          console.log(
            chalk.bgRed(' ' + prefix + ' -->') + ' ' + chalk.red(res)
          );
          Notify.sendObjError(chalk(res));
        } else {
          Log(chalk.green(prefix + ' --> ') + chalk.blue(res));
        }
      });
      
      processes[i].on('close', res => {
        if (res !== 0) {
          Log(chalk.green(prefix + ' --> ') + chalk.green(res));
        }
      });
    }
  }
}

module.exports = Logger;
