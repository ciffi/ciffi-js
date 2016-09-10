'use strict';

addStepDefinitions(function (scenario) {
	
	scenario.Given(/^I have "([^"]*)" tag$/, function (arg1, callback) {
		var _haveBody = $(arg1).length;
		
		if (_haveBody) {
			callback();
		} else {
			callback.fail('tag body not found');
		}
	});
	
	scenario.Then(/^"([^"]*)" must have className "([^"]*)"$/, function (arg1, arg2, callback) {
		var _hasClass = $(arg1).hasClass(arg2);
		
		if (_hasClass) {
			callback();
		} else {
			callback.fail('className not found');
		}
	});
	
	scenario.Then(/^"([^"]*)" must have css "([^"]*)" "([^"]*)"$/, function (arg1, arg2, arg3, callback) {
		var _isValid = ($(arg1).css(arg2) === arg3);
		
		if (_isValid) {
			callback();
		} else {
			callback.fail('bg not corresponds');
		}
	});
	
});