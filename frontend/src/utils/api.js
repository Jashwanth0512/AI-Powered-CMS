// src/utils/api.js
import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/auth/refresh', { refreshToken });
        
        localStorage.setItem('accessToken', response.data.accessToken);
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

const apiService = {
  // Authentication
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user
      };
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  },

  // Content Management
  getContent: async (params = {}) => {
    try {
      const response = await api.get('/content', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch content';
    }
  },

  createContent: async (contentData) => {
    try {
      const response = await api.post('/content', contentData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create content';
    }
  },

  updateContent: async (id, contentData) => {
    try {
      const response = await api.put(`/content/${id}`, contentData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update content';
    }
  },

  // Analytics
  getAnalytics: async (params = {}) => {
    try {
      const response = await api.get('/analytics', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch analytics';
    }
  },

  // User Management
  getUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch users';
    }
  },

  updateUserRole: async (userId, role) => {
    try {
      const response = await api.patch(`/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update user role';
    }
  },

  // AI Suggestions
  getSuggestions: async (content) => {
    try {
      const response = await api.post('/ai/suggestions', { content });
      return response.data.suggestions;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get suggestions';
    }
  }
};

// Helper function to set auth tokens
export const setAuthTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

// Helper function to clear auth tokens
export const clearAuthTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export default apiService;