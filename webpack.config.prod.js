const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
	devtool: 'inline-source-map',
	entry: [
		'babel-polyfill',
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
		new ExtractTextPlugin('static/css/style.[hash].css'),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				// React doesn't support IE8
				screw_ie8: true,
				warnings: false
			},
			mangle: {
				screw_ie8: true
			},
			output: {
				comments: false,
				screw_ie8: true
			}
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new WebpackShellPlugin({
			onBuildEnd: ['npm run copy']
		}),
		new ManifestPlugin({
			fileName: 'webpack-manifest.json',
		}),
	],
	output: {
		path: path.join(__dirname, 'build'),
		publicPath: '/',
		filename: 'static/js/[name].[hash].js',
	},
};
