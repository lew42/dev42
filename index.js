#!/usr/bin/env node
// console.log("asdflkjadsfl");
// console.log(__dirname);
// console.log(__filename);
// console.log(process.argv);
// console.log(process.argv.slice(2));
// console.log(process.cwd());
var path = require("path");

var globule = require('globule');
var cwd = process.cwd();
console.log(cwd);

var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var entry = {};

// ugh
// remove the cwd from filename?

var entryFiles = globule.find(cwd + "/**/*entry.js").forEach(function(filePath){
	console.log(filePath, path.extname(filePath));
	var entryName = filePath
		.replace(path.extname(filePath), "")
		.replace(".entry", "");

	console.log(entryName);

	entry[entryName] = ["webpack-dev-server/client?http://localhost:8080", filePath];
});

var config = {
  devtool: 'inline-source-map',
  entry: entry,
  output: {
  	path: "/",
    filename: "[name].bundle.js"
  }
};

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
	contentBase: "/",
	filename: "[name].bundle.js",
	quiet: false,
	publicPath: "/",
	inline: true
});
server.listen(8080, "localhost");


// var path = require("path");
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// // var MyPlugin = require("./MyPlugin");

// var extractLESS = new ExtractTextPlugin("styles.css");

// var entry = {
//   // "./public/main": './src/entry.js'
// };

// var files = globule.find("./**/*.test.js").forEach(function(filePath){
//   var entryName = filePath.replace(path.extname(filePath), "");
//   entryName = entryName.replace(".entry", "").replace("./src", "");
//   console.log(entryName);
//   entry[entryName] = filePath;
// });

// module.exports = {
//   devtool: 'inline-source-map',
//   entry: "./entry.js",
//   output: {
//     filename: "[name]bundle.js"
//   }
//   // module: {
//   //   loaders: [
//   //     // { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css" },
//   //     // { test: /\.useable\.css$/, loader: "style/useable!css" },
//   //     { test: /\.less$/, loader: extractLESS.extract("css-loader?sourceMap!less-loader?sourceMap") },
//   //     { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=20000&mimetype=application/font-woff&name=/[hash].[ext]" },
//   //     { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
//   //   ]
//   // }
//   // ,plugins: [
//   //   extractLESS
//   // ]
//   // ,
//   // devServer: {
//     // historyApiFallback: true
//   // }
// };
