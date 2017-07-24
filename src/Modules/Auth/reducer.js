import t from './actionTypes';
import type { TReduxAction } from 'App/Types/redux';

const INITIAL_STATE = {
	loggedIn: false,
	isAdmin: false,
	credentials: null,
};

export type TAuthReducer = {
	+loggedIn: boolean,
	+isAdmin: boolean,
	+credentials: ?{
		_id: string,
		name: string,
		email: string,
		role: string,
	},
};


export default (state: TAuthReducer = INITIAL_STATE, action: TReduxAction<*>): TUsersReducer => {
	switch (action.type) {

		case t.LOGIN: {
			const { credentials } = action.payload;

			return { ...state, loggedIn: true, credentials };
		}

		case t.SIGN_OUT: {
			return { ...state, loggedIn: false, credentials: null };
		}

		default: {
			return state;
		}
	}
};
