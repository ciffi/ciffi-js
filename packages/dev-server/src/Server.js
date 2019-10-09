const chalk = require('chalk')
const fs = require('fs')
const fileExists = require('file-exists')
const express = require('express')
const path = require('path')

const webpack = require('webpack')
const webpackConfig = require(path.join(
  process.cwd(),
  'node_modules',
  '@ciffi-js',
  'builder',
  'config',
  'config.server.js'
))
const compiler = webpack(webpackConfig)
const ConfigFile = path.join(process.cwd(), '.ciffisettings')

class Server {
  constructor() {
    if (fileExists.sync(ConfigFile)) {
      this.config = require(ConfigFile)

      this.init()
    } else {
      console.error(
        chalk.red.bold('☠️  Project build failed:') +
          ' ' +
          chalk.blue("can't find .ciffisettings file ☠️")
      )
      return console.log('')
    }
  }

  init() {
    this.app = express()
    this.app.use(express.static(this.config.localServer.publicPath))

    if (this.config.localServer.useHMR) {
      this.app.use(
        require('webpack-dev-middleware')(compiler, {
          noInfo: true,
          publicPath: webpackConfig.output.publicPath
        })
      )

      this.app.use(require('webpack-hot-middleware')(compiler))
    }

    if (this.config.dev.https) {
      const privateKey = fs.readFileSync(
        `${process.env.PWD}/${this.config.dev.sslKey}`,
        'utf8'
      )
      const certificate = fs.readFileSync(
        `${process.env.PWD}/${this.config.dev.sslCrt}`,
        'utf8'
      )
      const credentials = { key: privateKey, cert: certificate }

      this.server = require('https').Server(credentials, this.app)
    } else {
      this.server = require('http').Server(this.app)
    }

    this.server.listen(this.config.localServer.port, '0.0.0.0', err => {
      if (err) throw err

      this.initRouter()
    })
  }

  initRouter() {
    this.app.get('*', (req, res) => {
      res.send('server ready')
    })

    console.log(`🔥 ${chalk.blue('Ready on:')} ${this.config.dev.startUrl}\n`)
  }
}

module.exports = Server
