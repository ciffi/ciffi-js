var chalk = require('chalk');
var shell = require('shelljs');
var fileExists = require('file-exists');
var pathExists = require('path-exists');
var replace = require('replace-in-file');
var Newcomponent = (function () {
	
	function Newcomponent(config) {
		
		var componentName = config.componentName;
		
		var _tempPath = process.env.PWD + '/.ciffi/';
		
		pathExists(_tempPath).then(function (res) {
			if (!res) {
				shell.mkdir(_tempPath);
			}
		});
		
		var _tempFileJs = _tempPath + componentName + '.js';
		var _resourceJs = process.config.variables.node_prefix + '/lib/node_modules/ciffi/resources/webpack/newcomponent/component.js';
		var _projectComponents = process.env.PWD + '/static/scripts/components/';
		var _projectFileJs = process.env.PWD + '/static/scripts/components/' + componentName + '.js';
		
		if (fileExists(_projectFileJs)) {
			console.log(chalk.red('File already exists: ' + _projectFileJs));
		} else {
			pathExists(_projectComponents).then(function (res) {
				if (res) {
					shell.cp(_resourceJs, _tempFileJs);
					replaceComponentName(_tempFileJs, componentName, function () {
						shell.cp(_tempFileJs, _projectFileJs);
						shell.rm('-rf', _tempFileJs);
						console.log(chalk.green('New file created: ' + _projectFileJs));
					});
				} else {
					console.log(chalk.red('Components path not exists: ' + _projectComponents));
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
	
	function replaceComponentName(file, componentName, callback) {
		replace({
			files: [
				file
			],
			replace: /@REPLACE__COMPONENTNAME@/g,
			with: capitalizeFirstLetter(componentName)
		}, function (error, changedFiles) {
			if (error) {
				return console.error('Error occurred:', error);
			}
			callback();
		});
	}
	
	return Newcomponent;
	
})();

module.exports = Newcomponent;