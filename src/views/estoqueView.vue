<template>
  <div class="estoque-container">
    <sidebarComp />
        <div class="estoque-content">
          <h2>Estoque</h2>
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
  .estoque-container{
    display: flex;
  }
</style>
