const path = require('path');
const ConfigFile = require(path.join('..', '.ciffisettings'));
const scssAssets = ConfigFile.useNodeSass ? '.' : '..';

module.exports = {
  output: {
    path: path.normalize(
      path.join(__dirname, '..', ConfigFile.assetsPath + '/')
    ),
    filename: '[name].js',
    chunkFilename: '[name].js',
    hotUpdateChunkFilename: '.hot/[name].[hash].hot-update.js',
    hotUpdateMainFilename: '.hot/[hash].hot-update.json'
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
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('autoprefixer')({})]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              data: `$assets: '${scssAssets}';`
            }
          }
        ]
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
      },
      {
        test: /\.(png|jpg|gif|svg|woff2|woff|ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {}
  },
  plugins: []
};
