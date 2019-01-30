const chalk = require('chalk');
const spawnCommand = require('spawn-command');
const Log = require('single-line-log').stdout;
const fileExists = require('file-exists');
const path = require('path');
const ConfigFile = path.join(process.cwd(), '.ciffisettings');
const Notify = require('./Notify');
const Assets = require('./Assets');
const Config = require('./Config');

class Dev {
  constructor(env, withServer) {
    if (fileExists.sync(ConfigFile)) {
      this.config = require(ConfigFile);
      this.env = env;
      this.withServer = withServer;
      this.init();
    } else {
      console.log(
        chalk.red.bold('☠️ Project dev failed:') +
          ' ' +
          chalk.blue("can't find .ciffisettings file ☠️")
      );
      Notify.sendError(
        "☠️ Project dev failed: can't find .ciffisettings file ☠️"
      );
      return console.log('');
    }
  }

  init() {
    const assetPath =
      process.platform === 'win32'
        ? this.config.build.path.replace(/\//g, '\\')
        : this.config.build.path;
    const assetPathName = this.config.build.srcPathName;
    const cleanDist =
      process.platform === 'win32'
        ? 'rd / s / q ' + assetPath
        : 'rm -rf ' + assetPath + '/*';
    const liveCssFirst = `${path.join(
      'node_modules',
      '.bin',
      'node-sass'
    )} ${path.join(assetPathName, 'styles', 'main.scss')} ${path.join(
      assetPath,
      this.config.general.stylesOutputName
    )} --source-map true`;
    const liveServer = this.defineLiveServer();
    const liveCss = `${path.join(
      'node_modules',
      '.bin',
      'node-sass'
    )} ${path.join(assetPathName, 'styles', 'main.scss')} ${path.join(
      assetPath,
      this.config.general.stylesOutputName
    )} --watch --source-map true`;
    const bundlerJs = {
      webpack: `${path.join(
        'node_modules',
        '.bin',
        'webpack'
      )} --config dev.config.js --progress`,
      parcel: `${path.join('node_modules', '.bin', 'parcel')} watch ${path.join(
        assetPathName,
        'scripts',
        'main.js'
      )} -d ${assetPath} --public-url ${assetPath}`
    };

    const liveJs = bundlerJs[this.config.general.bundle];

    this.logger(spawnCommand(cleanDist), 'clean-dist');

    new Config(this.env, () => {
      new Assets(() => {
        if (this.config.general.useNodeSass === false) {
          const processServer = spawnCommand(liveServer);
          this.logger([processServer], 'live-server');
        } else {
          const processServer = spawnCommand(
            `${liveCssFirst} && ${liveServer}`
          );
          const processCss = spawnCommand(liveCss);
          this.logger([processServer, processCss], 'node-sass');
        }

        if (this.withServer && this.config.localServer.useHMR) {
          const ciffiDevServer = `${path.join(
            'node_modules',
            '.bin',
            'ciffi-dev-server'
          )}`;
          const process = spawnCommand(ciffiDevServer);

          this.logger([process], 'ciffi-dev-server');
        } else {
          if (this.withServer) {
            require('@ciffi-js/dev-server');
          }

          const processJS = spawnCommand(liveJs);
          this.logger([processJS], this.config.general.bundle);
        }
      });
    });
  }

  defineLiveServer() {
    const liveServerFeature = this.config.general.features[
      this.config.general.features.length - 1
    ];
    const assetPath =
      process.platform === 'win32'
        ? this.config.build.path.replace(/\//g, '\\')
        : this.config.build.path;

    switch (liveServerFeature) {
      case 'livereload':
        return `${path.join(
          'node_modules',
          '.bin',
          'livereload'
        )} ${assetPath}`;
      default:
        return '';
    }
  }

  logger(processes, prefix = '') {
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

module.exports = Dev;
