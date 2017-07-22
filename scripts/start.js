const webpack = require('webpack');
const chalk = require('chalk');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.client');

const HOT_PORT = +process.env.HOT_PORT || 3001;

function setupCompiler(host, port, protocol) {
	// "Compiler" is a low-level interface to Webpack.
	// It lets us listen to some events and provide our own custom messages.
	const compiler = webpack(config);

	// "invalid" event fires when you have changed a file, and Webpack is
	// recompiling a bundle. WebpackDevServer takes care to pause serving the
	// bundle, so if you refresh, it'll wait instead of serving the old one.
	// "invalid" is short for "bundle invalidated", it doesn't imply any errors.
	compiler.plugin('invalid', function() {
		// clearConsole();
		console.log('Compiling...');
	});
	return compiler;
}

function runDevServer(host, port, protocol) {
	const compiler = setupCompiler();
	const devServer = new WebpackDevServer(compiler, {

		contentBase: [path.resolve(__dirname, '../public')],

		// Enable hot reloading server. It will provide /sockjs-node/ endpoint
		// for the WebpackDevServer client so it can learn when the files were
		// updated. The WebpackDevServer client is included as an entry point
		// in the Webpack development configuration. Note that only changes
		// to CSS are currently hot reloaded. JS changes will refresh the browser.
		hot: true,
		// It is important to tell WebpackDevServer to use the same "root" path
		// as we specified in the config. In development, we always serve from /.
		publicPath: config.output.publicPath,
		// Reportedly, this avoids CPU overload on some systems.
		// https://github.com/facebookincubator/create-react-app/issues/293
		watchOptions: {
			ignored: /node_modules/
		},
		// Enable HTTPS if the HTTPS environment constiable is set to 'true'
		https: protocol === 'https',
		host: host,
		historyApiFallback: true,
		headers: { 'Access-Control-Allow-Origin': '*' },
	});

	// Our custom middleware proxies requests to /index.html or a remote API.
	// addMiddleware(devServer);

	// Launch WebpackDevServer.
	devServer.listen(port, (err, result) => {
		if (err) {
			return console.log(err);
		}

		// clearConsole();
		console.log(chalk.cyan('Starting the development server...'));
		console.log();
		// openBrowser(protocol + '://' + host + ':' + port + '/');
	});
}

function run(port) {
	const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
	const host = process.env.HOST || 'localhost';

	runDevServer(host, port, protocol);
}

run(HOT_PORT);
