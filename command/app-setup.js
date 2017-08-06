var chalk = require('chalk');
var inquirer = require('inquirer');
var replace = require('replace-in-file');
var emptyDir = require('empty-dir');
var cliCursor = require('cli-cursor');
var shell = require('shelljs');
var Loading = require('./loading');
var exec = require('child_process').exec;

var AppSetup = (function (modulePath) {
    
    var _CONFIG = {
        ciffiSrc: '.ciffi/src',
        ciffiSrcName: 'src'
    };
    
    function AppSetup(config) {
        
        beforeStart(config, function (config) {
            
            askForBundle(function (features) {
                
                askForBuildPath(function (buildPath) {
                    
                    var _isNewVersion = true;
                    
                    require('./tempApp')(_isNewVersion, modulePath, function () {
                        
                        config.bundle = 'webpack3';
                        config.isNewVersion = _isNewVersion;
                        config.features = features;
                        
                        start(config, buildPath);
                        
                    });
                    
                });
            });
            
        });
        
    }
    
    function askForBundle(callback) {
        inquirer.prompt({
            type: 'checkbox',
            name: 'features',
            message: 'What features do you want to include in this project?',
            default: [''],
            choices: ['testing', 'styleguides']
        }).then(function (res) {
            callback(res.features);
        });
    }
    
    function askForProjectName(config, callback) {
        var _projectName = config.projectName;
        if (!_projectName) {
            inquirer.prompt({
                type: 'input',
                name: 'projectName',
                message: 'Specify project name',
                default: 'test',
                validate: function (res) {
                    
                    var done = this.async();
                    
                    setTimeout(function () {
                        
                        var _test = new RegExp(/^$|\s+|\w\s+|[\/]|^\.|\.$/);
                        var _testResult = _test.test(res);
                        
                        if (typeof res !== 'string' || _testResult) {
                            done('☠️  Project must have real name ☠️');
                            return;
                        }
                        
                        done(null, true);
                        
                    }, 10);
                }
            }).then(function (res) {
                callback(res);
            });
        } else {
            callback(config);
        }
    }
    
    function replaceBuildPath(config, isNewVersion, callback) {
        
        replace({
            files: [
                process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/config.js',
                process.env.PWD + '/.ciffi/dev.config.js',
                process.env.PWD + '/.ciffi/build.config.js',
                process.env.PWD + '/.ciffi/package.json'
            ],
            replace: /@REPLACE__ASSETS@/g,
            with: config
        }, function (error) {
            if (error) {
                return console.error('Error occurred:', error);
            }
            
            var _files = [
                process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/config.js',
                process.env.PWD + '/.ciffi/dev.config.js',
                process.env.PWD + '/.ciffi/build.config.js',
                process.env.PWD + '/.ciffi/package.json'
            ];
            
            if (!isNewVersion) {
                _files.push(
                    process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/styles.js',
                    process.env.PWD + '/.ciffi/serve.config.js'
                )
            }
            replace({
                files: _files,
                replace: /@REPLACE__ASSETS__NAME@/g,
                with: _CONFIG.ciffiSrcName
            }, function (error) {
                if (error) {
                    return console.error('Error occurred:', error);
                }
                callback();
            });
        });
    }
    
    function replaceConfig(config, callback) {
        replace({
            files: [
                process.env.PWD + '/' + _CONFIG.ciffiSrc + '/scripts/config/config.js',
                process.env.PWD + '/.ciffi/dev.config.js'
            ],
            replace: /@REPLACE__CONFIG@/g,
            with: config
        }, function (error) {
            if (error) {
                return console.error('Error occurred:', error);
            }
            callback();
        });
    }
    
    function filter(filepath) {
        return !/(^|\/)\.[^\/\.]/g.test(filepath);
    }
    
    function start(config, res) {
        var _fixedAssetsUrl = res.buildPath;
        
        if (_fixedAssetsUrl.substring(_fixedAssetsUrl.length - 1, _fixedAssetsUrl.length) === '/') {
            _fixedAssetsUrl = _fixedAssetsUrl.substring(0, _fixedAssetsUrl.length - 1)
        }
        
        replaceBuildPath(_fixedAssetsUrl, config.isNewVersion, function () {
            
            cliCursor.hide();
            
            console.log('');
            
            Loading.start('Generate project tree for ' + chalk.blue(config.projectName));
            
            replaceConfig(config.projectName, function () {
                
                var _pathName = _fixedAssetsUrl.split('/')[_fixedAssetsUrl.split('/').length - 1];
                
                if (_pathName !== 'src') {
                    shell.mv(process.env.PWD + '/' + _CONFIG.ciffiSrc + '/', process.env.PWD + '/.ciffi/' + _CONFIG.ciffiSrc + '/');
                }
                
                Loading.stop('Generate project tree for ' + chalk.blue(config.projectName) + chalk.green.bold(' OK'));
                
                require('./app-sethiddenfile')(config.isNewVersion, modulePath);
                require('./app-createsettings')({
                    projectName: config.projectName,
                    assetsPath: _fixedAssetsUrl,
                    pathName: _pathName,
                    bundle: config.bundle,
                    isNewVersion: config.isNewVersion,
                    features: config.features
                }, modulePath, function () {
                    require('./app-createpackage')(config.features, modulePath, function () {
                        require('./moveApp')
                    });
                });
                
            });
        });
    }
    
    function askForBuildPath(callback) {
        
        inquirer.prompt({
            type: 'input',
            name: 'buildPath',
            message: 'Specify relative build path',
            default: '../static',
            validate: function (res) {
                
                var done = this.async();
                
                setTimeout(function () {
                    
                    var _test = new RegExp(/^(\.\.\/){1,}\w/);
                    var _testResult = _test.test(res);
                    
                    if (typeof res !== 'string' || !_testResult) {
                        done('☠️  Build path must be out of this project setup folder ☠️');
                        return;
                    }
                    
                    done(null, true);
                    
                }, 10);
            }
        }).then(function (res) {
            callback(res);
        });
    }
    
    function testNpm5(callback) {
        var _process = exec('npm -v');
        var _result;
        _process.stdout.on('data', function (res) {
            _result = parseInt(res.split('.')[0]) >= 5;
        });
        
        _process.stderr.on('data', function () {
            _result = false;
        });
        
        _process.on('close', function () {
            if (_result) {
                callback(_result);
            } else {
                console.log(chalk.red.bold('☠️ Setup error: ') + chalk.red('npm@5.0.0 is required ☠️'));
                console.log(chalk.blue.bold('update with: ') + chalk.blue('npm install -g npm@latest'));
            }
        });
    }
    
    function beforeStart(config, callback) {
        
        testNpm5(function () {
            emptyDir(process.env.PWD + '/', filter, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    
                    console.log('');
                    console.log('');
                    console.log(chalk.green.bold('-- Ciffi Frontend Generator --'));
                    console.log('');
                    
                    if (result) {
                        askForProjectName(config, function (config) {
                            callback(config);
                        });
                        
                    } else {
                        console.log(chalk.red.bold('☠️  Project setup failed:') + ' ' + chalk.blue('the path must be empty ☠️'));
                        console.log('');
                    }
                }
            });
        });
        
    }
    
    return AppSetup;
});

module.exports = AppSetup;