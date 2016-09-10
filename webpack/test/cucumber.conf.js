'use strict';

var cucumberConfig = require('./cucumber/config');

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['cucumberjs'],
		files: cucumberConfig,
		preprocessors: {
			'../static/scripts/main.js': ['webpack']
		},
		webpack: {
			output: {
				path: '../@REPLACE__ASSETS@',
				filename: '[name].js'
			},
			watch: true
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
