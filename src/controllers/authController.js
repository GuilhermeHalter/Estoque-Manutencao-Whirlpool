import authService from '../services/authService';

export default {
  async login(re, senha) {
    try {
      const allUsers = await authService.login(re, senha);

      const user = allUsers.find(u => u.re === re);

      if (user) {
        return { success: true, user };
      } else {
        return { success: false, message: 'Usuário não encontrado' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  logout() {
    authService.logout();
  },

  getCurrentUser() {
    return authService.getCurrentUser();
  }
};
