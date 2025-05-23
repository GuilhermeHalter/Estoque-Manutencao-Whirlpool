import apiClient from '../../api/api';

export default {
  async login(email, senha) {

    const response = await apiClient.get('/admin/');
    const usuarios = response.data;


    const user = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (user) {

      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } else {
      throw new Error('Email ou senha inválidos');
    }
  },

  logout() {
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
};
