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
    <router-link to="/estoque"><button>Entrar</button></router-link>
  </form>
  <router-link to="/faceID">FaceID</router-link>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')

async function handleLogin() {
  try {
    // Substitua esta URL pela do seu backend Django
    const url = 'https://23e9714a-ced0-4aa3-82c7-211924432a3a-00-17s1vey564p9l.spock.replit.dev/api/token/'

    const response = await axios.post(url, {
      username: email.value,  // ou 'email' se o backend estiver configurado assim
      password: password.value
    })

    const { access, refresh } = response.data

    // Salva os tokens no localStorage
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)

    alert('Login realizado com sucesso!')

    // Aqui você pode redirecionar para a área autenticada, por exemplo:
    // router.push('/dashboard')
  } catch (error) {
    alert('Falha no login: ' + (error.response?.data.detail || 'Erro desconhecido'))
  }
}
</script>
