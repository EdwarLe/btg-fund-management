import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getFunds = async () => {
    const response = await axios.get(`${API_URL}/funds`);
    return response.data;
};

export const subscribe = async (fundId, amount, notificationType) => {
    const response = await axios.post(`${API_URL}/transactions/subscribe`, { fundId, amount, notificationType });
    return response.data;
};

export const cancel = async (fundId, amount) => {
    const response = await axios.post(`${API_URL}/transactions/cancel`, { fundId, amount });
    return response.data;
};

export const getTransactionHistory = async () => {
    const response = await axios.get(`${API_URL}/transactions/history`);
    return response.data;
};

export const getBalance = async () => {
    const response = await axios.get(`${API_URL}/transactions/balance`);
    return response.data.balance;
};