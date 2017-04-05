var npm = require('npm');
var Build = (function () {
	
	function Build() {
		
		var _disabled = true;
		
		if (_disabled) {
			return console.log(chalk.red.bold('Sorry, but project build prod is still not available'));
		}
		
		npm.load(function (err) {
			
			npm.commands.run(['build-pro'], function (er, data) {
				
			});
			
			npm.on('log', function (message) {
				console.log(message);
			});
			
		});
	}
	
	return new Build();
})();

module.exports = Build;