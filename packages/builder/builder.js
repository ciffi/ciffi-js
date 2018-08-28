#! /usr/bin/env node
const meow = require('meow');
const chalk = require('chalk');
const fileExists = require('file-exists');
const path = require('path');
const ConfigFile = path.resolve(process.cwd(), '.ciffisettings');
const { Assets, Build, Config, Dev } = require('./task');


class Builder {
  
  constructor() {
    
    const cli = meow();
    
    const opts = cli.flags;
    const args = cli.input;
    const cmd = args[0];
    
    Object.keys(opts).forEach((key) => {
      const legacyKey = key.replace(/[A-Z]/g, (m) => {
        return '-' + m.toLowerCase();
      });
      
      opts[legacyKey] = opts[key];
    });
    
    this.init(cmd, opts);
  }
  
  init(cmd, opts) {
    
    if (cmd) {
      
      let env = typeof opts.env === 'string' ? opts.env : false;
      let devEnv = typeof opts.env === 'string' ? opts.env : false;
      
      if (!env) {
        env = fileExists.sync(ConfigFile) && require(ConfigFile).defaultBuildEnv ? require(ConfigFile).defaultBuildEnv : 'local';
        devEnv = fileExists.sync(ConfigFile) && require(ConfigFile).defaultDevEnv ? require(ConfigFile).defaultDevEnv : 'dev';
      }
      
      switch (cmd) {
        case 'start':
          new Dev(devEnv, true);
          break;
        case 'build':
          new Build(env);
          break;
        case 'dev':
          new Dev(devEnv);
          break;
        case 'config':
          new Config(env);
          break;
        case 'assets':
          new Assets();
          break;
        default:
          this.showCommandErrorMessage();
          break;
      }
    }
    
  }
  
  showCommandErrorMessage() {
    console.log('');
    console.log('');
    console.log(chalk.red.bold('Command not found'));
    console.log('');
    console.log(chalk.blue('ciffi -h') + chalk.green(' -- commands list --'));
    console.log('');
  }
}

new Builder();