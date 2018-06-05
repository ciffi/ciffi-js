#! /usr/bin/env node
const reporter = require('cucumber-html-reporter');
const options = {
	theme: 'bootstrap',
	jsonFile: './test/e2e/reports/cucumber.json',
	output: './test/e2e/reports/cucumber.html',
	reportSuiteAsScenarios: true,
	launchReport: true,
	metadata: {
		// 'App Version': '0.3.2',
		// 'Test Environment': 'POC',
		// 'Browser': 'Chrome  54.0.2840.98',
		// 'Platform': 'Windows 10',
		// 'Parallel': 'Scenarios',
		// 'Executed': 'Remote'
	}
};

reporter.generate(options);