'use strict';

var Form = require('../../../../static/scripts/modules/form');

addStepDefinitions(function (scenario) {
	
	var validator = new Form();
	
	var _address = false;
	
	scenario.Given(/^Email to check is (.*)$/, function (address, callback) {
		_address = address;
		console.log('Email address ' + _address);
		callback();
	});
	
	scenario.Then(/^My email should be (.*)$/, function (isvalid, callback) {
		var _fixValid = (isvalid === 'true');
		var _isValid = validator.validateEmail(_address);
		if(_fixValid === _isValid) {
			callback();
		}else {
			callback.fail('Email validator fail --> ' + _fixValid + ' -- ' + _isValid);
		}
	});
	
});