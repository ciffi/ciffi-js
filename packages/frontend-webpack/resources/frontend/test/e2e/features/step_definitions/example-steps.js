const {client} = require('nightwatch-cucumber');
const {defineSupportCode} = require('cucumber');

defineSupportCode(({Given, Then, When}) => {
	Given('I open Ciffi\'s home page', () => {
		return client.url('https://www.ciffi.it').waitForElementVisible('body', 1000);
	});
	
	Then('the title is {string}', function (title) {
		return client.assert.title(title);
	});
	
	Then('the canvas animation exists', function () {
		return client.assert.visible('canvas#bgCanvas');
	});
});