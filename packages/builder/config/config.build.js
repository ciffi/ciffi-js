const path = require('path')
const ConfigFile = require(path.resolve(process.cwd(), '.ciffisettings'))
const baseConfig = require('./config.js')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const plugins = [new MiniCssExtractPlugin()]

if (ConfigFile.general.offline) {
  plugins.push(baseConfig.plugins[0])
}

module.exports = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    publicPath: path.normalize(ConfigFile.build.absoluteBuildPath)
  },
  mode: 'production',
  performance: {
    hints: false
  },
  optimization: {
    ...baseConfig.optimization,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {}
      })
    ]
  },
  entry: {
    main: path.join(
      process.cwd(),
      ConfigFile.build.srcPathName,
      'scripts',
      'main.js'
    )
  },
  plugins: plugins
}
