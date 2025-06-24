import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://ggfq4c-8000.csb.app/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adiciona o token em todas as requisições
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // <- aqui é "token", como você disse
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
