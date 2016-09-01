var npm = require('npm');
var Dev = (function () {

    function Dev() {
        npm.load(function (err) {

            npm.commands.run(['dev'], function (er, data) {

            });

            npm.on('log', function (message) {
                console.log(message);
            });

        });
    }

    return new Dev();
})();

module.exports = Dev;