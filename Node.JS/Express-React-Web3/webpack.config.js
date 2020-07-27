module.exports = {
	entry: __dirname+'/src/App.js',
	mode: 'development',
	output: {
		path: __dirname+'/public/js',
		filename: 'bundle.js'
	},
	watch: true,
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env'],
							['@babel/preset-react']
						]
					}
				}
			}
		]
	}
}