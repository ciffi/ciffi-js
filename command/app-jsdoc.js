var npm = require('npm');
var Jsdoc = (function () {

    function Jsdoc() {
        npm.load(function (err) {

            npm.commands.run(['jsdoc'], function (er, data) {

            });

            npm.on('log', function (message) {
                console.log(message);
            });

        });
    }

    return new Jsdoc();
})();

module.exports = Jsdoc;