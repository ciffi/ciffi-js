var {defineSupportCode} = require('cucumber');

defineSupportCode(function ({After, Before}) {
	
	Before(function () {
		console.log('start test');
	});
	
	After(function () {
		console.log('end test');
	});
});