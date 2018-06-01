const ConfigFile = require(__dirname + '/.ciffisettings');
const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  mode: 'development',
  performance: {
    hints: false
  },
  entry: {
    main: './' + ConfigFile.srcPathName + '/scripts/main.js'
  },
  output: {
    publicPath: ConfigFile.publicPath,
    path: __dirname + '/' + ConfigFile.assetsPath,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  devtool: 'source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: [{
          loader: 'style-loader',
          options: {
            insertAt: 'top'
          }
        }, 'css-loader', 'sass-loader']
      }, {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: [/(node_modules)/, __dirname + '/' + 'src/scripts/vendors'],
        options: {
          configFile: './.eslintrc'
        }
      }, {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'es2017', 'stage-0'],
            plugins: ['transform-runtime']
          }
        }
      }, {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'es2017', 'stage-0'],
            plugins: ['transform-runtime']
          }
        }
      }, {
        test: /\.twig$/,
        loader: 'twig-loader'
      }
    ]
  },
  resolve: {
    alias: {
      Config: path.resolve(__dirname, ConfigFile.srcPathName + '/scripts/config/config.js'),
    }
  },
  plugins: [
    new HardSourceWebpackPlugin()
  ]
};