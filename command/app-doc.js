var chalk = require('chalk');
var fileExists = require('file-exists');
var exec = require('child_process').exec;
var Log = require('single-line-log').stdout;
var ConfigFile = process.env.PWD + '/.ciffisettings';

var Doc = (function () {
	
	function Doc() {
		
		if (fileExists.sync(ConfigFile)) {
			_CONFIG = require(ConfigFile);
		} else {
			console.log(chalk.red.bold('☠️  Project build failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
			return console.log('');
		}
		
		var _assetPath = _CONFIG.assetsPath;
		var _assetPathName = _CONFIG.assetsPathName;
		var _concat = ' && ';
		var _cleanDist = 'rm -rf ' + _assetPath + '/*';
		var _css = './node_modules/.bin/node-sass ' + _assetPathName + '/styles/main.scss ' + _assetPath + '/main.css';
		var _autoprefixer = './node_modules/.bin/postcss --use autoprefixer --autoprefixer.browsers \'last 12 versions\' -o ' + _assetPath + '/main.css ' + _assetPath + '/main.css';
		var _cleancss = './node_modules/.bin/cleancss -o ' + _assetPath + '/main.css ' + _assetPath + '/main.css'
		var _styles = _css + _concat + _autoprefixer + _concat + _cleancss;
		var _js = './node_modules/.bin/webpack --config build.config.js -p --progress';
		var _copyImages = './node_modules/.bin/copyfiles -u 1 \'' + _assetPathName + '/images/**/*.*\' ' + _assetPath + '/';
		var _copyFonts = './node_modules/.bin/copyfiles -u 1 \'' + _assetPathName + '/fonts/**/*.*\' ' + _assetPath + '/';
		var _copyPdf = './node_modules/.bin/copyfiles -u 1 \'' + _assetPathName + '/pdf/**/*.*\' ' + _assetPath + '/';
		var _copyVideos = './node_modules/.bin/copyfiles -u 1 \'' + _assetPathName + '/videos/**/*.*\' ' + _assetPath + '/';
		var _assets = _copyImages + _concat + _copyFonts + _concat + _copyPdf + _concat + _copyVideos;
		var _build = _cleanDist + _concat + _styles + _concat + _js + _concat + _assets;
		var _jsdoc = './node_modules/.bin/jsdoc ' + _assetPathName + '/scripts/components -d ' + replaceBuildPath(_assetPath, 'jsdoc');
		var _cssdoc = './node_modules/.bin/sassdoc ' + _assetPathName + '/styles -d ' + replaceBuildPath(_assetPath, 'cssdoc');
		var _styleguide = './node_modules/.bin/kss --source ./' + _assetPathName + '/styles/ --destination ' + replaceBuildPath(_assetPath, 'styleguide') + ' --css ../' + _assetPathName + '/main.css --js ../' + _assetPathName + '/main.js';
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
			var _process = exec(this.process.jsdoc);
			var _docPath = this.docPath.jsdoc;
			run(_process, 'Javascript documentation', _docPath);
		},
		cssdoc: function () {
			var _process = exec(this.process.cssdoc);
			var _docPath = this.docPath.cssdoc;
			run(_process, 'Scss documentation', _docPath);
		},
		styleguide: function () {
			var _process = exec(this.process.styleguide);
			var _docPath = this.docPath.styleguide;
			run(_process, 'Styleguide', _docPath);
		}
	};
	
	function replaceBuildPath(buildPath, docType) {
		var _pathArray = buildPath.split('/');
		
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