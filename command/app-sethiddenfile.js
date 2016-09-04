var chalk = require('chalk');
var shell = require('shelljs');
var fileExists = require('file-exists');
var pathExists = require('path-exists');
var SetupHiddenFiles = (function () {

	function SetupHiddenFiles() {

		yeah('eslintrc');
		yeah('gitignore');

	}

	function yeah(fileName) {

		var _tempPath = process.config.variables.node_prefix + '/lib/node_modules/ciffi/tmp/';

		pathExists(_tempPath).then(function (res) {
			if (!res) {
				shell.mkdir(_tempPath);
			}
		});

		var _tempFile = _tempPath + fileName;
		var _resource = process.config.variables.node_prefix + '/lib/node_modules/ciffi/resources/core/' + fileName;
		var _projectRoot = process.env.PWD + '/';
		var _projectFile = process.env.PWD + '/.' + fileName;

		if (fileExists(_projectFile)) {
			console.log(chalk.red('File already exists: ' + _projectFile));
		} else {
			pathExists(_projectRoot).then(function (res) {
				if (res) {
					shell.cp(_resource, _tempFile);
					shell.cp(_tempFile, _projectFile);
					shell.rm('-rf', _tempFile);
					console.log(chalk.green('New file created: ' + _projectFile));
				}
			});
		}

	}

	return new SetupHiddenFiles();

})();

module.exports = SetupHiddenFiles;