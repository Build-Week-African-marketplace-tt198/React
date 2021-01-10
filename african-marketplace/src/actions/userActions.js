import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';
export const USER_START = 'USER_START';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_ERROR = 'USER_ERROR';

export const GET_USERS_START = 'GET_USERS_START';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';

export const LOG_OUT = 'LOG_OUT';

export const logIn = (formState) => async (dispatch) => {
	dispatch({ type: USER_START });
	axios
		.post(
			'https://african-marketplace-back-end.herokuapp.com/auth/login',
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
			'https://african-marketplace-back-end.herokuapp.com/auth/register',
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

export const getAllUsers = () => (dispatch) => {
	dispatch({ type: GET_USERS_START });
	axiosWithAuth()
		.get('/users')
		.then((res) => {
			console.log(res.data);
			dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
		})
		.catch((err) => {
			dispatch({ type: GET_USERS_ERROR, payload: err.message });
		});
};

export const logOut = () => (dispatch) => {
	dispatch({ type: LOG_OUT });
	localStorage.removeItem('authToken');
};

