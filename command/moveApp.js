var npm = require('npm');
var shell = require('shelljs');

var MoveApp = (function () {

    function MoveApp() {
        var _tempPath = process.env.PWD + '/.ciffi/*';
        var _projectPath = process.env.PWD + '/';

        shell.cp('-R', _tempPath, _projectPath);
        shell.rm('-rf', _tempPath);

        npm.load(function (err) {

            npm.commands.run(['setup'], function (er, data) {
            });

            npm.on('log', function (message) {
                console.log(message);
            });

        });
    }

    return new MoveApp();
})();

module.exports = MoveApp;