var chalk = require('chalk');
var shell = require('shelljs');
var fileExists = require('file-exists');
var pathExists = require('path-exists');
var Loading = require('./loading');

var CreatePackage = (function (features, modulePath, callback) {
    
    function CreatePackage() {
        console.log('');
        
        Loading.start('Generate ' + chalk.blue('package.json'));
        
        yeah('package.json', features, function () {
            
            Loading.stop('Generate ' + chalk.blue('package.json') + chalk.green.bold(' OK'));
            
            callback();
            
        });
    }
    
    function generateFile(features) {
        
        var _fileName = 'lite.json';
        
        switch (features.join('+')) {
            case 'testing' :
                _fileName = 'testing.json';
                break;
            case 'styleguides' :
                _fileName = 'styleguides.json';
                break;
            case 'testing+styleguides' :
                _fileName = 'full.json';
                break;
            default:
                _fileName = 'lite.json'
        }
        
        return _fileName;
    }
    
    function yeah(fileName, features, callback) {
        
        var _tempPath = process.env.PWD + '/.ciffi/';
        
        pathExists(_tempPath).then(function (res) {
            if (!res) {
                shell.mkdir(_tempPath);
            }
        });
        
        var _generatedFile = generateFile(features);
        
        var _tempFile = _tempPath + fileName;
        var _resource = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-' + 'webpack' + '/resources/package/' + _generatedFile;
        var _projectRoot = process.env.PWD + '/';
        var _projectFile = process.env.PWD + '/' + fileName;
        
        shell.cp(_resource, _tempFile);
        
        if (fileExists(_projectFile)) {
            console.log(chalk.red('File already exists: ' + _projectFile));
        } else {
            pathExists(_projectRoot).then(function (res) {
                if (res) {
                    shell.cp(_tempFile, _projectFile);
                    shell.rm('-rf', _tempFile);
                    //shell.rm('-rf', _projectRoot + '/' + fileName);
                    
                    callback();
                }
            });
        }
        
    }
    
    return new CreatePackage();
    
});

module.exports = CreatePackage;