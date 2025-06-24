import apiClient from '../api/api';

export default {
  async login(re, senha) {
    try {
      const response = await apiClient.post('/token/', {
        re: re,
        password: senha
      });

      const { access, refresh } = response.data;
      localStorage.setItem('token', access);
      localStorage.setItem('refreshToken', refresh);

      const userResponse = await apiClient.get('/usuarios/');
      const user = userResponse.data;
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data || error.message);
      throw new Error('RE ou senha inválidos');
    }
  },

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    try {
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }
};
