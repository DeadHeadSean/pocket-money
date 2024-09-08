import axios from '../axiosConfig';

const API_URL = 'http://localhost:3001/api';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {username, password });
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            return response.data.user;
        } else{
            throw new Error('Login failed: No token recieved');
        }
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const register = async (username, password, role, age) => {
    try{
        console.log('Sending registration request to:', `${API_URL}/auth/register`);
        const response = await axios.post(`${API_URL}/auth/register`, { username, password, role, age });
        console.log('Registration response:', response.data);
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            return response.data.user;
        } else {
            throw new Error('Registration failed: No token received');
        }
    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message );
        if (error.response?.data?.errors) {
            console.errpr('Validation errors:', error.response.data.errors);
        }
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
};