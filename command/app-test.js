var npm = require('npm');
var Test = (function () {
	
	function Test() {
	}
	
	Test.prototype = {
		devUnit: function () {
			npm.load(function (err) {
				npm.commands.run(['dev-unit'], function (er, data) {
					if (er) {
						console.log('ciffi dev-unit error: ' + er);
					}
				});
				
				npm.on('log', function (message) {
					console.log(message);
				});
				
			});
		},
		unit: function () {
			npm.load(function (err) {
				npm.commands.run(['test-unit'], function (er, data) {
					if (er) {
						console.log('ciffi test-unit error: ' + er);
					}
				});
				
				npm.on('log', function (message) {
					console.log(message);
				});
				
			});
		},
		e2e: function (args) {
			var _cmd = (!args) ? 'test-e2e' : 'test-e2e-' + args[1];
			npm.load(function (err) {
				npm.commands.run([_cmd], function (er, data) {
					if (er) {
						console.log('ciffi test-e2e error: ' + er);
					}
				});
				
				npm.on('log', function (message) {
					console.log(message);
				});
				
			});
		}
	};
	
	return new Test();
})();

module.exports = Test;