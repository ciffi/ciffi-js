const path = require('path')
const ConfigFile = require(path.join(process.cwd(), '.ciffisettings'))
const webpack = require('webpack')
const baseConfig = require('./config.js')

module.exports = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    publicPath: path.normalize(ConfigFile.localServer.absoluteBuildPath)
  },
  mode: 'development',
  performance: {
    hints: false
  },
  entry: {
    main: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      path.join(
        process.cwd(),
        ConfigFile.build.srcPathName,
        'scripts',
        'main.js'
      )
    ]
  },
  devtool: 'source-map',
  watch: true,
  plugins: [baseConfig.plugins[1], new webpack.HotModuleReplacementPlugin()]
}
