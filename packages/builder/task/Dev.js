const chalk = require('chalk')
const spawnCommand = require('spawn-command')
const fileExists = require('file-exists')
const path = require('path')
const ConfigFile = path.join(process.cwd(), '.ciffisettings')
const Notify = require('./Notify')
const Assets = require('./Assets')
const Config = require('./Config')
const Logger = require('../utils/Logger')

class Dev {
  constructor(env, withServer) {
    if (fileExists.sync(ConfigFile)) {
      this.config = require(ConfigFile)
      this.env = env
      this.withServer = withServer
      this.init()
    } else {
      console.log(
        chalk.red.bold('☠️ Project dev failed:') +
          ' ' +
          chalk.blue("can't find .ciffisettings file ☠️")
      )
      Notify.sendError(
        "☠️ Project dev failed: can't find .ciffisettings file ☠️"
      )
      return console.log('')
    }
  }

  init() {
    const assetPath =
      process.platform === 'win32'
        ? this.config.build.path.replace(/\//g, '\\')
        : this.config.build.path
    const assetPathName = this.config.build.srcPathName
    const cleanDist =
      process.platform === 'win32'
        ? 'rd / s / q ' + assetPath
        : 'rm -rf ' + assetPath + '/*'
    const liveCssFirst = `${path.join(
      'node_modules',
      '.bin',
      'node-sass'
    )} ${path.join(assetPathName, 'styles', 'main.scss')} ${path.join(
      assetPath,
      this.config.general.stylesOutputName
    )} --source-map true`
    const liveServer = this.defineLiveServer()
    const liveCss = `${path.join(
      'node_modules',
      '.bin',
      'node-sass'
    )} ${path.join(assetPathName, 'styles', 'main.scss')} ${path.join(
      assetPath,
      this.config.general.stylesOutputName
    )} --watch --source-map true`
    const bundlerJs = {
      webpack: `${path.join(
        'node_modules',
        '.bin',
        'webpack'
      )} --config ${path.join('builder', 'config.dev.js')} --progress`,
      parcel: `${path.join('node_modules', '.bin', 'parcel')} watch ${path.join(
        assetPathName,
        'scripts',
        'main.js'
      )} -d ${assetPath} --public-url ${assetPath}`
    }

    const liveJs = bundlerJs[this.config.general.bundle]

    new Logger(spawnCommand(cleanDist), 'clean-dist')

    new Config(this.env, () => {
      new Assets(() => {
        if (this.config.general.useNodeSass === false) {
          const processServer = spawnCommand(liveServer)
          new Logger([processServer], 'live-server')
        } else {
          const processServer = spawnCommand(`${liveCssFirst} && ${liveServer}`)
          const processCss = spawnCommand(liveCss)
          new Logger([processServer, processCss], 'node-sass')
        }

        if (this.withServer && this.config.localServer.useHMR) {
          const ciffiDevServer = `${path.join(
            'node_modules',
            '.bin',
            'ciffi-dev-server'
          )}`
          const process = spawnCommand(ciffiDevServer)

          new Logger([process], 'ciffi-dev-server')
        } else {
          if (this.withServer) {
            require('@ciffi-js/dev-server')
          }

          const processJS = spawnCommand(liveJs)
          new Logger([processJS], this.config.general.bundle)
        }
      })
    })
  }

  defineLiveServer() {
    const liveServerFeature = this.config.general.features[
      this.config.general.features.length - 1
    ]
    const assetPath =
      process.platform === 'win32'
        ? this.config.build.path.replace(/\//g, '\\')
        : this.config.build.path

    switch (liveServerFeature) {
      case 'livereload':
        return `${path.join('node_modules', '.bin', 'livereload')} ${assetPath}`
      default:
        return ''
    }
  }
}

module.exports = Dev
