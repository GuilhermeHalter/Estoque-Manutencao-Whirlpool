<template>
  <div class="estoque-container">
    <sidebarComp />
        <div class="estoque-content">
          <h2>Estoque</h2>
          <p>Vizualize os itens disponiveis no estoque</p>

          <input type="search">
          <input type="filter">

          <cardEstoqueComp />
        </div>
  </div>
</template>

<script setup>
  import sidebarComp from '../components/sidebar/sidebarComp.vue';
  import cardEstoqueComp from '../components/cards/cardEstoqueComp.vue';
</script>

<style scoped>
  .estoque-container{
    display: flex;
  }
  .estoque-content{
    margin-left: 25px;
  }
</style>
