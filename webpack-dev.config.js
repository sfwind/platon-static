var path = require("path")
var webpack = require("webpack")
var ip = require("ip")

module.exports = {
  devtool: "eval", // 增加开发速度
  entry: {
    "bundle": [ "webpack-dev-server/client?http://" + ip.address() + ":4000",
      "webpack/hot/only-dev-server", "babel-polyfill", "./src/index.tsx" ],
    "note": [ "webpack-dev-server/client?http://" + ip.address() + ":4000",
      "webpack/hot/only-dev-server", "babel-polyfill", "./src/bible.tsx" ],
  },
  output: {
    path: path.join(__dirname, "__build__"),
    filename: "[name].js",
    publicPath: "/",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    root: path.resolve("./src"),
    extensions: [ "", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx" ],
    // alias: {
    //   'react': 'react-lite',
    //   'react-dom': 'react-lite'
    // }
  },
  module: {
    loaders: [
      { test: /\.js?$/, loaders: [ "babel-loader" ], exclude: /node_modules/ },
      { test: /\.tsx?$/, loaders: [ "babel-loader", "ts-loader?transpileOnly=true" ], exclude: /node_modules/ },
      { test: /\.less$/, loader: "style!css!postcss!less" },
      { test: /\.css$/, loader: "style!css!postcss" },
      { test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=5000', exclude: /node_modules/ },
    ]
  },
}
