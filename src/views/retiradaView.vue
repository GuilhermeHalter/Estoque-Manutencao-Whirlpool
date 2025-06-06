<template>
  <div class="retirada-container">
    <sidebarComp />
        <div class="retirada-content">
          <h2>Retirada</h2>

          <input type="search">
          <input type="filter">

          <cardRetiradaComp
            v-for="produto in produtos"
            :key="produto.id"
            :produto="produto"
            :nomeCategoria="produto.categoria"
          />

        </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import sidebarComp from '../components/sidebar/sidebarComp.vue';
import cardRetiradaComp from '../components/cards/cardRetiradaComp.vue';

const produtos = ref([]);
</script>

<style scoped>
  .retirada-container{
    display: flex;
  }
</style>
