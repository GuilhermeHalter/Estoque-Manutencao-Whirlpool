<template>
  <div class="historico-container">
    <sidebarComp />
        <div class="historico-content">
          <h2>Historico</h2>
          <p>Vizualize os itens disponiveis no estoque</p>

          <input type="search">
          <input type="filter">
        </div>
  </div>
</template>

<script setup>
  import sidebarComp from '../components/sidebar/sidebarComp.vue';
</script>

<style scoped>
  .historico-container{
    display: flex;
  }
</style>
