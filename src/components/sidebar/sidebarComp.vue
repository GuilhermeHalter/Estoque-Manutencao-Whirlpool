<template>
  <div class="sidebar">
    <div class="logo">
      <p>Estoque Manutenção</p>
    </div>

    <nav class="nav-links">
      <i class="fa-solid fa-box-open"></i><RouterLink to="/estoque" class="link">Estoque</RouterLink>
      <RouterLink to="/retirada" class="link">Retirada</RouterLink>
      <RouterLink to="/historico" class="link">Historico</RouterLink>
      <RouterLink to="/configuracoes" class="link">Configurações</RouterLink>
    </nav>

    <div class="user-info">
      <div class="details">
        <p class="name">{{ nome }}</p>
        <p class="re">RE: {{ re }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  const nome = ref('')
  const re = ref('')

  onMounted(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      nome.value = user.nome
      re.value = user.RE
    }
  })
</script>


<style scoped>
.sidebar {
  width: 240px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #100;
}
.logo {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #333;
}
.logo img {
  width: 120px;
}

.nav-links {
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: darkgray;
  font-weight: bold;
  gap: 15px;
}
.link {
  color: black;
  text-decoration: none;
  font-size: 16px;
}
  
.link:hover {
  transition: 1s;
  color: #3F91F5;
  font-weight: bold;
}

.user-info {
  padding: 20px;
  display: flex;
  align-items: center;
  border-top: 1px solid #333;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}
.details .name {
  font-weight: bold;
  margin: 0;
}
.details .re {
  font-size: 14px;
  color: #aaa;
  margin: 0;
}
</style>
