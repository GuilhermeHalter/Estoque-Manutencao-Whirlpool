<template>
  <div class="configuracao-container">
    <sidebarComp />
    <div class="configuracao-content">
      <button class="dark-toggle" @click="toggleDark">
        {{ isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro' }}
      </button>
      <h1>Configurações</h1>
      <p>Página de configurações.</p>
    </div>
  </div>
</template>

<script setup>
import sidebarComp from '../components/sidebar/sidebarComp.vue';
import useDark from '../composable/useDark.js';

const { isDark, toggle: toggleDark } = useDark();
</script>

<style scoped>
.configuracao-container {
  display: flex;
  height: 100vh;
  background-color: var(--bg);
  color: var(--fg);
}

.configuracao-content {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  background-color: var(--bg);
  color: var(--fg);
}

.dark-toggle {
  margin-bottom: 20px;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background-color: var(--primary);
  color: var(--bg);
  cursor: pointer;
}
</style>
