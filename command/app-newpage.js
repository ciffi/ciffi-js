var chalk = require('chalk');
var shell = require('shelljs');
var fileExists = require('file-exists');
var replace = require('replace-in-file');
var Newpage = (function() {

  function Newpage(config) {

    var pageName = config.pageName;

    var _tempPath = process.config.variables.node_prefix+'/lib/node_modules/ciffi/tmp/';

    var _tempFileJs = _tempPath+pageName+'.js';
    var _resourceJs = process.config.variables.node_prefix+'/lib/node_modules/ciffi/resources/webpack/newpage/page.js';
    var _projectFileJs = process.env.PWD+'/dev/scripts/pages/'+pageName+'.js';

    if(fileExists(_projectFileJs)) {
      console.log(chalk.red('File già presente: '+_projectFileJs));
    }else {
      shell.cp(_resourceJs,_tempFileJs);
      replacePageName(_tempFileJs,pageName,function() {
        shell.cp(_tempFileJs,_projectFileJs);
        shell.rm('-rf', _tempFileJs);
        console.log(chalk.green('Nuovo file creato: '+_projectFileJs));
      });
    }

    var _tempFileHtml = _tempPath+pageName+'.html';
    var _resourceHtml = process.config.variables.node_prefix+'/lib/node_modules/ciffi/resources/webpack/newpage/page.html';
    var _projectFileHtml = process.env.PWD+'/dev/'+pageName+'.html';

    if(fileExists(_projectFileHtml)) {
      console.log(chalk.red('File già presente: '+_projectFileHtml));
    }else {
      shell.cp(_resourceHtml,_tempFileHtml);
      replacePageName(_tempFileHtml,pageName,function() {
        shell.cp(_tempFileHtml,_projectFileHtml);
        shell.rm('-rf', _tempFileHtml);
        console.log(chalk.green('Nuovo file creato: '+_projectFileHtml));
      });
    }
    
  }

  function replacePageName(file,pageName,callback) {
    replace({
      files: [
        file
      ],
      replace: /@REPLACE__PAGENAME@/g,
      with: pageName
    }, function(error, changedFiles) {
      if(error) {
        return console.error('Error occurred:', error);
      }
      callback();
    });
  }

  return Newpage;

})();

module.exports = Newpage;