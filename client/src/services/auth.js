import axios from 'axios';

const API_URL = 'http:localhost:3001/api';

export const login = async (username, password) => {
    const response = await axios.post('${API_URL}/auth/login', {username, password });
    return response.data
};

export const register = async (username, password, role) => {
    const response = await axios.post('${API_URL}/auth/register', { username, password, role });
    return response.data;
};