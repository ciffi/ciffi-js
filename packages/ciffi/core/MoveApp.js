const ProcessManager = require('./ProcessManager')
const path = require('path')

class MoveApp {
  constructor(callback) {
    const tempPath = path.normalize(`${process.cwd()}/.ciffi/*`)
    const projectPath = path.normalize(`${process.cwd()}/`)

    new ProcessManager({
      process: `cp -R ${tempPath} ${projectPath} && rm -rf ${tempPath}`,
      onClose: callback
    })
  }
}

module.exports = MoveApp
