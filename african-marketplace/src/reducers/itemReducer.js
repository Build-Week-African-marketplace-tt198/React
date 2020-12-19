import {
	ADD_ITEM_START,
	ADD_ITEM_SUCCESS,
	ADD_ITEM_ERROR,
	GET_ALL_ITEMS_START,
	GET_ALL_ITEMS_SUCCESS,
	GET_ALL_ITEMS_ERROR,
	GET_USER_ITEMS_START,
	GET_USER_ITEMS_SUCCESS,
	GET_USER_ITEMS_ERROR,
	UPDATE_ITEM_START,
	UPDATE_ITEM_SUCCESS,
	UPDATE_ITEM_ERROR,
	DELETE_ITEM_START,
	DELETE_ITEM_SUCCESS,
	DELETE_ITEM_ERROR,
} from '../actions/itemActions';

const initialState = {
	loading: false,
	error: '',
	reloadItems: 'false',
	allItems: [],
	userItems: [],
};

export const itemReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ITEM_START:
			return {
				...state,
				loading: true,
			};
		case ADD_ITEM_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case ADD_ITEM_ERROR:
			return {
				...state,
				loading: false,
			};
		case GET_ALL_ITEMS_START:
			return {
				...state,
				loading: true,
			};
		case GET_ALL_ITEMS_SUCCESS:
			return {
				...state,
				allItems: action.payload,
				loading: false,
			};
		case GET_ALL_ITEMS_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case GET_USER_ITEMS_START:
			return {
				...state,
				loading: true,
			};
		case GET_USER_ITEMS_SUCCESS:
			return {
				...state,
				loading: false,
				userItems: action.payload,
			};
		case GET_USER_ITEMS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case DELETE_ITEM_START:
			return {
				...state,
				loading: true,
			};
		case DELETE_ITEM_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case DELETE_ITEM_ERROR: {
			return {
				...state,
				loading: false,
			};
		}
		default:
			return state;
	}
};
