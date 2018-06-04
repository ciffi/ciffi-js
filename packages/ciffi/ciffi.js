#! /usr/bin/env node
const meow = require('meow');
const chalk = require('chalk');
const cliCursor = require('cli-cursor');
const exec = require('child_process').exec;
const {showLogo, showGreetings, showCommandListMsg, showCommandErrorMessage} = require('./core/Messages');
const TaskManager = require('./core/TaskManager');
const packageJson = require('./package.json');


class Ciffi {
  constructor() {
    
    const cli = meow({
      pkg: packageJson
    });
    
    const opts = cli.flags;
    const args = cli.input;
    const cmd = args[0];
    const projectName = args[1];
    
    const pkg = cli.pkg;
    
    Object.keys(opts).forEach((key) => {
      let legacyKey = key.replace(/[A-Z]/g, (m) => {
        return '-' + m.toLowerCase();
      });
      
      opts[legacyKey] = opts[key];
    });
    
    const _process = exec('npm config get prefix');
    
    _process.stdout.on('data', (path) => {
      let modulePath = path.trim();
      
      this.init(modulePath, cmd, projectName, pkg, opts);
    });
  }
  
  init(modulePath, cmd, projectName, pkg, opts) {
    if (!cmd) {
      if (opts.h) {
        showCommandListMsg();
      } else if (opts.v) {
        console.log(chalk.magenta.bold(pkg.version));
      } else if (opts.a) {
        console.log(chalk.blue(pkg.author.name));
      } else if (opts.logo) {
        showLogo();
      } else if (opts.postsetup) {
        cliCursor.show();
        showGreetings();
      } else {
        showCommandErrorMessage();
      }
    } else {
      
      new TaskManager(modulePath, cmd, projectName);
      
    }
  }
}

new Ciffi();