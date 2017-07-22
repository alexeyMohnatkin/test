import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from 'App';
import reducers from 'App/Services/redux';

const preloadedState = window.__PRELOADED_STATE__;
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, preloadedState);


render(
	<AppContainer>
		<Provider store={store}>
			<Router>
				<App store={store} />
			</Router>
		</Provider>
	</AppContainer>,
	document.getElementById('root'),
);

if (module.hot) {
	module.hot.accept('App', () => {
		render(
			<AppContainer>
				<Provider store={store}>
					<Router>
						<App store={store} />
					</Router>
				</Provider>
			</AppContainer>,
			document.getElementById('root'),
		);
	});
}
