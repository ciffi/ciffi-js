var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: {
        main: './static/scripts/main.js',
    },
    output: {
        path: '@REPLACE__ASSETS@',
        filename: '[name].js'
    },
    watch: true,
    plugins: [
        new OpenBrowserPlugin({
            url: 'http://@REPLACE__CONFIG@.local/app_dev.php'
        })
    ]
};