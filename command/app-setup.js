var chalk = require('chalk');
var prompt = require('prompt');
var replace = require('replace-in-file');
var emptydir = require('empty-dir');

var AppSetup = (function () {

    function AppSetup(config) {

        require('./tempApp');

        process.env.PN_APP = JSON.stringify({});

        function replaceConfig(config, callback) {
            replace({
                files: [
                    process.config.variables.node_prefix + '/lib/node_modules/ciffi/tmp/static/scripts/config/config.js'
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

        emptydir(process.env.PWD + '/', filter, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                if (result) {
                    console.log('');
                    console.log('');
                    console.log(chalk.green.bold('-- CiffiDesign Frontend Generator --'));
                    console.log('');

                    replaceConfig(config.projectName, function () {
                        require('./moveApp');
                    });

                    console.log('');
                    console.log(chalk.green.bold('-- new project ') + chalk.blue.bold(config.projectName) + chalk.green.bold(' created --'));
                    console.log('');
                    console.log(chalk.green.bold('-- start download and install npm dependencies --'));
                    console.log('');

                } else {
                    console.log('');
                    console.log('');
                    console.log(chalk.green.bold('-- CiffiDesign Frontend Generator --'));
                    console.log('');
                    console.log(chalk.red.bold('Project setup failed:') + ' ' + chalk.blue('the path must be empty'));
                    console.log('');
                }
            }
        });

    }

    return AppSetup;
})();

module.exports = AppSetup;