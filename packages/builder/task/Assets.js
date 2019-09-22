const chalk = require('chalk')
const fileExists = require('file-exists')
const exec = require('child_process').exec
const path = require('path')
const ConfigFile = path.join(process.cwd(), '.ciffisettings')

const emptyCallback = () => {
}

class Assets {
  constructor(callback = emptyCallback) {
    if (fileExists.sync(ConfigFile)) {
      this.config = require(ConfigFile)
    } else {
      console.error(
        chalk.red.bold('☠️ Project build failed:') +
        ' ' +
        chalk.blue("can't find .ciffisettings file ☠️")
      )
      return console.log('')
    }
    
    if (!this.getAssets()) {
      callback()
      return
    }
    
    let process = exec(this.getAssets())
    
    process.stdout.on('data', res => {
      if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0) {
        console.log(chalk.red(res))
      } else {
        console.log('🦄 ' + chalk.blue(res))
      }
    })
    
    process.stderr.on('data', res => {
      if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0) {
        console.log(chalk.red(res))
      } else {
        console.log('🦄 ' + chalk.blue(res))
      }
    })
    
    process.on('close', res => {
      if (res === 0) {
        console.log(
          chalk.blue('🦄 Assets copied in ') +
          ' ' +
          this.config.build.path +
          '/ ' +
          chalk.green.bold(' OK')
        )
        console.log('')
        callback()
      }
    })
  }
  
  getAssets() {
    const staticFolders = this.config.general.staticFolders
    const staticFiles = this.config.general.staticFiles
    const assetPath =
      process.platform === 'win32'
        ? this.config.build.path.replace(/\//g, '\\')
        : this.config.build.path
    const assetPathName = this.config.build.srcPathName
    const pathsArray =
      staticFolders && staticFolders.length ? staticFolders : false
    const filesArray = staticFiles && staticFiles.length ? staticFiles : false
    
    if (filesArray) {
      let temp = ''
      
      for (let i = 0; i < filesArray.length; i++) {
        temp += "'" + path.join(assetPathName, filesArray[i]) + "' "
      }
      
      exec(
        `${path.join(
          'node_modules',
          '.bin',
          'copyfiles'
        )} -f ${temp} ${assetPath}`
      )
    }
    
    if (pathsArray) {
      let temp = ''
      
      for (let i = 0; i < pathsArray.length; i++) {
        temp +=
          "'" + path.join(assetPathName, pathsArray[i], '**', '*.*') + "' "
      }
      
      return `${path.join(
        'node_modules',
        '.bin',
        'copyfiles'
      )} -u 1 ${temp} ${assetPath}`
    }
    
    return
  }
}

module.exports = Assets
