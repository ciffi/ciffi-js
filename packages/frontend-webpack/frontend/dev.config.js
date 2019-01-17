const path = require('path');
const ConfigFile = require(__dirname + "/.ciffisettings");
const baseConfig = require("./config/webpack");
const plugins = ConfigFile.offline ? [baseConfig.plugins[0]] : [];

module.exports = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    publicPath: path.normalize(ConfigFile.publicBuildPath),
  },
  mode: "development",
  performance: {
    hints: false
  },
  entry: {
    main: path.join(__dirname, ConfigFile.srcPathName, "scripts", "main.js")
  },
  devtool: "source-map",
  watch: true,
  plugins: plugins
};
