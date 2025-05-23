<template>
  <div class="estoque-container">
    <sidebarComp />
        <div class="estoque-content">
          <h2>Estoque Admin</h2>
          <p>Vizualize os itens disponiveis no estoque</p>

          <input type="search">

          <button type="submit">Adicionar</button>
          <button type="submit">Remover</button>

          <div class="cards">
            <cardEstoqueComp 
              v-for="item in produtos" 
              :key="item.id" 
              :produto="item" 
              :nomeCategoria="categoriaMap[item.categoria]" 
            />
          </div>
        </div>
  </div>
</template>

<script setup>
  import cardEstoqueComp from '../../components/cards/cardEstoqueComp.vue';
  import { fetchProdutos } from '../../services/produtoService';
  import { ref, onMounted } from 'vue';
  import { fetchCategorias } from '../../services/categoriaService';

  const produtos = ref([])
  const categorias = ref([])
  const categoriaMap = ref({})

  async function carregarDados() {
    categorias.value = await fetchCategorias()
    categoriaMap.value = categorias.value.reduce((acc, cat) => {
      acc[cat.id] = cat.nome
      return acc
    }, {})

    produtos.value = await fetchProdutos()
  }

  onMounted(carregarDados)
</script>

<style scoped>
  .estoque-container{
    display: flex;
  }
  .estoque-content{
    margin-left: 25px;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
</style>
