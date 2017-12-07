let chalk = require('chalk');
let shell = require('shelljs');
let replace = require('replace-in-file');
let fileExists = require('file-exists');
let pathExists = require('path-exists');
let Loading = require('./loading');

let CreateSettingsFile = (function (config, modulePath, callback) {
    
    let _CONFIG = config;
    
    _CONFIG.bundle = 'webpack';
    
    function CreateSettingsFile() {
        console.log('');
        
        Loading.start('Generate ' + chalk.blue('.ciffisettings'));
        
        yeah('ciffisettings', _CONFIG, function () {
            
            Loading.stop('Generate ' + chalk.blue('.ciffisettings') + chalk.green.bold(' OK'));
            
            callback();
            
        });
    }
    
    function replaceBuildPath(config, file, callback) {
        //let _pathName = config.split('/')[config.split('/').length - 1];
        replace({
            files: [file],
            from: /@REPLACE__ASSETS@/g,
            to: config
        }, function (error) {
            if (error) {
                return console.error('Error occurred:', error);
            }
            replace({
                files: [file],
                from: /@REPLACE__ASSETS__NAME@/g,
                to: 'src'
            }, function (error) {
                if (error) {
                    return console.error('Error occurred:', error);
                }
                callback();
            });
        });
    }
    
    function replaceConfig(config, file, callback) {
        
        replace({
            files: [file],
            from: /@REPLACE__CONFIG@/g,
            to: config
        }, function (error) {
            if (error) {
                return console.error('Error occurred:', error);
            }
            callback();
        });
    }
    
    function replaceFeatures(config, file, callback) {
        
        replace({
            files: [file],
            from: /@REPLACE__FEATURES@/g,
            to: JSON.stringify(config).replace(/"/g, '\'')
        }, function (error) {
            if (error) {
                return console.error('Error occurred:', error);
            }
            callback();
        });
    }
    
    function replaceBundleName(config, file, callback) {
        replace({
            files: [file],
            from: /@REPLACE__BUNDLE__NAME@/g,
            to: config
        }, function (error) {
            if (error) {
                return console.error('Error occurred:', error);
            }
            callback();
        });
    }
    
    function yeah(fileName, appConfig, callback) {
        
        let _tempPath = process.env.PWD + '/.ciffi/';
        
        pathExists(_tempPath).then(function (res) {
            if (!res) {
                shell.mkdir(_tempPath);
            }
        });
        
        let _tempFile = _tempPath + fileName;
        let _resource = modulePath + '/lib/node_modules/ciffi/node_modules/ciffi-js-' + _CONFIG.bundle + '/resources/core/' + fileName;
        let _projectRoot = process.env.PWD + '/';
        let _projectFile = process.env.PWD + '/.' + fileName;
        
        shell.cp(_resource, _tempFile);
        
        replaceBundleName(appConfig.bundle, _tempFile, function () {
            replaceBuildPath(appConfig.assetsPath, _tempFile, function () {
                replaceConfig(appConfig.projectName, _tempFile, function () {
                    replaceFeatures(appConfig.features, _tempFile, function () {
                        
                        if (fileExists.sync(_projectFile)) {
                            console.log(chalk.red('File already exists: ' + _projectFile));
                        } else {
                            pathExists(_projectRoot).then(function (res) {
                                if (res) {
                                    shell.cp(_tempFile, _projectFile);
                                    shell.rm('-rf', _tempFile);
                                    shell.rm('-rf', _projectRoot + '/' + fileName);
                                    
                                    callback();
                                }
                            });
                        }
                        
                    });
                });
            });
        });
        
    }
    
    return new CreateSettingsFile();
    
});

module.exports = CreateSettingsFile;