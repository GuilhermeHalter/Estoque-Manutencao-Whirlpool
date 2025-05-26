<template>
  <div class="sidebar">
    <div class="logo">
      <i class="fa-solid fa-box-open" style="color: #38a9ff;"></i> <p>Estoque Manutenção</p>
    </div>

    <nav class="nav-links">
      <div class="nav-item">
        <i class="fa-solid fa-box-open"></i>
        <RouterLink to="/estoque" class="link">Estoque</RouterLink>
      </div>

      <div class="nav-item">
        <i class="fa-solid fa-clipboard-list"></i>
        <RouterLink to="/retirada" class="link">Retirada</RouterLink>
      </div>

      <div class="nav-item">
        <i class="fa-solid fa-clock"></i>
        <RouterLink to="/historico" class="link">Histórico</RouterLink>
      </div>

      <div class="nav-item">
        <i class="fa-solid fa-gears"></i>
        <RouterLink to="/configuracoes" class="link">Configurações</RouterLink>
      </div>
    </nav>

    <div class="user-info">
      <div class="details">
        <p class="name">{{ nome }}</p>
        <p class="re">RE: {{ re }}</p>
      </div>
      <i class="fa-solid fa-right-from-bracket"></i>
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap:8px;
  font-size: 17px;
  font-weight: 600;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #333;
}
.logo i {
  font-size: 25px;
}

.nav-links {
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: darkgray;
  font-weight: bold;
  gap: 75px;
}
  .nav-item {
    display: flex;
    align-items: center;
    gap: 17px;
    color: black;
  }

  .nav-item i {
    font-size: 20px;
    color: #859199;
  }

  .nav-item .link {
    font-size: 18px;
    text-decoration: none;
    color: black;
    font-weight: bold;
  }

  .nav-item .link:hover {
    color: #3F91F5;
    transition: 0.3s;
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
  gap: 60px;
  border-top: 1px solid #333;
}

.user-info i{
  font-size: 20px
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
