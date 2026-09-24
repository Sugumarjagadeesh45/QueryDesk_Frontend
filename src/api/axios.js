import axios from 'axios';

// Base Axios instance pointing to our Express backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://querydesk-backend-nh2b.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT token from localStorage to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('qms_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 (token expired / invalid)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('qms_token');
      localStorage.removeItem('qms_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
