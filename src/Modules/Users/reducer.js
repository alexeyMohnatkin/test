// @flow

import t from './actionTypes';
import type { TReduxAction } from 'App/Types/redux';

export type TUser = {
	id: number,
	name: string,
}

export type TUsersReducer = {
	+list: ?Array<TUser>,
	+item: ?TUser,
}

const INITIAL_STATE = {
	list: null,
	item: null,
};

export default (state: TUsersReducer = INITIAL_STATE, action: TReduxAction<*>): TUsersReducer => {
	switch (action.type) {
		case t.LOAD_LIST: {
			const list = action.payload.data.users;

			return { ...state, list };
		}
		case t.LOAD_ITEM: {
			const item = action.payload.data.user;

			return { ...state, item, offers: [], comments: [] };
		}
		default: {
			return state;
		}
	}
}
