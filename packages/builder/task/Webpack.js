const path = require('path')
const webpack = require('webpack')
const config = require(path.join(process.cwd(), 'builder', 'config.build.js'))

webpack(config, (err, stats) => {
  const errors = stats.toString('errors-only')
  
  if (stats.hasErrors()) {
    console.error(errors)
    console.error('')
    return
  }
})
