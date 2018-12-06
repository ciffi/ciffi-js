const path = require('path');
const ConfigFile = require(__dirname + '/.ciffisettings');
const webpack = require('webpack');
const baseConfig = require('./config/webpack');

module.exports = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    publicPath: path.normalize(ConfigFile.publicLocalServerPath)
  },
  mode: 'development',
  performance: {
    hints: false
  },
  entry: {
    main: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      path.join(__dirname, ConfigFile.srcPathName, 'scripts', 'main.js')
    ]
  },
  devtool: 'source-map',
  watch: true,
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
