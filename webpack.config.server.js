const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const HOT_PORT = process.env.HOT_PORT || 3001;

module.exports = {
	entry: ['babel-polyfill', 'webpack/hot/poll?1000', './server/dev/index'],
	// context: path.resolve(__dirname),
	watch: true,
	target: 'node',
	resolve: {
		extensions: ['.js', '.jsx', '.css'],
		alias: {
			App: path.join(__dirname, 'src'),
		},
	},
	externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
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
						name: `http://localhost:${HOT_PORT}/static/media/[name].[hash:8].[ext]`
					},
				}],
			}, {
				test: /\.(png|jpg|jpeg|gif|ttf|eot|woff|svg)(\?.*)?$/,
				use: [{
					loader: 'file-loader',
					query: {
						name: `http://localhost:${HOT_PORT}/static/media/[name].[hash:8].[ext]`
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
		new StartServerPlugin('server.js'),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new SpriteLoaderPlugin(),
		new ExtractTextPlugin({ filename: 'styles.css', allChunks: true/* , ignoreOrder: true */ }),
	],
	output: {
		path: path.join(__dirname, 'build'), filename: 'server.js'
	},
};
