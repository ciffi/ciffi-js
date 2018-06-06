const ConfigFile = require(__dirname + '/.ciffisettings');
const path = require('path');

module.exports = {
  mode: 'development',
  performance: {
    hints: false
  },
  entry: {
    main: path.join(__dirname, ConfigFile.srcPathName + '/scripts/main.js')
  },
  output: {
    publicPath: path.join(__dirname, ConfigFile.assetsPath + '/'),
    path: path.join(__dirname, ConfigFile.assetsPath + '/'),
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
      Theme: path.resolve(__dirname, ConfigFile.srcPathName + '/scripts/config/theme.js')
    }
  },
  plugins: [
  
  ]
};