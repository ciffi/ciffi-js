var chalk = require('chalk');
var npm = require('npm');
var shell = require('shelljs');
var exec = require('child_process').exec;
var Loading = require('./loading');
var pkg = require('../package.json');

var MoveApp = (function () {
	
	function MoveApp() {
		
		var _tempPath = process.env.PWD + '/.ciffi/*';
		var _projectPath = process.env.PWD + '/';
		
		shell.cp('-R', _tempPath, _projectPath);
		shell.rm('-rf', _tempPath);
		
		console.log('');
		
		Loading.start('Download and install ' + chalk.blue('dependencies'));
		
		exec('yarn || npm install && ciffi --postsetup', function (errors) {
			
			if (errors) {
				
				Loading.stop('Download and install ' + chalk.blue('dependencies') + chalk.red.bold(' FAIL'));
				console.log('');
				console.log(chalk.red(errors));
				
			} else {
				
				Loading.stop('Download and install ' + chalk.blue('dependencies') + chalk.green.bold(' OK'));
				console.log('');
				console.log(chalk.blue('ciffi -h') + chalk.green(' for commands list'));
				console.log('');
				console.log(chalk.blue.bold(pkg.author.name) + chalk.blue.bold(' ^_^'));
				console.log('');
				
			}
			
		});
		
	}
	
	return new MoveApp();
})();

module.exports = MoveApp;