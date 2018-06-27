const chalk = require('chalk');
const fileExists = require('file-exists');
const exec = require('child_process').exec;
const path = require('path');
const ConfigFile = path.join(process.cwd(), '.ciffisettings');
const Assets = require('./Assets');
const Config = require('./Config');


class Build {
  
  constructor(env) {
    
    if (fileExists.sync(ConfigFile)) {
      this.config = require(ConfigFile);
      this.env = env;
      this.init();
    } else {
      console.error(chalk.red.bold('☠️  Project build failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
      return console.log('');
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
    const js = `${path.join('node_modules', '.bin', 'webpack')} --config build.config.js --progress`;
    
    new Config(this.env, () => {
      
      const process = exec(cleanDist + concat + styles + concat + js);
      
      process.stdout.on('data', (res) => {
        if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0) {
          console.error(chalk.red(res));
        } else {
          console.log('🏗  ' + chalk.blue(res));
        }
      });
      
      process.stderr.on('data', (res) => {
        if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0) {
          console.error(chalk.red(res));
        } else {
          console.log('🏗  ' + chalk.blue(res));
        }
      });
      
      process.on('close', (res) => {
        if (res === 0) {
          console.log(chalk.blue('🏗  Project build for ') + this.env + chalk.blue(' in ') + assetPath + ' ' + chalk.green.bold(' OK'));
          new Assets();
        }
        console.log('');
      });
      
    });
  }
}

module.exports = Build;
