import axios from 'axios';

const axiosWithAuth = () => {
	const token = localStorage.getItem('authToken');

	return axios.create({
		baseURL: 'https://african-marketplace-back-end.herokuapp.com/api',
		headers: {
			authorization: `Bearer ${token}`,
		},
	});
};

export default axiosWithAuth;
