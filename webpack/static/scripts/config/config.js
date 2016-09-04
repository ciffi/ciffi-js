'use strict';

var Config = {
	projectName: '@REPLACE__CONFIG@',
	envs: {
		dev: {
			baseUrl: 'http://localhost',
			apiUrl: 'http://@REPLACE__CONFIG@.local/app_dev.php',
			shareUrl: 'http://localhost',
			assetsUrl: '/dev/'
		},
		local: {
			baseUrl: 'http://@REPLACE__CONFIG@.local',
			apiUrl: 'http://@REPLACE__CONFIG@.local/app_dev.php',
			shareUrl: 'http://@REPLACE__CONFIG@.local/app_dev.php',
			assetsUrl: 'http://@REPLACE__CONFIG@.local/@REPLACE__ASSETS__NAME@/'
		},
		stage: {
			baseUrl: 'http://@REPLACE__CONFIG@.ppreview.it',
			apiUrl: 'http://@REPLACE__CONFIG@.ppreview.it/app_stage.php',
			shareUrl: 'http://@REPLACE__CONFIG@.ppreview.it/app_stage.php',
			assetsUrl: 'http://@REPLACE__CONFIG@.ppreview.it/@REPLACE__ASSETS__NAME@/'
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