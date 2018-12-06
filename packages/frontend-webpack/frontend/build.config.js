const path = require('path');
const ConfigFile = require(__dirname + "/.ciffisettings");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const baseConfig = require("./config/webpack");

module.exports = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    publicPath: path.normalize(ConfigFile.publicBuildPath),
  },
  mode: "production",
  performance: {
    hints: false
  },
  entry: {
    main: path.join(__dirname, ConfigFile.srcPathName, "scripts", "main.js")
  },
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        sourceMap: false,
        comments: false
      }
    })
  ]
};
