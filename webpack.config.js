var path = require("path")
var webpack = require("webpack")

module.exports = {
  devtool: false, // 增加开发速度
  entry: {
    "bundle": ["babel-polyfill","./src/index.tsx"],
    "note": ["babel-polyfill","./src/bible.tsx"],
  },
  output: {
    path: path.join(__dirname, "__build__"),
    filename: "[name].js",
    publicPath: "/",
    chunkFilename: "[id].chunk.js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      filename: '[name].js',
      minChunks:function(module){
        //  下边return参考的vue-cli配置
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, './node_modules')
          ) === 0
        )
      }
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
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
