import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from 'App';
import sprite from 'svg-sprite-loader/runtime/sprite.build';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import { StaticRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from 'App/Services/redux';
import createApi from './api';
import createPage from './template';

const HOT_PORT = process.env.HOT_PORT || 3001;

const spriteContent = sprite.stringify();
const app = express();
const oneDay = 86400000;

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(serveStatic('build', {
	maxAge: oneDay,
}));

createApi(app);


const findAssets = () => {
	if (process.env.NODE_ENV !== 'production') {
		return {
			css: `http://localhost:${HOT_PORT}/styles.css`,
			js: `http://localhost:${HOT_PORT}/client.js`,
		};
	}
	try {
		const webpackManifest = require('../build/webpack-manifest.json');

		return {
			css: webpackManifest['main.css'],
			js: webpackManifest['main.js'],
		};
	} catch (error) {
		console.log('Can\'t find manifest file');
		throw error;
	}
};

app.get('/api', (req, res) => {
	res.send({ message: 'I am a server route and can also be hot reloaded!' });
});

app.get('*', (req, res) => {

	const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
	const store = createStoreWithMiddleware(reducers);

	const context = {};
	const application = renderToString(
		<Provider store={store}>
			<Router location={req.url} context={context}>
				<App />
			</Router>
		</Provider>
	);

	const finalState = store.getState();

	const { css, js } = findAssets();
	const templateParams = {
		spriteContent,
		application,
		finalState,
		css,
		js,
	};

	const html = createPage(templateParams);

	res.send(html);

});

export default app;
