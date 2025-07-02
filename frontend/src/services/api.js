import axios from 'axios';


const baseURL = 'http://192.168.1.12:3000/api'; 

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;