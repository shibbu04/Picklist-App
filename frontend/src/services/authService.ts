import axios from 'axios';

const API_BASE_URL = '/api';

export const authService = {
  async login(username: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  },
};