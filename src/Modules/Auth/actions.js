// @flow

import axios from 'axios';
import t from './actionTypes';
import getError from 'App/Util/getError';

export function login(email: string, password: string) {
	return async function(dispatch) {
		try {
			const response = await axios.post('/api/auth', { email, password });

			axios.defaults.headers.common['x-access-token'] = response.data.token;
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('credentials', JSON.stringify(response.data.credentials));
			dispatch({ type: t.LOGIN, payload: response.data });

		} catch (error) {
			throw getError(error);
		}
	};
}

export function register(name: string, email: string, password: string) {
	return async function(dispatch) {
		try {
			return await axios.post('/api/register', { name, email, password });
		} catch (error) {
			throw getError(error);
		}
	};
}

export function logout() {
	return function(dispatch) {
		localStorage.removeItem('token');
		localStorage.removeItem('credentials');
		delete axios.defaults.headers.common['x-access-token'];
		dispatch({ type: t.SIGN_OUT });
	};
}


export function tryAuth() {
	return function(dispatch) {
		const token = localStorage.getItem('token');
		const credentials = JSON.parse(localStorage.getItem('credentials'));

		if (!token) {
			return dispatch({ type: t.SIGN_OUT });
		}
		axios.defaults.headers.common['x-access-token'] = token;
		dispatch({ type: t.LOGIN, payload: { token, credentials } });
	};
}

