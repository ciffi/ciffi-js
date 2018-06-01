const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ConfigFile = require(__dirname + '/.ciffisettings');
const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  mode: 'production',
  performance: {
    hints: false
  },
  entry: {
    main: './' + ConfigFile.srcPathName + '/scripts/main.js'
  },
  output: {
    path: __dirname + '/' + ConfigFile.assetsPath,
    publicPath: ConfigFile.publicPath,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
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
    new HardSourceWebpackPlugin(),
    new UglifyJSPlugin({
      uglifyOptions: {
        sourceMap: false,
        comments: false
      }
    })
  ]
};