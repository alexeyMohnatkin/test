// @flow

import t from './actionTypes';
import type { TReduxAction } from 'App/Types/redux';

export type TUser = {
	_id: string,
	name: string,
	email: string,
	group: string,
	password: string,
};

export type TUsersReducer = {
	+list: {
		+users: ?Array<TUser>,
		+page: number,
		+count: number,
		+pages: number,
	},
	+item: ?TUser,
};

const INITIAL_STATE = {
	list: {
		users: null,
		page: 0,
		count: 0,
		pages: 0,
	},
	item: null,
};

export default (state: TUsersReducer = INITIAL_STATE, action: TReduxAction<*>): TUsersReducer => {
	switch (action.type) {
		case t.LOAD_LIST: {
			const list = action.payload.data;

			return { ...state, list };
		}
		case t.LOAD_ITEM: {
			const item = action.payload.data.user;

			return { ...state, item };
		}
		default: {
			return state;
		}
	}
};
