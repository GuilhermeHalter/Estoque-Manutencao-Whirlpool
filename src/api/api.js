import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://759lh3-8000.csb.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
