var npm = require('npm');
var Build = (function () {

    function Build() {
        npm.load(function (err) {

            npm.commands.run(['build-pro'], function (er, data) {
                
            });

            npm.on('log', function (message) {
                console.log(message);
            });

        });
    }

    return new Build();
})();

module.exports = Build;