import axios from 'axios';
export const USER_START = 'USER_START';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_ERROR = 'USER_ERROR';

export const logIn = (formState) => (dispatch) => {
	dispatch({ type: USER_START });
	axios
		.post(
			'https://african-marketplace-trackteam.herokuapp.com/api/auth/login',
			formState
		)
		.then((res) => {
			console.log('login success!', res.data);
			dispatch({
				type: USER_SUCCESS,
				payload: { ...res.data, password: formState.password },
			});
			localStorage.setItem('authToken', res.data.token);
		})
		.catch((err) => {
			console.log(err.message);
			dispatch({ type: USER_ERROR, payload: { error: err.message } });
		});
};

export const register = (formState) => (dispatch) => {
	dispatch({ type: USER_START });
	axios
		.post(
			'https://african-marketplace-trackteam.herokuapp.com/api/auth/register',
			formState
		)
		.then((res) => {
			console.log('register success!', res.data);
			dispatch({
				type: USER_SUCCESS,
				payload: { ...res.data, password: formState.password },
			});
			localStorage.setItem('authToken', res.data.token);
		})
		.catch((err) => {
			console.log(err.message);
			dispatch({ type: USER_ERROR, payload: { error: err.message } });
		});
};
