import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Orders
  async getOrders() {
    const response = await apiClient.get('/orders');
    return response.data;
  },

  async getOrderItems(orderId: string) {
    const response = await apiClient.get(`/orders/${orderId}/items`);
    return response.data;
  },

  async completeOrder(orderId: string) {
    const response = await apiClient.post(`/orders/${orderId}/complete`);
    return response.data;
  },

  // Items
  async pickItem(itemId: string, data: { picked: boolean; location?: string; notes?: string }) {
    const response = await apiClient.post(`/items/${itemId}/pick`, data);
    return response.data;
  },

  // Cycle Count
  async triggerCycleCount(itemId: string, location: string) {
    const response = await apiClient.post('/cycle-count', {
      itemId,
      location,
    });
    return response.data;
  },

  // Audit Logs
  async getAuditLogs() {
    const response = await apiClient.get('/logs');
    return response.data;
  },

  // Health check
  async healthCheck() {
    const response = await apiClient.get('/health');
    return response.data;
  },
};