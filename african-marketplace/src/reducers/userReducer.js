import {
	USER_START,
	USER_SUCCESS,
	USER_ERROR,
	GET_USERS_START,
	GET_USERS_SUCCESS,
	GET_USERS_ERROR,
	LOG_OUT,
} from '../actions/userActions';

const initialState = {
	username: '',
	id: null,
	loading: false,
	error: '',
	password: '',
	allUsers: [],
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_START:
			return {
				...state,
				loading: true,
			};
		case USER_SUCCESS:
			return {
				...state,
				username: action.payload.username,
				id: action.payload.user_id,
				loading: false,
				error: '',
				password: action.payload.password,
			};
		case USER_ERROR:
			return {
				...state,
				error: `Oops, something went wrong - ${action.payload.error}`,
				loading: false,
			};

		case GET_USERS_START:
			return {
				...state,
				loading: true,
			};
		case GET_USERS_SUCCESS:
			return {
				...state,
				loading: false,
				allUsers: action.payload,
			};
		case GET_USERS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case LOG_OUT:
			return {
				...state,
				username: '',
				id: null,
				password: '',
			};

		default:
			return state;
	}
};
