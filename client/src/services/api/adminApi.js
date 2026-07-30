import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

const adminApi = axios.create({
  baseURL: `${API_URL}/api`,
});

// Request interceptor - adds auth token
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - global error handling
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error('Session expired. Please login again.');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User APIs
export const userApi = {
  getAll: () => adminApi.get('/admin/users'),
  getById: (id) => adminApi.get(`/admin/users/${id}`),
  update: (id, data) => adminApi.patch(`/admin/users/update/${id}`, data),
  delete: (id) => adminApi.delete(`/admin/users/delete/${id}`),
};

// Bus APIs
export const busApi = {
  getAll: () => adminApi.get('/form/busdata'),
  getById: (id) => adminApi.get(`/form/busdata/${id}`),
  create: (data) => adminApi.post('/form/busdata/addbus', data),
  update: (id, data) => adminApi.patch(`/form/busdata/update/${id}`, data),
  delete: (id) => adminApi.delete(`/form/busdata/delete/${id}`),
};

// Feedback APIs
export const feedbackApi = {
  getAll: () => adminApi.get('/form/feedback'),
  update: (id, data) => adminApi.patch(`/form/feedback/update/${id}`, data),
  delete: (id) => adminApi.delete(`/form/feedback/delete/${id}`),
};

export default adminApi;
