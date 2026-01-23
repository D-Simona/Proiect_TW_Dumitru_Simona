import axios from 'axios';

const API_BASE = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (email, password, name) => api.post('/users', { email, password, name })
};

export const documentService = {
  getAll: () => api.get('/documents'),
  getById: (id) => api.get(`/documents/${id}`),
  create: (data) => api.post('/documents', data),
  update: (id, data) => api.put(`/documents/${id}`, data),
  delete: (id) => api.delete(`/documents/${id}`),
  getAnalytics: () => api.get('/documents/analytics/by-category')
};

export default api;
