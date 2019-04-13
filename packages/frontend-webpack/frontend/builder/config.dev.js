const path = require('path')
const ConfigFile = require(path.join('..', '.ciffisettings'))
const baseConfig = require('./config.js')
const plugins = ConfigFile.general.offline ? [baseConfig.plugins[0]] : []

module.exports = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    publicPath: path.normalize(ConfigFile.build.absoluteBuildPath)
  },
  mode: 'development',
  performance: {
    hints: false
  },
  entry: {
    main: path.join(
      __dirname,
      '..',
      ConfigFile.build.srcPathName,
      'scripts',
      'main.js'
    )
  },
  devtool: 'source-map',
  watch: true,
  plugins: plugins
}
