var seleniumServer = require('selenium-server');
var phantomjs = require('phantomjs-prebuilt');
var chromedriver = require('chromedriver');
var firefoxdriver = require('geckodriver');

require('nightwatch-cucumber')({
	cucumberArgs: [
		//'--require', './test/e2e/hooks/hooks.js',
		'--require', './test/e2e/features',
		'--format', './node_modules/cucumber-pretty',
		'--format', 'json:./test/e2e/reports/cucumber.json',
		//'--format', 'snippets',
		'./test/e2e/features'
	],
	nightwatchOutput: false
});

module.exports = {
	custom_commands_path: '',
	custom_assertions_path: '',
	live_output: false,
	disable_colors: false,
	
	selenium: {
		start_process: true,
		server_path: seleniumServer.path,
		log_path: './test/e2e',
		host: '127.0.0.1',
		port: 4444
	},
	
	test_settings: {
		default: {
			launch_url: 'http://localhost',
			selenium_port: 4444,
			selenium_host: 'localhost',
			silent: true,
			screenshots: {
				enabled: true,
				on_failure: true,
				on_error: false,
				path: './test/e2e/screenshots/default'
			},
			desiredCapabilities: {
				browserName: 'phantomjs',
				javascriptEnabled: true,
				acceptSslCerts: true,
				'phantomjs.binary.path': phantomjs.path
			}
		},
		
		chrome: {
			desiredCapabilities: {
				browserName: 'chrome',
				javascriptEnabled: true,
				acceptSslCerts: true
			},
			selenium: {
				cli_args: {
					'webdriver.chrome.driver': chromedriver.path
				}
			}
		},
		
		firefox: {
			desiredCapabilities: {
				browserName: 'firefox',
				javascriptEnabled: true,
				acceptSslCerts: true,
				marionette: true
			},
			selenium: {
				cli_args: {
					'webdriver.gecko.driver': firefoxdriver.path
				}
			}
		}
	}
};