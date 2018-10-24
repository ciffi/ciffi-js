const webpack = require("webpack");
const ConfigFile = require(__dirname + "/.ciffisettings");
const path = require("path");
const baseConfig = require("./config/webpack");

module.exports = {
  ...baseConfig,
  mode: "development",
  performance: {
    hints: false
  },
  entry: {
    main: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      path.join(__dirname, ConfigFile.srcPathName, "scripts", "main.js")
    ]
  },
  devtool: "source-map",
  watch: true,
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
