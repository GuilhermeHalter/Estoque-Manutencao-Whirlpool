<template>
  <div class="retirada-container">
    <sidebarComp />
        <div class="retirada-content">
          <h2>Retirada</h2>

          <input type="search">
          <input type="filter">
        </div>
  </div>
</template>

<script setup>
  import sidebarComp from '../components/sidebar/sidebarComp.vue';
</script>

<style scoped>
  .retirada-container{
    display: flex;
  }
</style>
