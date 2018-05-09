const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const extractSass = new ExtractTextPlugin({
  filename: "../css/[name].css"
});
const extractVueCss = new ExtractTextPlugin({
  filename: "../css/vue-styles.css"
});

const uglifyJs = new UglifyJsPlugin({});
const vuePlugin = new VueLoaderPlugin();
const webpackDefinePlugin = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("production")
  }
});

const bundleAnalyzer = new BundleAnalyzerPlugin();

module.exports = {
  entry: "./webpack/entry.js",
  output: {
    path: path.resolve(__dirname, "js/"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules/,
        use: {
          loader: "file-loader"
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true
              }
            },
            {
              loader: "sass-loader"
            }
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: extractVueCss.extract({
          use: "css-loader",
          fallback: "vue-style-loader"
        })
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    vuePlugin,
    extractSass,
    uglifyJs,
    webpackDefinePlugin,
    extractVueCss
  ]
};
