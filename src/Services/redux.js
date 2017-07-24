import { combineReducers } from 'redux';
import users from 'App/Modules/Users/reducer';
import auth from 'App/Modules/Auth/reducer';

const rootReducer = combineReducers({
	users,
	auth,
});

export default rootReducer;
