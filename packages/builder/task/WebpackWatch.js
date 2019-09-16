const path = require('path')
const webpack = require('webpack')
const config = require(path.join(process.cwd(), 'builder', 'config.dev.js'))

webpack(config).watch({
  aggregateTimeout: 300,
  poll: 1000
}, (err, stats) => {
  
  if (stats.hasErrors()) {
    console.error(stats.toString('errors-only'))
    return
  }
  
  const seconds = new Date(stats.endTime - stats.startTime).getSeconds()
  const milliseconds = new Date(stats.endTime - stats.startTime).getMilliseconds()
  
  console.error(`Built in ${seconds},${milliseconds} seconds`)
})
