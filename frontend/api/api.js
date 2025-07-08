import axios from 'axios';
import { USE_LOCAL, API_LOCAL, API_IP } from '../.env';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importação adicionada

if (Platform.OS === 'android') {
  const https = require('https');
  axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false
  });
}

const baseURL = USE_LOCAL === "true"
  ? API_LOCAL
  : API_IP;

const api = axios.create({
  baseURL, 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token às requisições
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;