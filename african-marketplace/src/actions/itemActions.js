import axiosWithAuth from '../utils/axiosWithAuth';

export const ADD_ITEM_START = 'ADD_ITEM_START';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_ERROR = 'ADD_ITEM_ERROR';
export const GET_ALL_ITEMS_START = 'GET_ALL_ITEMS_START';
export const GET_ALL_ITEMS_SUCCESS = 'GET_ALL_ITEMS_SUCCESS';
export const GET_ALL_ITEMS_ERROR = 'GET_ALL_ITEMS_ERROR';
export const GET_USER_ITEMS_START = 'GET_USER_ITEMS_START';
export const GET_USER_ITEMS_SUCCESS = 'GET_USER_ITEMS_SUCCESS';
export const GET_USER_ITEMS_ERROR = 'GET_USER_ITEMS_ERROR';
export const UPDATE_ITEM_START = 'UPDATE_ITEM_START';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const UPDATE_ITEM_ERROR = 'UPDATE_ITEM_ERROR';
export const DELETE_ITEM_START = 'DELETE_ITEM_START';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_ERROR = 'DELETE_ITEM_ERROR';

export const addItem = (formState, id) => (dispatch) => {
	dispatch({ type: ADD_ITEM_START });
	console.log('addItems start');
	axiosWithAuth()
		.post('/items', {
			categorys_id: formState.category,
			users_id: id,
			product: formState.name,
			description: formState.description,
			price: formState.price,
		})
		.then((res) => {
			axiosWithAuth()
				.get(`/by-user/${id}`)
				.then((res) => {
					dispatch({ type: ADD_ITEM_SUCCESS, payload: res.data.data });
				});
		})
		.catch((err) => {
			console.log('addItem err', err.message);
			dispatch({ type: ADD_ITEM_ERROR });
		});
};

export const getAllItems = () => (dispatch) => {
	dispatch({ type: GET_ALL_ITEMS_START });
	// console.log('getallitems start');
	axiosWithAuth()
		.get('https://african-marketplace-back-end.herokuapp.com/api/items')
		.then((res) => {
			dispatch({ type: GET_ALL_ITEMS_SUCCESS, payload: res.data.data });
			// console.log(res.data.data);
		})
		.catch((err) => {
			dispatch({ type: GET_ALL_ITEMS_ERROR, payload: err.message });
			// console.log('getallitems error', err.message);
		});
};

export const getUserItems = (id) => (dispatch) => {
	dispatch({ type: GET_USER_ITEMS_START });
	console.log('getUserItems start');
	axiosWithAuth()
		.get(`/by-user/${id}`)
		.then((res) => {
			dispatch({ type: GET_USER_ITEMS_SUCCESS, payload: res.data.data });
			console.log('getUserItems success', res.data.data);
		})
		.catch((err) => {
			dispatch({ type: GET_USER_ITEMS_ERROR, payload: err.message });
			console.log('getUserItems err', err.message);
		});
};

export const updateItem = (formState, itemId, id) => (dispatch) => {
	dispatch({ type: UPDATE_ITEM_START });
	console.log('updateItem start');
	axiosWithAuth()
		.put(`/items/${itemId}`, {
			id: itemId,
			categorys_id: formState.category,
			users_id: id,
			product: formState.name,
			description: formState.description,
			price: formState.price,
		})
		.then((res) => {
			axiosWithAuth()
				.get(`/by-user/${id}`)
				.then((res) => {
					dispatch({ type: UPDATE_ITEM_SUCCESS, payload: res.data.data });
				});
		})
		.catch((err) => {
			dispatch({ type: UPDATE_ITEM_ERROR, payload: err.message });
			console.log('updateItemError');
		});
};

export const deleteItem = (id, userId) => (dispatch) => {
	dispatch({ type: DELETE_ITEM_START });
	console.log('deleteItem Start');
	axiosWithAuth()
		.delete(`/items/${id}`)
		.then((res) => {
			axiosWithAuth()
				.get(`/by-user/${userId}`)
				.then((res) => {
					console.log(
						'del items: requesting user items success',
						res.data.data
					);
					dispatch({ type: DELETE_ITEM_SUCCESS, payload: res.data.data });
				});
		})
		.catch((err) => {
			dispatch({ type: DELETE_ITEM_ERROR, payload: err.message });
			console.log('deleteItem error');
		});
};
