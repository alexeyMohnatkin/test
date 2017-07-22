const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const nodeExternals = require('webpack-node-externals');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
	entry: ['babel-polyfill', './server/prod/index'],
	// context: path.resolve(__dirname),
	target: 'node',
	resolve: {
		extensions: ['.js', '.jsx', '.css'],
		alias: {
			App: path.join(__dirname, 'src'),
		},
	},
	// externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/
			}, {
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[path]--[name]__[local]',
						},
					}, 'postcss-loader']
				}),
			}, {
				test: /\.(png|jpg|jpeg)(\?.*)?$/,
				use: [{
					loader: 'url-loader',
					query: {
						limit: 10000,
						name: 'static/media/[name].[hash:8].[ext]'
					},
				}],
			}, {
				test: /\.(png|jpg|jpeg|gif|ttf|eot|woff|svg)(\?.*)?$/,
				use: [{
					loader: 'file-loader',
					query: {
						name: 'static/media/[name].[hash:8].[ext]'
					},
				}],
				exclude: path.join(__dirname, 'src'),
			}, {
				test: /\.svg$/,
				use: [
					'svg-sprite-loader',
					'svgo-loader',
				],
				include: path.join(__dirname, 'src'),
			},
		],
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new SpriteLoaderPlugin(),
		new ExtractTextPlugin('static/css/style.css'),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
	output: {
		path: path.join(__dirname, 'build'),
		publicPath: '/',
		filename: 'server.js',
	},
};
