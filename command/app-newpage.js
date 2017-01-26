var chalk = require('chalk');
var shell = require('shelljs');
var fileExists = require('file-exists');
var pathExists = require('path-exists');
var replace = require('replace-in-file');
var Newpage = (function () {
	
	function Newpage(config) {
		
		var pageName = config.pageName;
		
		var _tempPath = process.env.PWD + '/.ciffi/';
		
		pathExists(_tempPath).then(function (res) {
			if (!res) {
				shell.mkdir(_tempPath);
			}
		});
		
		var _tempFileJs = _tempPath + pageName + '.js';
		var _resourceJs = process.config.variables.node_prefix + '/lib/node_modules/ciffi/resources/webpack/newpage/page.js';
		var _projectPagesJs = process.env.PWD + '/static/scripts/pages/';
		var _projectFileJs = process.env.PWD + '/static/scripts/pages/' + pageName + '.js';
		
		if (fileExists(_projectFileJs)) {
			console.log(chalk.red('File already exists: ' + _projectFileJs));
		} else {
			pathExists(_projectPagesJs).then(function (res) {
				if (res) {
					shell.cp(_resourceJs, _tempFileJs);
					replacePageName(_tempFileJs, pageName, function () {
						shell.cp(_tempFileJs, _projectFileJs);
						shell.rm('-rf', _tempFileJs);
						console.log(chalk.green('New file created: ' + _projectFileJs));
					});
				} else {
					console.log(chalk.red('Pages path not exists: ' + _projectPagesJs));
				}
			});
		}
		
		var _tempFileHtml = _tempPath + pageName + '.html';
		var _resourceHtml = process.config.variables.node_prefix + '/lib/node_modules/ciffi/resources/webpack/newpage/page.html';
		var _projectDevPath = process.env.PWD + '/static/';
		var _projectFileHtml = process.env.PWD + '/static/' + pageName + '.html';
		
		if (fileExists(_projectFileHtml)) {
			console.log(chalk.red('File already exists: ' + _projectFileHtml));
		} else {
			pathExists(_projectDevPath).then(function (res) {
				if (res) {
					shell.cp(_resourceHtml, _tempFileHtml);
					replacePageName(_tempFileHtml, pageName, function () {
						shell.cp(_tempFileHtml, _projectFileHtml);
						shell.rm('-rf', _tempFileHtml);
						console.log(chalk.green('New file created: ' + _projectFileHtml));
					});
				} else {
					console.log(chalk.red('Project dev path not exists: ' + _projectDevPath));
				}
			});
		}
		
	}
	
	function capitalizeFirstLetter(string) {
		var _capitalized = string.charAt(0).toUpperCase() + string.slice(1);
		var _stringArray = _capitalized.split('-');
		var _result = '';
		for (var i = 0; i < _stringArray.length; i++) {
			_result += _stringArray[i].charAt(0).toUpperCase() + _stringArray[i].slice(1)
		}
		return _result;
	}
	
	function replacePageName(file, pageName, callback) {
		replace({
			files: [
				file
			],
			replace: /@REPLACE__PAGENAME@/g,
			with: capitalizeFirstLetter(pageName)
		}, function (error, changedFiles) {
			if (error) {
				return console.error('Error occurred:', error);
			}
			callback();
		});
	}
	
	return Newpage;
	
})();

module.exports = Newpage;