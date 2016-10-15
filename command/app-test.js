var npm = require('npm');
var Test = (function () {
	
	function Test() {
	}
	
	Test.prototype = {
		unit: function () {
			npm.load(function (err) {
				npm.commands.run(['test-unit'], function (er, data) {
					
				});
				
				npm.on('log', function (message) {
					console.log(message);
				});
				
			});
		},
		e2e: function () {
			npm.load(function (err) {
				npm.commands.run(['test-browser'], function (er, data) {
					
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