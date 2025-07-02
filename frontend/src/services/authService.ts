import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Create axios instance for auth
const authClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  async login(username: string, password: string) {
    const response = await authClient.post('/auth/login', {
      username,
      password,
    });
    return response.data;
  },
};