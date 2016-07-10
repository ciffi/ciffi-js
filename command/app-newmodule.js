var chalk = require('chalk');
var shell = require('shelljs');
var fileExists = require('file-exists');
var replace = require('replace-in-file');
var Newmodule = (function() {

  function Newmodule(config) {

    var moduleName = config.moduleName;

    var _tempPath = process.config.variables.node_prefix+'/lib/node_modules/ciffi/tmp/';

    var _tempFileJs = _tempPath+moduleName+'.js';
    var _resourceJs = process.config.variables.node_prefix+'/lib/node_modules/ciffi/resources/webpack/newmodule/module.js';
    var _projectFileJs = process.env.PWD+'/dev/scripts/modules/'+moduleName+'.js';

    if(fileExists(_projectFileJs)) {
      console.log(chalk.red('File già presente: '+_projectFileJs));
    }else {
      shell.cp(_resourceJs,_tempFileJs);
      replaceModuleName(_tempFileJs,moduleName,function() {
        shell.cp(_tempFileJs,_projectFileJs);
        shell.rm('-rf', _tempFileJs);
        console.log(chalk.green('Nuovo file creato: '+_projectFileJs));
      });
    }

  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function replaceModuleName(file,moduleName,callback) {
    replace({
      files: [
        file
      ],
      replace: /@REPLACE__MODULENAME@/g,
      with: capitalizeFirstLetter(moduleName)
    }, function(error, changedFiles) {
      if(error) {
        return console.error('Error occurred:', error);
      }
      callback();
    });
  }

  return Newmodule;

})();

module.exports = Newmodule;