let chalk = require('chalk');
let fileExists = require('file-exists');
let exec = require('child_process').exec;
let Log = require('single-line-log').stdout;
let ConfigFile = process.env.PWD + '/.ciffisettings';

let Doc = (function () {
	
	function Doc() {
		
		if (fileExists.sync(ConfigFile)) {
			_CONFIG = require(ConfigFile);
		} else {
			console.log(chalk.red.bold('☠️  Project build failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
			return console.log('');
		}
		
		let _assetPath = _CONFIG.assetsPath;
		let _assetPathName = _CONFIG.assetsPathName;
		let _concat = ' && ';
		let _cleanDist = 'rm -rf ' + _assetPath + '/*';
		let _css = './node_modules/.bin/node-sass ' + _assetPathName + '/styles/main.scss ' + _assetPath + '/main.css';
		let _autoprefixer = './node_modules/.bin/postcss --use autoprefixer --autoprefixer.browsers \'last 12 versions\' -o ' + _assetPath + '/main.css ' + _assetPath + '/main.css';
		let _cleancss = './node_modules/.bin/cleancss -o ' + _assetPath + '/main.css ' + _assetPath + '/main.css'
		let _styles = _css + _concat + _autoprefixer + _concat + _cleancss;
		let _js = './node_modules/.bin/webpack --config build.config.js -p --progress';
		let _copyImages = './node_modules/.bin/copyfiles -u 1 \'' + _assetPathName + '/images/**/*.*\' ' + _assetPath + '/';
		let _copyFonts = './node_modules/.bin/copyfiles -u 1 \'' + _assetPathName + '/fonts/**/*.*\' ' + _assetPath + '/';
		let _copyPdf = './node_modules/.bin/copyfiles -u 1 \'' + _assetPathName + '/pdf/**/*.*\' ' + _assetPath + '/';
		let _copyVideos = './node_modules/.bin/copyfiles -u 1 \'' + _assetPathName + '/videos/**/*.*\' ' + _assetPath + '/';
		let _assets = _copyImages + _concat + _copyFonts + _concat + _copyPdf + _concat + _copyVideos;
		let _build = _cleanDist + _concat + _styles + _concat + _js + _concat + _assets;
		let _jsdoc = './node_modules/.bin/jsdoc ' + _assetPathName + '/scripts/components -d ' + replaceBuildPath(_assetPath, 'jsdoc');
		let _cssdoc = './node_modules/.bin/sassdoc ' + _assetPathName + '/styles -d ' + replaceBuildPath(_assetPath, 'cssdoc');
		let _styleguide = './node_modules/.bin/kss --source ./' + _assetPathName + '/styles/ --destination ' + replaceBuildPath(_assetPath, 'styleguide') + ' --css ../' + _assetPathName + '/main.css --js ../' + _assetPathName + '/main.js';
		this.process = {
			jsdoc: _js + _concat + 'rm -rf ' + replaceBuildPath(_assetPath, 'jsdoc') + _concat + _jsdoc,
			cssdoc: _assets + _concat + 'rm -rf ' + replaceBuildPath(_assetPath, 'cssdoc') + _concat + _cssdoc,
			styleguide: _build + _concat + 'rm -rf ' + replaceBuildPath(_assetPath, 'styleguide') + _concat + _styleguide
		};
		
		this.docPath = {
			jsdoc: replaceBuildPath(_assetPath, 'jsdoc'),
			cssdoc: replaceBuildPath(_assetPath, 'cssdoc'),
			styleguide: replaceBuildPath(_assetPath, 'styleguide')
		};
		
	}
	
	Doc.prototype = {
		jsdoc: function () {
			let _process = exec(this.process.jsdoc);
			let _docPath = this.docPath.jsdoc;
			run(_process, 'Javascript documentation', _docPath);
		},
		cssdoc: function () {
			let _process = exec(this.process.cssdoc);
			let _docPath = this.docPath.cssdoc;
			run(_process, 'Scss documentation', _docPath);
		},
		styleguide: function () {
			let _process = exec(this.process.styleguide);
			let _docPath = this.docPath.styleguide;
			run(_process, 'Styleguide', _docPath);
		}
	};
	
	function replaceBuildPath(buildPath, docType) {
		let _pathArray = buildPath.split('/');
		
		_pathArray[_pathArray.length - 1] = docType;
		
		return _pathArray.join('/');
	}
	
	function run(process, message, _docPath) {
		process.stdout.on('data', function (res) {
			if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0) {
				console.log(chalk.red(res));
			} else {
				Log('🏗  ' + chalk.blue(res));
			}
		});
		
		process.stderr.on('data', function (res) {
			if (res.indexOf('ERROR in') >= 0 || res.indexOf('Error:') >= 0) {
				console.log(chalk.red(res));
			} else {
				Log('🏗  ' + chalk.blue(res));
			}
		});
		
		process.on('close', function (res) {
			if (res === 0) {
				Log(chalk.blue('🏗  ' + message) + ' ' + _docPath + ' ' + chalk.green.bold(' OK'));
			}
			console.log('');
		});
	}
	
	return new Doc();
})();

module.exports = Doc;