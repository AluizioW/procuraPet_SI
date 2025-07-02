import axios from 'axios';
import { API_LOCAL } from '../.env';

const api = axios.create({
  baseURL: `${API_LOCAL}`, // Substitua pelo seu endereço
  timeout: 10000,
});

// Interceptor para adicionar o token às requisições
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;