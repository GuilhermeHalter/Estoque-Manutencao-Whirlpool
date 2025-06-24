<template>
  <div class="login-wrapper">
    <div class="header">
      <div class="title-estoque">
        <i class="fa-solid fa-box-open" style="color: #38a9ff;"></i>
        <h1>Estoque Manutenção</h1>
      </div>
      <p>Sistema de controle de estoque para<br />o setor de manutenção</p>
    </div>

    <div class="login-card">
      <h2>Acesso ao Sistema <label class="admin-label">Admin</label></h2> 
 
      <form @submit.prevent="handleLogin">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="Digite seu email" required />

        <label>Senha</label>
        <input v-model="senha" type="password" placeholder="Digite sua senha" required />

        <button type="submit" class="submit-btn">Entrar</button>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
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

<style scoped>
  .admin-label{
      border: 1px solid #007bff;
      background-color: #e1ebff;
      color: #007bff;
      padding: 5px 15px;
      border-radius: 19px;
  }
  
  .title-estoque {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 34px;
    font-weight: 600;
  }
.login-wrapper {
  background-color: #f4f7fb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: 'Segoe UI', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 32px;
}

.header h1 {
  font-size: 32px;
  font-weight: 600;
  color: #333;
}

.header p {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.login-card {
  background-color: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
}

.login-card h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  font-size: 14px;
  color: #444;
}

input {
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.submit-btn {
  margin-top: 12px;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 13px;
  margin-top: 8px;
  text-align: center;
}
</style>
