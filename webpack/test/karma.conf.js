'use strict';

var autoprefixer = require('autoprefixer');

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['mocha', 'chai'],
		files: [{
			pattern: 'mocha/**/*.js',
			watched: false
		}],
		preprocessors: {
			'mocha/*.js': ['webpack'],
			'mocha/**/*.js': ['webpack']
		},
		webpack: {
			module: {
				loaders: [
					{
						test: /\.scss$/,
						loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
					},
					{
						test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
						loaders: ['base64-font-loader']
					}
				]
			},
			postcss: function () {
				return [autoprefixer];
			}
		},
		exclude: [],
		reporters: ['progress'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false,
		concurrency: Infinity
	});
};
