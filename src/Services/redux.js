import { combineReducers } from 'redux';
import users from 'App/Modules/Users/reducer';

const rootReducer = combineReducers({
	users,
});

export default rootReducer;
