import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootsReducer } from './reducers';

export const store = createStore(
	rootsReducer,
	composeWithDevTools(applyMiddleware(thunk))
);