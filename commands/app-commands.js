let chalk = require('chalk');

let Commands = (function () {
	
	function Commands() {
		
	}
	
	Commands.prototype.show = function () {
		return commandList();
	};
	
	function commandList() {
		console.log(chalk.blue('ciffi setup projectname') + chalk.green(' -- create new project --'));
		console.log('');
		console.log(chalk.blue('ciffi dev') + chalk.green(' -- start livereload server and generate local build with watch --'));
		console.log('');
		console.log(chalk.blue('ciffi build') + chalk.green(' -- generate build --'));
		console.log('');
		console.log(chalk.blue('ciffi e2e') + chalk.green(' -- e2e test with nightwatch and cucumber (default configuration) --'));
		console.log('');
		console.log(chalk.blue('ciffi e2e chrome //default, chrome or firefox') + chalk.green(' -- e2e test with nightwatch and cucumber (custom configuration) --'));
		console.log('');
		console.log(chalk.blue('ciffi newpage pagename') + chalk.green(' -- create new html and js page --'));
		console.log('');
		console.log(chalk.blue('ciffi newmodule modulename') + chalk.green(' -- create new js module --'));
		console.log('');
		console.log(chalk.blue('ciffi newcomponent componentname') + chalk.green(' -- create new js component --'));
		console.log('');
		console.log(chalk.blue('ciffi jsdoc') + chalk.green(' -- generate javascript documentation with jsdoc into ./jsdoc path --'));
		console.log('');
		console.log(chalk.blue('ciffi cssdoc') + chalk.green(' -- generate sass documentation with sassdoc into ./cssdoc path --'));
		console.log('');
		console.log(chalk.blue('ciffi styleguide') + chalk.green(' -- generate style guides with kss into ./styleguide path --'));
		console.log('');
	}
	
	return new Commands();
	
})();

module.exports = Commands;