<template>
  <h2>Login</h2>
  <form @submit.prevent="handleLogin">
    <div>
      <label for="email">Email:</label>
      <input id="email" v-model="email" type="email" required />
    </div>
    <div>
      <label for="password">Senha:</label>
      <input id="password" v-model="password" type="password" required />
    </div>
    <button type="submit">Entrar</button>
  </form>
  <router-link to="/faceID">FaceID</router-link>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function handleLogin() {
  // Aqui você pode adicionar a lógica de login, como validação ou chamada à API
  alert(`Email: ${email.value}\nSenha: ${password.value}`)
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  gap: 12px;
}

label {
  font-weight: bold;
}

input {
  padding: 6px;
  font-size: 14px;
}

button {
  padding: 8px;
  font-size: 16px;
  cursor: pointer;
}
</style>
