const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ConfigFile = require(__dirname + "/.ciffisettings");
const path = require("path");
const baseConfig = require("./config/webpack");

module.exports = {
  ...baseConfig,
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
