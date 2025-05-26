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
      <h2>Acesso ao Sistema</h2>
      <p class="subtitle">Escolha um método de autenticação</p>

      <div class="auth-methods">
        <button :class="{ active: metodo === 'tradicional' }" @click="metodo = 'tradicional'">
          <i class="fas fa-key"></i> Tradicional
        </button>
        <button :class="{ active: metodo === 'faceid' }" @click="metodo = 'faceid'">
          <i class="fa-solid fa-eye"></i> FaceID
        </button>
        <button :class="{ active: metodo === 'rfid' }" @click="metodo = 'rfid'">
          <i class="fa-solid fa-address-card"></i> RFID
        </button>
      </div>

      <form @submit.prevent="handleLogin">
        <label>Registro de empregado (RE)</label>
        <input v-model="email" type="text" placeholder="Digite seu RE" required />

        <label>Senha</label>
        <input v-model="senha" type="password" placeholder="Digite sua senha" required />

        <button type="submit" class="submit-btn">Entrar</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>

      <p class="recover">
        Não lembra sua senha?
        <a href="#">Recupere sua senha</a>
      </p>
    </div>
  </div>
</template>

<script>
import authController from '../controllers/authController';
import '@fortawesome/fontawesome-free/css/all.min.css';



export default {
  data() {
    return {
      email: '',
      senha: '',
      errorMessage: '',
      metodo: 'tradicional',
    };
  },
  methods: {
    async handleLogin() {
      const result = await authController.login(this.email, this.senha);
      if (result.success) {
        this.errorMessage = '';
        this.$router.push('/estoque');
      } else {
        this.errorMessage = result.message;
      }
    },
  },
};
</script>

<style scoped>
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

.logo {
  width: 50px;
  margin-bottom: 12px;
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
  margin-bottom: 8px;
  color: #333;
}

.subtitle {
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
}

.auth-methods {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.auth-methods button {
  flex: 1;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: 0.3s;
}

.auth-methods button.active {
  background-color: #e1ebff;
  border-color: #007bff;
  font-weight: bold;
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

.recover {
  text-align: center;
  font-size: 13px;
  margin-top: 16px;
}

.recover a {
  color: #007bff;
  text-decoration: none;
}

.error {
  color: red;
  font-size: 13px;
  margin-top: 8px;
}
</style>
