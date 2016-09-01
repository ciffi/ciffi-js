var autoprefixer = require('autoprefixer');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

function newPage(page) {
    return new HtmlWebpackPlugin({
        template: __dirname + '/dev/' + page + '.html',
        filename: page + '.html',
        inject: 'body'
    });
}

module.exports = {
    entry: {
        scripts: './dev/scripts/main.js'
    },
    output: {
        path: './dist',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
            },
            {
                test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: ['base64-font-loader']
            }
        ]
    },
    plugins: [
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        }),
        new ExtractTextPlugin('[name].css'),
        newPage('index'),
        newPage('example')
    ],
    postcss: function () {
        return [autoprefixer];
    }
};