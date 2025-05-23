import authService from '../../services/admin/authAdminService';

export default {
  async login(email, senha) {
    try {
      const user = await authService.login(email, senha);
      return { success: true, user };
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
