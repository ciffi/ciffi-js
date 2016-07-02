var each = require('foreach');
var prompt = require('prompt');
var replace = require('replace-in-file');

var AppSetup = (function() {

  function AppSetup(config) {

    require('./tempApp');

    var appConfig = {
      projectName: config.projectName,
      envs: {

      }
    };

    process.env.PN_APP = JSON.stringify({});

    function showGreeting() {
      console.log('');
      console.log('');
      console.log('-- Webpack Project Configurator --');
      console.log('');
      console.log('');
      console.log('-- ciffi dev for local development --');
      console.log('');
      console.log('-- ciffi build for generate build package --');
      console.log('');
      console.log(process.env.npm_package_author_name+' ^_^');
      console.log('');
    }

    function replaceAssets(env,url,callback) {
      replace({
        files: [
          process.config.variables.node_prefix+'/lib/node_modules/ciffi/tmp/dev/styles/config/config-'+env+'.scss'
        ],
        replace: /@REPLACE__ASSETSURL@/g,
        with: url
      }, function(error, changedFiles) {
        if(error) {
          return console.error('Error occurred:', error);
        }
        console.log('Generate scss $assets variable in: ' + changedFiles.join(', '));
        callback();
      });
    }

    function replaceConfig(config,callback) {
      replace({
        files: [
          process.config.variables.node_prefix+'/lib/node_modules/ciffi/tmp/dev/scripts/config/config.js'
        ],
        replace: /@REPLACE__CONFIG@/g,
        with: config
      }, function(error, changedFiles) {
        if(error) {
          return console.error('Error occurred:', error);
        }
        console.log('Generate DefaultConfig in: ' + changedFiles.join(', '));
        callback();
      });
    }

    function askForDev(callback) {
      prompt.get(generateDev,function(err,results) {

        if(!results.generateDev || results.generateDev === 'y') {

          appConfig.envs.dev = {};

          var _end = 'assetsUrl';
          prompt.get(configDev,function(err,results) {
            each(results,function(result,index) {

              appConfig.envs.dev[index] = result;

              if(index === _end) {
                replaceAssets('dev',appConfig.envs.dev.assetsUrl,function() {
                  callback();
                });
              }
            });
          });

        }else {
          callback();
        }
      });
    }

    function askForLocal(callback) {
      prompt.get(generateLocal,function(err,results) {

        if(!results.generateLocal || results.generateLocal === 'y') {

          appConfig.envs.local = {};

          var _end = 'assetsUrl';
          prompt.get(configLocal,function(err,results) {
            each(results,function(result,index) {

              appConfig.envs.local[index] = result;

              if(index === _end) {
                replaceAssets('local',appConfig.envs.local.assetsUrl,function() {
                  callback();
                });
              }
            });
          });

        }else {
          callback();
        }
      });
    }

    function askForStage(callback) {
      prompt.get(generateStage,function(err,results) {

        if(!results.generateStage || results.generateStage === 'y') {

          appConfig.envs.stage = {};

          var _end = 'assetsUrl';
          prompt.get(configStage,function(err,results) {
            each(results,function(result,index) {

              appConfig.envs.stage[index] = result;

              if(index === _end) {
                replaceAssets('stage',appConfig.envs.stage.assetsUrl,function() {
                  callback();
                });
              }
            });
          });

        }else {
          callback();
        }
      });
    }

    function askForProd(callback) {
      prompt.get(generateProd,function(err,results) {

        if(!results.generateProd || results.generateProd === 'y') {

          appConfig.envs.prod = {};

          var _end = 'assetsUrl';
          prompt.get(configProd,function(err,results) {
            each(results,function(result,index) {

              appConfig.envs.prod[index] = result;

              if(index === _end) {
                replaceAssets('prod',appConfig.envs.prod.assetsUrl,function() {
                  callback();
                });
              }
            });
          });

        }else {
          callback();
        }
      });
    }


    var generateDev = {
      properties: {
        generateDev: {
          message: 'Generate dev enviroment?',
          default: 'y'
        }
      }
    };

    var configDev = {
      properties: {
        baseUrl: {
          message: 'dev baseUrl:',
          default: 'http://localhost'
        },
        apiUrl: {
          message: 'dev apiUrl:',
          default: 'http://'+appConfig.projectName+'.local/app_dev.php'
        },
        shareUrl: {
          message: 'dev shareUrl:',
          default: 'http://localhost'
        },
        assetsUrl: {
          message: 'dev assetsUrl:',
          default: '/dev/'
        }
      }
    };

    var generateLocal = {
      properties: {
        generateLocal: {
          message: 'Generate local enviroment?',
          default: 'y'
        }
      }
    };

    var configLocal = {
      properties: {
        baseUrl: {
          message: 'local baseUrl:',
          default: 'http://'+appConfig.projectName+'.local'
        },
        apiUrl: {
          message: 'local apiUrl:',
          default: 'http://'+appConfig.projectName+'.local/app_dev.php'
        },
        shareUrl: {
          message: 'local shareUrl:',
          default: 'http://'+appConfig.projectName+'.local/app_dev.php'
        },
        assetsUrl: {
          message: 'local assetsUrl:',
          default: 'http://'+appConfig.projectName+'.local/assets/'
        }
      }
    };

    var generateStage = {
      properties: {
        generateStage: {
          message: 'Generate stage enviroment?',
          default: 'y'
        }
      }
    };

    var configStage = {
      properties: {
        baseUrl: {
          message: 'stage baseUrl:',
          default: 'http://'+appConfig.projectName+'.ppreview.it'
        },
        apiUrl: {
          message: 'stage apiUrl:',
          default: 'http://'+appConfig.projectName+'.ppreview.it/app_dev.php'
        },
        shareUrl: {
          message: 'stage shareUrl:',
          default: 'http://'+appConfig.projectName+'.ppreview.it/app_dev.php'
        },
        assetsUrl: {
          message: 'stage assetsUrl:',
          default: 'http://'+appConfig.projectName+'.ppreview.it/assets/'
        }
      }
    };

    var generateProd = {
      properties: {
        generateProd: {
          message: 'Generate prod enviroment?',
          default: 'y'
        }
      }
    };

    var configProd = {
      properties: {
        baseUrl: {
          message: 'prod baseUrl:',
          default: 'http://www.'+appConfig.projectName+'.it'
        },
        apiUrl: {
          message: 'prod apiUrl:',
          default: 'http://www.'+appConfig.projectName+'.it'
        },
        shareUrl: {
          message: 'prod shareUrl:',
          default: 'http://www.'+appConfig.projectName+'.it'
        },
        assetsUrl: {
          message: 'prod assetsUrl:',
          default: 'http://www.'+appConfig.projectName+'.it/assets/'
        }
      }
    };

    prompt.start();

    console.log('');
    console.log('');
    console.log('-- Webpack Project Configurator --');
    console.log('');

    askForDev(function() {
      askForLocal(function() {
        askForStage(function() {
          askForProd(function() {
            process.env.PN_APP = JSON.stringify(appConfig);
            replaceConfig(JSON.stringify(appConfig),function() {
              require('./moveApp');
              showGreeting();
            });
          });
        });
      });
    });
    
  }

  return AppSetup;
})();

module.exports = AppSetup;