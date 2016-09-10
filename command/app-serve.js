var npm = require('npm');
var Serve = (function () {
	
	function Serve() {
		npm.load(function (err) {
			
			npm.commands.run(['serve'], function (er, data) {
				
			});
			
			npm.on('log', function (message) {
				console.log(message);
			});
			
		});
	}
	
	return new Serve();
})();

module.exports = Serve;