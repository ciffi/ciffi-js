#! /usr/bin/env node
const meow = require('meow');
const chalk = require('chalk');
const packageJson = require('./package.json');
const exec = require('child_process').exec;
const fileExists = require('file-exists');
const ConfigFile = process.env.PWD + '/.ciffisettings';

const cli = meow({
  pkg: packageJson
});

const opts = cli.flags;
const args = cli.input;
const cmd = args[0];
const pkg = cli.pkg;

Object.keys(opts).forEach(function (key) {
  const legacyKey = key.replace(/[A-Z]/g, function (m) {
    return '-' + m.toLowerCase();
  });
  
  opts[legacyKey] = opts[key];
});

const _process = exec('npm config get prefix');

_process.stdout.on('data', function (path) {
  const _modulePath = path.trim();
  
  start(_modulePath);
});

function start() {
  if (!cmd) {
    if (opts.v) {
      console.log(chalk.magenta.bold(pkg.version));
    } else if (opts.a) {
      console.log(chalk.blue(pkg.author.name));
    } else {
      showCommandErrorMessage();
    }
  } else {
    
    let _cmd = cmd;
    let _env = fileExists.sync(ConfigFile) && require(ConfigFile).defaultBuildEnv ? require(ConfigFile).defaultBuildEnv : 'local';
    
    if (cmd.indexOf('build:') === 0) {
      _cmd = 'build';
      _env = cmd.split(':')[1];
    } else if (opts.env) {
      _env = opts.env;
    }
    
    switch (_cmd) {
      case 'build':
        require('./command/app-build')(_env);
        break;
      case 'dev':
        require('./command/app-dev');
        break;
      case 'config':
        require('./command/app-config')(_env);
        break;
      case 'assets':
        require('./command/app-dev');
        break;
      default:
        showCommandErrorMessage();
        break;
    }
  }
}

function showCommandErrorMessage() {
  console.log('');
  console.log('');
  console.log(chalk.red.bold('Command not found'));
  console.log('');
  console.log(chalk.blue('ciffi -h') + chalk.green(' -- commands list --'));
  console.log('');
}