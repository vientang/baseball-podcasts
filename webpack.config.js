var webpack = require('webpack')
var path = require('path')

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		filename: 'public/build/bundle.js',
		sourceMapFilename: 'public/build/bundle.map'
	},
	devtool: '#source-map',
	module: {
		loaders: [
			{test: /\.js?$/,loader: 'babel-loader', exclude: /(node_modules)/,query: {presets: ['react', 'es2015']}},
			{test: /(\.css|\.scss)$/,loaders: ['style-loader', 'css-loader', 'sass-loader']},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.png$/, loader: "url-loader?mimetype=image/png" },
      {test: /\.gif$/, loader: "url-loader?mimetype=image/gif" },
      {test: /\.jpg$/, loader: "url-loader?mimetype=image/jpg" }
		]
	}

}