var path = require('path');
var webpack = require('webpack');
module.exports = {
	entry: { server: './dist/server.js' },
	resolve: { extensions: ['.js', '.ts'] },
	target: 'node',
	externals: [/(node_modules|main\..*\.js)/],
	output: {
		path: path.join(__dirname),
		filename: 'app.js'
	},
	module: {
		rules: [
		{ test: /\.ts$/, loader: 'ts-loader' }
		]
	},
	plugins: [
	new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, path.join(__dirname,'..', 'src','client'), {}),
	new webpack.ContextReplacementPlugin(/(.+)?express(\\|\/)(.+)?/, path.join(__dirname, '..', 'src','client'), {})
	]
};
