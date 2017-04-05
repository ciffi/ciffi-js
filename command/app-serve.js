var npm = require('npm');
var Serve = (function () {
	
	function Serve() {
		
		var _disabled = true;
		
		if (_disabled) {
			return console.log(chalk.red.bold('Sorry, but serve task is still not available'));
		}
		
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