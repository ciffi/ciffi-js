var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
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
				loaders: ['style', 'css', 'postcss-loader', 'sass']
			},
			{
				test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loaders: ['base64-font-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + '/dev/index.html',
			filename: 'index.html',
			inject: 'body'
		}),
		new HtmlWebpackPlugin({
			template: __dirname + '/dev/example.html',
			filename: 'example.html',
			inject: 'body'
		}),
	],
	postcss: function () {
		return [autoprefixer];
	}
};