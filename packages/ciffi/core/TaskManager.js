const fileExists = require('file-exists');
const path = require('path');
const ConfigFile = path.resolve(process.env.PWD + '/.ciffisettings');
const {showCommandErrorMessage} = require('./Messages');
const Setup = require('../task/Setup');

class TaskManager {
  
  constructor(modulePath, cmd, projectName) {
    let _cmd = cmd;
    let _env = fileExists.sync(ConfigFile) && require(ConfigFile).defaultBuildEnv ? require(ConfigFile).defaultBuildEnv : 'local';
    
    if (cmd.indexOf('build:') === 0) {
      _cmd = 'build';
      _env = cmd.split(':')[1];
    }
    
    if (cmd.indexOf('config:') === 0) {
      _cmd = 'config';
      _env = cmd.split(':')[1];
    }
    
    switch (_cmd) {
      case 'setup':
        new Setup({
          modulePath,
          projectName
        });
        break;
      case 'dev':
        require('../task/Dev');
        break;
      case 'build':
        require('../task/Build')(_env);
        break;
      case 'dev-old':
        require('../task/DevOld');
        break;
      case 'build-old':
        require('../task/BuildProd');
        break;
      case 'config':
        require('../task/Config')(_env);
        break;
      case 'e2e':
        let _args = false;
        if (args[1]) {
          _args = args;
        }
        require('../task/Test').e2e(_args);
        break;
      case 'jsdoc':
        require('../task/Doc').jsdoc();
        break;
      case 'cssdoc':
        require('../task/Doc').cssdoc();
        break;
      case 'styleguide':
        require('../task/Doc').styleguide();
        break;
      case 'assets':
        require('../task/Assets');
        break;
      case 'styles':
        require('../task/Styles');
        break;
      default:
        showCommandErrorMessage();
        break;
    }
  }
  
}

module.exports = TaskManager;