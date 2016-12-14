#!/usr/bin/env node
// #!/usr/bin/env node --inspect --debug-brk

var path = require("path");
var globule = require('globule');

var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var cwd = process.cwd();
console.log('cwd:', cwd);

var entry = {};

console.log("\nFiles:\n");

// find anything in cwd (and subfolders) that ends in "entry.js"
// we'll create bundles for these in the same folder, and swap "entry.js" for "bundle.js"
var entryFiles = globule.find(cwd+"/**/*entry.js", "!" + cwd + "/node_modules/**").forEach(function(filePath){
	filePath = path.resolve(filePath); // normalizes the slashes and stuff
	console.log('filePath:', filePath);

	var relPath = path.relative(cwd, filePath);
	console.log('relPath:', relPath);

	var entryName = relPath
						.replace(path.extname(relPath), "")
						.replace("entry", "");

	entryName = entryName || "./"; // in case the file was named "entry.js", this fixed the problem

	console.log('entryName:', entryName);

	entry[entryName] = ["webpack-dev-server/client?http://localhost:8080/", filePath];
	console.log("\n");
});

/*
The entryName contains the relative path and part of the name (up until the "entry.js").
This makes it easy to put the file back in its original spot, without having to create multiple configurations.
*/

var config = {
  devtool: 'inline-source-map',
  entry: entry,
  output: {
  	path: cwd,
    filename: "[name]bundle.js"
  }
};

var compiler = webpack(config, function(err, stats){
	// debugger;
});

var server = new WebpackDevServer(compiler, {
	inline: true
});

server.listen(8080, "localhost");