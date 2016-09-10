var npm = require('npm');
var Test = (function () {

    function Test() {
    }
    
    Test.prototype = {
        moka: function () {
            npm.load(function (err) {
        
                npm.commands.run(['test-karma'], function (er, data) {
            
                });
        
                npm.on('log', function (message) {
                    console.log(message);
                });
        
            });
        },
        cucumber: function (env) {
            npm.load(function (err) {
                var _testType = (env && env === 'dev') ? 'test-cucumber' : 'dev-test-cucumber';
                npm.commands.run([_testType], function (er, data) {
        
                });
            
                npm.on('log', function (message) {
                    console.log(message);
                });
            
            });
        }
    }

    return new Test();
})();

module.exports = Test;