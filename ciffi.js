#! /usr/bin/env node
const meow = require('meow');
const chalk = require('chalk');
const cliCursor = require('cli-cursor');
const Commands = require('./commands/app-commands');
const exec = require('child_process').exec;
const fileExists = require('file-exists');
const ConfigFile = process.env.PWD + '/.ciffisettings';

let pkg = require('./package.json');

const cli = meow({
	pkg: pkg
});

const opts = cli.flags;
const args = cli.input;
const cmd = args[0];
const projectName = args[1];

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

function start(modulePath) {
	if (!cmd) {
		if (opts.h) {
			showCommandListMsg();
		} else if (opts.v) {
			console.log(chalk.magenta.bold(pkg.version));
		} else if (opts.a) {
			console.log(chalk.blue(pkg.author.name));
		} else if (opts.logo) {
			showLogo();
		} else if (opts.postsetup) {
			cliCursor.show();
			showGreetings();
		} else {
			showCommandErrorMessage();
		}
	} else {
		
		let _cmd = cmd;
		let _env = fileExists.sync(ConfigFile) && require(ConfigFile).defaultBuildEnv ? require(ConfigFile).defaultBuildEnv : 'local';
		
		if (cmd.indexOf('build:') === 0) {
			_cmd = 'build';
			_env = cmd.split(':')[1];
		}
		
		if (cmd.indexOf('config:') === 0) {
			_cmd = 'config';
			_env = cmd.split(':')[1];
		}
		
		switch (_cmd) {
			case 'setup':
				let Setup = require('./commands/app-setup')(modulePath);
				new Setup({
					projectName: projectName
				});
				break;
			case 'serve':
				require('./commands/app-serve');
				break;
			case 'dev':
				require('./commands/app-dev');
				break;
			case 'build':
				require('./commands/app-build')(_env);
				break;
			case 'build-es6':
				require('./commands/app-build-es6');
				break;
			case 'build-prod':
				console.log(chalk.red.bold('Sorry, but build-prod task is still not available'));
				break;
			case 'dev-old':
				require('./commands/app-dev-old');
				break;
			case 'build-old':
				require('./commands/app-build-prod');
				break;
			case 'config':
				require('./commands/app-config')(_env);
				break;
			case 'dev-unit':
				console.log(chalk.red.bold('Sorry, but dev-unit task is still not available'));
				break;
			case 'unit':
				console.log(chalk.red.bold('Sorry, but unit task is still not available'));
				break;
			case 'e2e':
				let _args = false;
				if (args[1]) {
					_args = args;
				}
				require('./commands/app-test').e2e(_args);
				break;
			case 'newpage':
				let Page = require('./commands/app-newpage')(modulePath);
				new Page({
					pageName: projectName
				});
				break;
			case 'newmodule':
				let Module = require('./commands/app-newmodule')(modulePath);
				new Module({
					moduleName: projectName
				});
				break;
			case 'newcomponent':
				let Component = require('./commands/app-newcomponent')(modulePath);
				new Component({
					componentName: projectName
				});
				break;
			case 'jsdoc':
				require('./commands/app-doc').jsdoc();
				break;
			case 'cssdoc':
				require('./commands/app-doc').cssdoc();
				break;
			case 'styleguide':
				require('./commands/app-doc').styleguide();
				break;
			case 'assets':
				require('./commands/app-assets');
				break;
			case 'styles':
				require('./commands/app-styles');
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

function showGreetings() {
	console.log('');
	console.log('');
	Commands.show();
	console.log(chalk.blue.bold(pkg.author.name) + chalk.blue.bold(' ^_^'));
	console.log('');
}

function showCommandListMsg() {
	console.log('');
	console.log('');
	console.log(chalk.green.bold('-- Ciffi Frontend Generator --'));
	console.log('');
	console.log('');
	console.log('Available commands:');
	console.log('');
	Commands.show();
	console.log('');
}

function showLogo() {
	console.log(chalk.black(''));
	console.log(chalk.black('           `-+shmNNNNNNmhy+:`           '));
	console.log(chalk.black('        .odNmmNNNNNNNNNNNNmmNdo-        '));
	console.log(chalk.black('      /dNmmNMMMMMMMMMMMMsmMMNmmNm+      '));
	console.log(chalk.black('    :mNmNMMMMMMm:NMMMMMM:NMMMMMNmNN/    '));
	console.log(chalk.black('   sMmNMMMMMMMMMm:NMMMMM-MMMMMMMMhmMh`  '));
	console.log(chalk.black('  hMdMhssymMMMMMMd:MMMMyoMMMMMNs+dMdNm` '));
	console.log(chalk.black(' yMdMMMMMNhsoyNMMMsoMMy+MMMMmoomMMMMdMd '));
	console.log(chalk.black(':MdMMMMMMMMMMNsosNM-NsoMmysosNMMMMMMMdM+'));
	console.log(chalk.black('hMdMMMMMMMMMMdos:-+:+-s::+sssssNMMMMMmMm'));
	console.log(chalk.black('mMmMMMMMMMMNy.dMdM:-mmooddohMMMMMMMMMMdM'));
	console.log(chalk.black('mMmMMMMMMMMNy.mMmM:-mmoodhohMMMMMMMMMMdM'));
	console.log(chalk.black('hMdMMMMMMMMMMdos:-/:+-o-:osssssNMMMMMmNm'));
	console.log(chalk.black(':MdMMMMMMMMMMNyosNM-NsoMmysoyMMMMMMMMdMo'));
	console.log(chalk.black(' yMdMMMMMNhsosmMMMyoMMy+MMMMmooNMMMMdNm '));
	console.log(chalk.black(' `dMdMhssydMMMMMMd:MMMMyoMMMMMNsodMmNm. '));
	console.log(chalk.black('   yMmNMMMMMMMMMm:NMMMMM-MMMMMMMMhmMh`  '));
	console.log(chalk.black('    :mNmNMMMMMMm:NMMMMMM:NMMMMMNmNN+    '));
	console.log(chalk.black('      /dNmmNMMMMMMMMMMMMsmMMNmmNm+`     '));
	console.log(chalk.black('        .odNmmNNNNNMMMNNNNmmNms-        '));
	console.log(chalk.black('           `:oydmNNNNNNmdyo:`           '));
	console.log(chalk.black(''));
}