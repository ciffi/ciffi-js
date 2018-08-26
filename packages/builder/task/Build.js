const chalk = require('chalk');
const fileExists = require('file-exists');
const spawnCommand = require('spawn-command')
const path = require('path');
const ConfigFile = path.join(process.cwd(), '.ciffisettings');
const Assets = require('./Assets');
const Config = require('./Config');

const Errors = {
  build: new Error('🏗  frontend build error!!')
};

class Build {
  
  constructor(env) {
    
    if (fileExists.sync(ConfigFile)) {
      this.config = require(ConfigFile);
      this.env = env;
      this.init();
    } else {
      console.error(chalk.red.bold('☠️ Project build failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
      console.error(Errors.build.message);
      console.error('');
      return process.exit(1);
    }
  }
  
  init() {
    const assetPath = process.platform === 'win32' ? this.config.assetsPath.replace(/\//g, '\\') : this.config.assetsPath;
    const assetPathName = this.config.assetsPathName;
    const autoprefixerConfig = this.config.autoprefixer || 'last 12 versions';
    const concat = ' && ';
    const cleanDist = process.platform === 'win32' ? 'rd / s / q ' + assetPath : 'rm -rf ' + assetPath + '/*';
    const css = `${path.join('node_modules', '.bin', 'node-sass')} ${path.join(assetPathName, 'styles', 'main.scss')} ${path.join(assetPath, this.config.stylesOutputName)}`;
    const autoprefixer = `${path.join('node_modules', '.bin', 'postcss')} --use autoprefixer --autoprefixer.browsers "${autoprefixerConfig}" -o ${path.join(assetPath, this.config.stylesOutputName)} ${path.join(assetPath, this.config.stylesOutputName)}`;
    const cleancss = `${path.join('node_modules', '.bin', 'cleancss')} -o ${path.join(assetPath, this.config.stylesOutputName,)} ${path.join(assetPath, this.config.stylesOutputName,)}`;
    const styles = css + concat + autoprefixer + concat + cleancss;
    
    const bundlerJs = {
      webpack: `${path.join('node_modules', '.bin', 'webpack')} --config build.config.js --progress`,
      parcel: `${path.join('node_modules', '.bin', 'parcel')} build ${path.join(assetPathName, 'scripts', 'main.js')} -d ${assetPath} --public-url ${assetPath} --no-source-maps`
    };
    
    const js = bundlerJs[this.config.bundle];
    
    new Config(this.env, () => {
      
      const spawnProcess = spawnCommand(cleanDist + concat + styles + concat + js);
      
      spawnProcess.stdout.on('data', (res) => {
        if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0 || res.indexOf('error ') >= 0 || res.indexOf('Errors:') >= 0) {
          console.error(new Error(res));
          return process.exit(1);
        } else if (res.indexOf('Built at: ') >= 0 || res.indexOf('Built in ') >= 0 || res.indexOf('.css') > 0 || res.indexOf('CSS') > 0) {
          console.log('🏗' + chalk.blue(res));
        }
      });
      
      spawnProcess.stderr.on('data', (res) => {
        if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0 || res.indexOf('error ') >= 0 || res.indexOf('Errors:') >= 0) {
          console.error(new Error(res));
          return process.exit(1);
        }
      });
      
      spawnProcess.on('close', (res) => {
        if (res === 0) {
          console.log(chalk.blue('🏗 Project build for ') + this.env + chalk.blue(' in ') + assetPath + ' ' + chalk.green.bold(' OK'));
          new Assets();
        } else if (res === null) {
          console.error(new Error(res));
          return process.exit(1);
        }
        console.log('');
      });
      
    });
  }
}

module.exports = Build;
