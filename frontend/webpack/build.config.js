'use strict';

module.exports = {
	entry: {
		main: './@REPLACE__ASSETS__NAME@/scripts/main.js'
	},
	output: {
		path: '@REPLACE__ASSETS@',
		filename: '[name].js'
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: './node_modules'
			}, {
				test: /\.twig$/,
				loader: 'twig-loader'
			}
		]
	},
	eslint: {
		configFile: './.eslintrc'
	}
};