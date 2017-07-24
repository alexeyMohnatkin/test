// @flow
import axios from 'axios';
import t from './actionTypes';
import getError from 'App/Util/getError';

import type { TUser } from './reducer';

export function loadList({ page }) {
	return async function(dispatch) {
		try {
			const params = { page };
			const users = await axios({
				url: 'http://localhost:3000/api/users',
				method: 'get',
				params,
			});

			return dispatch({
				type: t.LOAD_LIST,
				payload: users,
			});
		} catch (error) {
			throw getError(error);
		}
	};
}

export function loadItem(id: string) {
	return async function(dispatch) {
		try {
			const user = await axios.get(`http://localhost:3000/api/users/${id}`);

			return dispatch({
				type: t.LOAD_ITEM,
				payload: user,
			});
		} catch (error) {
			throw getError(error);
		}
	};
}

export function addItem({ name, email, password }: TUser) {
	const data = { name, email, password };

	return async function(dispatch) {
		try {
			return await axios({
				url: 'http://localhost:3000/api/users',
				method: 'post',
				data,
			});
		} catch (error) {
			throw getError(error);
		}
	};
}
export function updateItem(id: string, { name, email, password }: TUser) {
	const data = { name, email, password };

	return async function(dispatch) {
		try {
			return await axios({
				url: `http://localhost:3000/api/users/${id}`,
				method: 'put',
				data,
			});
		} catch (error) {
			throw getError(error);
		}
	};
}

export function deleteItem(id: string) {

	return async function(dispatch) {
		try {
			return await axios({
				url: `http://localhost:3000/api/users/${id}`,
				method: 'delete',
			});
		} catch (error) {
			throw getError(error);
		}
	};
}
