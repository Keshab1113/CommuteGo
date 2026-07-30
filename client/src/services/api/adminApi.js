import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
});

// Request interceptor - adds auth token
apiClient.interceptors.request.use(
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
apiClient.interceptors.response.use(
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

// Destinations API
export const destinationsApi = {
  getAll: (params) => apiClient.get('/destinations', { params }),
  getById: (id) => apiClient.get(`/destinations/${id}`),
  create: (data) => apiClient.post('/destinations', data),
  update: (id, data) => apiClient.put(`/destinations/${id}`, data),
  delete: (id) => apiClient.delete(`/destinations/${id}`),
  getPending: () => apiClient.get('/destinations/admin/pending'),
  review: (id, data) => apiClient.patch(`/destinations/admin/${id}/review`, data),
};

// Local Buddies API
export const localBuddiesApi = {
  getAll: (params) => apiClient.get('/local-buddies', { params }),
  getById: (id) => apiClient.get(`/local-buddies/${id}`),
  delete: (id) => apiClient.delete(`/local-buddies/${id}`),
  getPending: () => apiClient.get('/local-buddies/admin/pending'),
  review: (id, data) => apiClient.patch(`/local-buddies/admin/${id}/review`, data),
};

// Experiences API
export const experiencesApi = {
  getAll: (params) => apiClient.get('/experiences', { params }),
  getById: (id) => apiClient.get(`/experiences/${id}`),
  create: (data) => apiClient.post('/experiences', data),
  update: (id, data) => apiClient.put(`/experiences/${id}`, data),
  delete: (id) => apiClient.delete(`/experiences/${id}`),
};

// Trips API
export const tripsApi = {
  getAll: (params) => apiClient.get('/trips', { params }),
  getById: (id) => apiClient.get(`/trips/${id}`),
  getMyTrips: () => apiClient.get('/trips/my/trips'),
  create: (data) => apiClient.post('/trips', data),
  update: (id, data) => apiClient.put(`/trips/${id}`, data),
  delete: (id) => apiClient.delete(`/trips/${id}`),
  getRequests: (id) => apiClient.get(`/trips/${id}/requests`),
  getPending: () => apiClient.get('/trips/admin/pending'),
  review: (id, data) => apiClient.patch(`/trips/admin/${id}/review`, data),
};

// Reviews API
export const reviewsApi = {
  getAll: (params) => apiClient.get('/reviews', { params }),
  getByTarget: (type, id) => apiClient.get(`/reviews/${type}/${id}`),
  create: (data) => apiClient.post('/reviews', data),
  delete: (id) => apiClient.delete(`/reviews/${id}`),
};

// Admin API (users, feedbacks)
export const adminDataApi = {
  getAllUsers: () => apiClient.get('/admin/users'),
  getUserById: (id) => apiClient.get(`/admin/users/${id}`),
  updateUser: (id, data) => apiClient.patch(`/admin/users/update/${id}`, data),
  deleteUser: (id) => apiClient.delete(`/admin/users/delete/${id}`),
  getAllFeedbacks: () => apiClient.get('/form'),
  updateFeedback: (id, data) => apiClient.patch(`/form/${id}`, data),
  deleteFeedback: (id) => apiClient.delete(`/form/${id}`),
};

export default adminDataApi;
