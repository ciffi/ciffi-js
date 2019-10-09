const { red } = require('chalk')
const path = require('path')
const webpack = require('webpack')
const config = require('../config/config.build')
const ProgressBar = require('../utils/ProgressBar')
const ConfigFile = require(path.join(process.cwd(), '.ciffisettings'))

const progressBar = new ProgressBar({ ...ConfigFile.custom.progressBar })

module.exports = callback => {
  const compiler = webpack(config)

  progressBar.init(100)

  new webpack.ProgressPlugin((percentage, msg) => {
    progressBar.update(percentage * 100)
  }).apply(compiler)

  compiler.run((err, stats) => {
    const errors = stats.toString('errors-only')

    if (stats.hasErrors()) {
      console.error(red(stats.toString('errors-only')))
      console.error('\n')
      return
    }

    const seconds = new Date(stats.endTime - stats.startTime).getSeconds()
    const milliseconds = new Date(
      stats.endTime - stats.startTime
    ).getMilliseconds()

    console.log(
      stats.toString({
        builtAt: false,
        colors: true,
        children: false,
        chunks: false,
        chunkModules: false,
        entrypoints: false,
        modules: false,
        hash: false,
        timings: false,
        version: false
      }) + '\n'
    )

    callback(`  Built in ${seconds},${milliseconds} seconds`)
  })
}
