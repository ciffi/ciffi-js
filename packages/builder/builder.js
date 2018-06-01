#! /usr/bin/env node

let meow = require('meow');
let chalk = require('chalk');
let pkg = require('./package.json');
let exec = require('child_process').exec;
let fileExists = require('file-exists');
let ConfigFile = process.env.PWD + '/.ciffisettings';

let cli = meow({
	pkg: pkg
});

let opts = cli.flags;
let args = cli.input;
let cmd = args[0];

pkg = cli.pkg;

Object.keys(opts).forEach(function (key) {
	let legacyKey = key.replace(/[A-Z]/g, function (m) {
		return '-' + m.toLowerCase();
	});
	
	opts[legacyKey] = opts[key];
});

let _process = exec('npm config get prefix');

_process.stdout.on('data', function (path) {
	let _modulePath = path.trim();
	
	start(_modulePath);
});

function start() {
	if (!cmd) {
		if (opts.v) {
			console.log(chalk.magenta.bold(pkg.version));
		} else if (opts.a) {
			console.log(chalk.blue(pkg.author.name));
		} else {
			showCommandErrorMessage();
		}
	} else {
		
		let _cmd = cmd;
		let _env = fileExists.sync(ConfigFile) && require(ConfigFile).defaultBuildEnv ? require(ConfigFile).defaultBuildEnv : 'local';
		
		if (cmd.indexOf('build:') === 0) {
			_cmd = 'build';
			_env = cmd.split(':')[1];
		} else if (opts.env) {
			_env = opts.env;
		}
		
		switch (_cmd) {
			case 'build':
				require('./command/app-build')(_env);
				break;
			case 'dev':
				require('./command/app-dev');
				break;
			default:
				showCommandErrorMessage();
				break;
		}
	}
}

function showCommandErrorMessage() {
	console.log('');
	console.log('');
	console.log(chalk.red.bold('Command not found'));
	console.log('');
	console.log(chalk.blue('ciffi -h') + chalk.green(' -- commands list --'));
	console.log('');
}