import axios from 'axios';

const API_BASE_URL = '/api';

// Add auth token to requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  // Orders
  async getOrders() {
    const response = await axios.get(`${API_BASE_URL}/orders`);
    return response.data;
  },

  async getOrderItems(orderId: string) {
    const response = await axios.get(`${API_BASE_URL}/orders/${orderId}/items`);
    return response.data;
  },

  async completeOrder(orderId: string) {
    const response = await axios.post(`${API_BASE_URL}/orders/${orderId}/complete`);
    return response.data;
  },

  // Items
  async pickItem(itemId: string, data: { picked: boolean; location?: string; notes?: string }) {
    const response = await axios.post(`${API_BASE_URL}/items/${itemId}/pick`, data);
    return response.data;
  },

  // Cycle Count
  async triggerCycleCount(itemId: string, location: string) {
    const response = await axios.post(`${API_BASE_URL}/cycle-count`, {
      itemId,
      location,
    });
    return response.data;
  },

  // Audit Logs
  async getAuditLogs() {
    const response = await axios.get(`${API_BASE_URL}/logs`);
    return response.data;
  },
};