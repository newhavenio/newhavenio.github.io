const path = require('path');
const webpack = require('webpack');
const webpackMerge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const modeConfig = env => {
  return require(`./build-utils/webpack.${env}.js`)(env)
}
const presetConfig = require('./build-utils/loadPresets')

const extractSass = new MiniCssExtractPlugin({
  filename: "../_includes/[name].css"
});

module.exports = ({
  mode,
  presets
} = {
  mode: "production",
  presets: []
}) => {
  return webpackMerge({
      mode,
      entry: "./webpack/entry.js",
      output: {
        path: path.resolve(__dirname, "js/"),
        filename: "bundle.js"
      },
      module: {
        rules: [{
            test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            exclude: /node_modules/,
            use: {
              loader: "file-loader"
            }
          },
          {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader"
            ]
          }
        ],
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        }),
        extractSass,
        new webpack.ProgressPlugin()
      ]
    },
    modeConfig(mode),
    presetConfig({
      mode,
      presets
    })
  )
}
