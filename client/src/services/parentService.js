import axios from '../axiosConfig';

export const getChildren = async () => {
    const response = await axios.get('/api/parent/children');
    return response.data;
};

export const getChildBalance = async (childId) => {
    const response = await axios.get(`/api/parent/child/${childId}/balance`);
    return response.data.balance;
};

export const getChildTransactions = async (childId) => {
    const response = await axios.get(`/api/parent/child/${childId}/transactions`);
    return response.data;
};

export const addTransaction = async (childId, amount, type, description) => {
    const response = await axios.post('/api/parent/child/transaction', { childId, amount, type, description });
    return response.data;
};
