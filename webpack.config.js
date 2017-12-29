var path = require("path")
var webpack = require("webpack")
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  devtool: false, // 增加开发速度
  entry: {
    "rise_bundle": ["babel-polyfill","./src/index.tsx"],
  },
  output: {
    path: path.join(__dirname, "__build__"),
    filename: "[name].js",
    publicPath: "/",
    chunkFilename: "[id].chunk.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    //去掉moment.js中国际化的代码
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new LodashModuleReplacementPlugin,
  ],
  resolve: {
    root: path.resolve("./src"),
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"],
    // alias: {
    //   'react': 'react-lite',
    //   'react-dom': 'react-lite'
    // },
  },
  module: {
    loaders: [
      { test: /\.js?$/, loaders: ["babel-loader"], exclude: /node_modules/ },
      { test: /\.tsx?$/, loaders: ["babel-loader", "ts-loader?transpileOnly=true"], exclude: /node_modules/ },
      { test: /\.less$/, loader: "style!css!postcss!less" },
      { test: /\.css$/, loader: "style!css!postcss" },
      { test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=10000', exclude: /node_modules/ },
    ]
  },
}
