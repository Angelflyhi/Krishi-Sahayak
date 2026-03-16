import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

export const getCrops = (params) => api.get('/crops', { params }).then((res) => res.data);
export const getMandiRates = (params) => api.get('/mandi', { params }).then((res) => res.data);
export const getPosts = () => api.get('/posts').then((res) => res.data);
export const createPost = (payload, token) =>
  api.post('/posts', payload, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data);
