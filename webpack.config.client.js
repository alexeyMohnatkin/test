const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const HOT_PORT = process.env.HOT_PORT || 3001;

module.exports = {
	devtool: 'inline-source-map',
	entry: [
		'babel-polyfill',
		'react-hot-loader/patch',
		`webpack-dev-server/client?http://localhost:${HOT_PORT}`,
		'webpack/hot/only-dev-server',
		'./client/index',
	],
	context: path.resolve(__dirname),
	target: 'web',
	resolve: {
		extensions: ['.js', '.jsx', '.css'],
		alias: {
			App: path.join(__dirname, 'src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				include: [
					path.join(__dirname, 'server'),
					path.join(__dirname, 'client'),
					path.join(__dirname, 'src'),
				],
			}, {
				test: /\.css$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[path]--[name]__[local]',
						},
					}, 'postcss-loader']
				})),
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
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new SpriteLoaderPlugin(),
		new ExtractTextPlugin({ filename: 'styles.css', allChunks: true/* , ignoreOrder: true */ }),
		new webpack.DefinePlugin({
			'process.env': { BUILD_TARGET: JSON.stringify('client') },
		}),
	],
	output: {
		path: path.join(__dirname, 'build'),
		publicPath: `http://localhost:${HOT_PORT}/`,
		filename: 'client.js',
	},
};
