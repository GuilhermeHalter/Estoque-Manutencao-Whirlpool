<template>
  <div class="login">
    <h2>Login Admin</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="senha" type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

<script>
import authController from '../../controllers/admin/authAdminController';

export default {
  data() {
    return {
      email: '',
      senha: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      const result = await authController.login(this.email, this.senha);
      if (result.success) {
        this.errorMessage = '';
        this.$router.push('/admin/estoque');
      } else {
        this.errorMessage = result.message;
      }
    },
  },
};
</script>
