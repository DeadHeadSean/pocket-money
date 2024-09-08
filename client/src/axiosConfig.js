import axios from 'axios';
import { getToken } from './services/auth';

axios.interceptors.request.use(
    (config) => {
        console.log('Axios request:', config.method, config.url);
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        console.error('Axios request error:', error);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        console.log('Axios response:', response.status, response.data);
        return response;
    },
    (error) => {
        console.error('Axios response error:', error.response ? error.response.data : error.message);
        return Promise.reject(error);
    }
);

export default axios;
