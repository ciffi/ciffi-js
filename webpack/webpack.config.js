var Pages = require('./dev/scripts/config/pages');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HappyPack = require('happypack');

function newPage(page) {
	return new HtmlWebpackPlugin({
		template: __dirname + '/dev/'+page+'.html',
		filename: page+'.html',
		inject: 'body'
	});
}

module.exports = {
	entry: {
		scripts: './dev/scripts/main.js',
	},
	output: {
		path: './dist',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'postcss-loader', 'sass'],
				happy: {
					id: 'styles'
				}
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
		new HappyPack({
			id: 'styles'
		}),
		newPage('index'),
		newPage('example')
	],
	postcss: function () {
		return [autoprefixer];
	}
};