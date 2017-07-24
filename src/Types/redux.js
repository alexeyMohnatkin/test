// @flow

import type { TUsersReducer } from 'App/Modules/Users/reducer';
import type { TAuthReducer } from 'App/Modules/Auth/reducer';

export type TReduxState = {
	users: TUsersReducer,
	auth: TAuthReducer,
};


export type TReduxAction<T> = {
  type: string,
  payload: T,
};
