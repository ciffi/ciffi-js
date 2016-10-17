var npm = require('npm');
var Doc = (function () {
	
	function Doc() {
	}
	
	Doc.prototype = {
		jsdoc: function () {
			npm.load(function (err) {
				
				npm.commands.run(['jsdoc'], function (er, data) {
					
				});
				
				npm.on('log', function (message) {
					console.log(message);
				});
				
			});
		},
		cssdoc: function () {
			npm.load(function (err) {
				
				npm.commands.run(['cssdoc'], function (er, data) {
					
				});
				
				npm.on('log', function (message) {
					console.log(message);
				});
				
			});
		},
		styleguide: function () {
			npm.load(function (err) {
				
				npm.commands.run(['styleguide'], function (er, data) {
					
				});
				
				npm.on('log', function (message) {
					console.log(message);
				});
				
			});
		}
	};
	
	return new Doc();
})();

module.exports = Doc;