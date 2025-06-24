<template>
  <div class="configuracao-container">
    <sidebarComp />

    <div class="configuracao-content">
      <div class="header">
        <h1>⚙️ Configurações</h1>
        <p>Gerencie preferências da sua conta e aparência do sistema.</p>
      </div>

      <!-- Seção: Tema -->
      <div class="card">
        <h2>🌗 Tema</h2>
        <p>Escolha entre modo claro e escuro.</p>
        <button class="dark-toggle" @click="toggleDark">
          {{ isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro' }}
        </button>
      </div>

      <div class="card">
        <h2>👤 Informações da Conta</h2>
        <p>Veja e edite seus dados pessoais.</p>
        <div class="form-group">
          <label>Nome</label>
          <input type="text" placeholder="Seu nome completo" />
        </div>
        <div class="form-group">
          <label>RE (Registro de Empregado)</label>
          <input type="text" placeholder="Ex: 10678594" />
        </div>
        <button class="save-btn">Salvar Alterações</button>
      </div>

      <div class="card">
        <h2>🔐 Segurança</h2>
        <p>Altere sua senha para manter sua conta segura.</p>
        <div class="form-group">
          <label>Nova Senha</label>
          <input type="password" placeholder="Digite a nova senha" />
        </div>
        <div class="form-group">
          <label>Confirmar Nova Senha</label>
          <input type="password" placeholder="Confirme a nova senha" />
        </div>
        <button class="save-btn">Atualizar Senha</button>
      </div>
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
  font-family: 'Segoe UI', Roboto, sans-serif;
}

.configuracao-content {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  background-color: var(--bg);
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.header h1 {
  font-size: 28px;
  margin-bottom: 6px;
}

.header p {
  font-size: 15px;
  color: var(--fg-light, #888);
}

.card {
  background-color: var(--bg-elevated, #fff);
  color: var(--fg);
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: 0.3s;
}

.card h2 {
  font-size: 20px;
  margin-bottom: 6px;
}

.card p {
  margin-bottom: 8px;
  color: var(--fg-light, #777);
}

.dark-toggle,
.save-btn {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background-color: var(--primary, #007bff);
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;
  width: fit-content;
}

.dark-toggle:hover,
.save-btn:hover {
  background-color: var(--primary-dark, #0056b3);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 500;
  font-size: 14px;
}

.form-group input {
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: var(--bg-input, #f9f9f9);
  color: var(--fg);
  font-size: 14px;
}
</style>
