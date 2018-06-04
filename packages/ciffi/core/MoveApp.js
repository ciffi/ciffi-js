let chalk = require('chalk');
let npm = require('npm');
let shell = require('shelljs');
let exec = require('child_process').exec;
let CiffiDependencies = require('./Dependencies');
let pkg = require('../package.json');

let MoveApp = (function (whatWant) {
	
	function MoveApp() {
		
		let _tempPath = process.env.PWD + '/.ciffi/*';
		let _projectPath = process.env.PWD + '/';
		
		shell.cp('-R', _tempPath, _projectPath);
		shell.rm('-rf', _tempPath);
		
		CiffiDependencies.download(whatWant, function () {
			exec('ciffi --postsetup', function () {
				console.log(chalk.blue('ciffi -h') + chalk.green(' for core list'));
				console.log('');
				console.log(chalk.blue.bold(pkg.author.name) + chalk.blue.bold(' ^_^'));
				console.log('');
			});
		});
		
	}
	
	return new MoveApp();
});

module.exports = MoveApp;