import { USER_START, USER_SUCCESS, USER_ERROR } from '../actions/userActions';

const initialState = {
	username: '',
	id: null,
	loading: false,
	error: '',
	password: '',
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

		default:
			return state;
	}
};
