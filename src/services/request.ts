import Axios from 'axios';
import { message } from 'antd';

const request = Axios.create({
	baseURL: process.env.BASE_URL,
	timeout: 5000
});
const sessionToken = sessionStorage.getItem('token');
request.interceptors.request.use(
	(config) => {
		if (sessionToken) {
			config.headers.Authorization = `Bearer ${sessionToken.toString()}`;
		}

		return config;
	},
	(error) => {
		message.error(error.message);
	}
);

request.interceptors.response.use(
	async (response) => {
		if (response.status === 200 && response.data.code === 200) {
			return Promise.resolve(response);
		}

		// if (response.data.code === 10000) {
		// 	// 刷新token
		// 	// auth.RefreshTokenAsync();

		// 	// 上次失败重发
		// 	const result = await request(response.config);
		// 	return result;
		// }

		return Promise.reject(response);
	},
	(error) => {
		if (error && error.response) {
			switch (error.response.status) {
				case 400:
					break;
				case 401:
				case 403:
				default:
					message.error(error.response.data.msg);
					break;
			}
		}
		else if (error && error.message) {
			console.log(error.message);
			message.error(error.message);
		}
		return Promise.reject(error);
	}
);

export default request;
