// File: src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL // backend URL
});

// This is an "interceptor". It's a function that runs before every single request is sent.
// Its job is to check if we have a token in localStorage and add it to the request header.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Authentication Functions ---
export const loginUser = (credentials) => apiClient.post('/auth/login', credentials);
export const registerUser = (credentials) => apiClient.post('/auth/register', credentials);

// --- Order Functions ---
export const getOrderById = (id) => apiClient.get(`/orders/${id}`);
export const getAllOrders = () => apiClient.get('/orders');

export const createOrder = (formData) => {
  return apiClient.post('/orders', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
