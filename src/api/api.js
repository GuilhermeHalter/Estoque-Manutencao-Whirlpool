import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://estoque-b8sm.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
