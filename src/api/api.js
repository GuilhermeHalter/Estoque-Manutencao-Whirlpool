import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://mgfmg6-8000.csb.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
