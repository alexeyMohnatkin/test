// @flow

import type { TUsersReducer } from 'App/Modules/Users/reducer';

export type TReduxState = {
	users: TUsersReducer,
};


export type TReduxAction<T> = {
  type: string,
  payload: T,
};
