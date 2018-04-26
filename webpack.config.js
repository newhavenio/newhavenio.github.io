const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: "./webpack/entry.js",
  output: {
    path: path.resolve(__dirname, "js/"),
    filename: "bundle.js"
  },
  module: {
    loaders:[
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015"]
        }
      }
    ]
  },
  plugins:[
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}
