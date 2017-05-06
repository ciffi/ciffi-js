'use strict';

var Config = {
	projectName: '@REPLACE__CONFIG@',
	env: {
		dev: {
			baseUrl: 'http://localhost',
			apiUrl: 'http://@REPLACE__CONFIG@.local/',
			shareUrl: 'http://localhost',
			assetsUrl: '/dev/'
		},
		local: {
			baseUrl: 'http://@REPLACE__CONFIG@.local',
			apiUrl: 'http://@REPLACE__CONFIG@.local/',
			shareUrl: 'http://@REPLACE__CONFIG@.local/',
			assetsUrl: 'http://@REPLACE__CONFIG@.local/@REPLACE__ASSETS__NAME@/'
		},
		stage: {
			baseUrl: 'http://@REPLACE__CONFIG@.stage.it',
			apiUrl: 'http://@REPLACE__CONFIG@.stage.it/',
			shareUrl: 'http://@REPLACE__CONFIG@.stage.it/',
			assetsUrl: 'http://@REPLACE__CONFIG@.stage.it/@REPLACE__ASSETS__NAME@/'
		},
		prod: {
			baseUrl: 'http://www.@REPLACE__CONFIG@.it',
			apiUrl: 'http://www.@REPLACE__CONFIG@.it',
			shareUrl: 'http://www.@REPLACE__CONFIG@.it',
			assetsUrl: 'http://www.@REPLACE__CONFIG@.it/@REPLACE__ASSETS__NAME@/'
		}
	}
};

module.exports = Config;