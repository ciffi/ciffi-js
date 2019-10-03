const ProcessManager = require('./ProcessManager')
const pathExists = require('path-exists')
const path = require('path')

class TempApp {
  constructor(modulePath, callback) {
    this.config = {
      callback: callback,
      modulePath: path.normalize(
        modulePath +
          '/lib/node_modules/ciffi/node_modules/ciffi-js-webpack/frontend/*'
      ),
      tempPath: path.normalize(process.cwd() + '/.ciffi/')
    }

    pathExists(this.config.tempPath).then(res => {
      if (!res) {
        new ProcessManager({
          process: `mkdir ${this.config.tempPath}`,
          onClose: () => {
            this.copy(this.config.callback)
          }
        })
      } else {
        this.copy(this.config.callback)
      }
    })
  }

  copy(onClose) {
    new ProcessManager({
      process: `cp -R ${this.config.modulePath} ${this.config.tempPath}`,
      onClose
    })
  }
}

module.exports = TempApp
