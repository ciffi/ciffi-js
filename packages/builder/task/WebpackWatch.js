const path = require('path')
const webpack = require('webpack')
const config = require(path.join(process.cwd(), 'builder', 'config.dev.js'))
const ProgressBar = require('../utils/ProgressBar')

const progressBar = new ProgressBar()

module.exports = (callback) => {
  const compiler = webpack(config)
  
  progressBar.init(100)
  
  new webpack.ProgressPlugin((percentage, msg) => {
    progressBar.update(percentage * 100)
  }).apply(compiler)
  
  compiler.watch({
    aggregateTimeout: 300,
    poll: 1000
  }, (err, stats) => {
    
    if (stats.hasErrors()) {
      console.error(stats.toString('errors-only'))
      return
    }
    
    const seconds = new Date(stats.endTime - stats.startTime).getSeconds()
    const milliseconds = new Date(stats.endTime - stats.startTime).getMilliseconds()
    
    callback(`  Built in ${seconds},${milliseconds} seconds`)
  })
}
