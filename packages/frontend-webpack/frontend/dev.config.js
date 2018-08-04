const ConfigFile = require(__dirname + '/.ciffisettings');
const path = require('path');

module.exports = {
  mode: 'development',
  performance: {
    hints: false
  },
  entry: {
    main: path.join(__dirname, ConfigFile.srcPathName, 'scripts', 'main.js')
  },
  output: {
    publicPath: path.normalize(ConfigFile.publicPath),
    path: path.normalize(path.join(__dirname, ConfigFile.assetsPath + '/')),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  devtool: 'source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: [
          {
            loader: 'style-loader',
            options: {
              insertAt: 'top'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: [/(node_modules)/, path.join(__dirname, 'src', 'scripts', 'vendors')],
        options: {
          configFile: './.eslintrc'
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      },
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      },
      {
        test: /\.twig$/,
        loader: 'twig-loader'
      }
    ]
  },
  resolve: {
    alias: {}
  },
  plugins: []
};
