const path = require('path');
const ConfigFile = require(__dirname + "/.ciffisettings");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const baseConfig = require("./config/webpack");
const minifyOpts = {
  uglifyOptions: {
    sourceMap: false,
    comments: false
  }
};
const plugins = [new UglifyJSPlugin(minifyOpts)]

if (ConfigFile.general.offline) {
  plugins.push(baseConfig.plugins[0])
}

module.exports = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    publicPath: path.normalize(ConfigFile.build.absoluteBuildPath),
  },
  mode: "production",
  performance: {
    hints: false
  },
  entry: {
    main: path.join(__dirname, ConfigFile.build.srcPathName, "scripts", "main.js")
  },
  plugins: plugins
};
