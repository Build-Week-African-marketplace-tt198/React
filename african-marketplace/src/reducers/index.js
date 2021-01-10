import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { itemReducer } from './itemReducer';

export const rootsReducer = combineReducers({
	user: userReducer,
	item: itemReducer,
});


