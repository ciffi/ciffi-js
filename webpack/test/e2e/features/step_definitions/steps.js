'use strict';

module.exports = function () {
	this.Given(/^I open Ciffi's home page$/, function () {
		this.url('http://ciffi.it').waitForElementVisible('body', 1000);
	});
	
	this.Then(/^the title is "([^"]*)"$/, function (title) {
		this.assert.title(title);
	});
	
	this.Then(/^the canvas animation exists$/, function () {
		this.assert.visible('canvas#bgCanvas');
	});
};