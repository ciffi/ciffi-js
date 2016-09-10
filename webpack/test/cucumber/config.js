'use strict';

var cucumberConfig = [{
	pattern: '../node_modules/karma-cucumberjs/vendor/cucumber-html.css',
	watched: false,
	included: false,
	served: true
}, {
	pattern: '../@REPLACE__ASSETS@/main.css',
	watched: true,
	included: true,
	served: true
}, {
	pattern: '../@REPLACE__ASSETS@/main.js',
	watched: true,
	included: true,
	served: true
}, {
	pattern: 'cucumber/app.template',
	watched: false,
	included: false,
	served: true
}, {
	pattern: 'cucumber/features/**/*.feature',
	watched: true,
	included: false,
	served: true
}, {
	pattern: 'cucumber/features/**/*.js',
	watched: true,
	included: true,
	served: true
}];

module.exports = cucumberConfig;