<template>
  <div class="retirada-container">
    <sidebarComp />
    <div class="retirada-content">
      <h2>Retirada</h2>

      <div class="filtro-container">
        <input type="search" placeholder="Buscar produto..." />
      </div>

      <div class="conteudo-retirada">
        <div class="cards">
          <cardRetiradaComp
            v-for="produto in produtos"
            :key="produto.id"
            :produto="produto"
            :nomeCategoria="categoriaMap[produto.categoria]"
            :selectedItems="itensSelecionados"
            @toggle-select="handleToggleSelect"
          />

        </div>

        <itensSelecionadosComp
          :itens="itensSelecionados"
          @confirmar="handleConfirmar"
          @limpar="handleLimpar"
          @remover="handleRemover"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import sidebarComp from '../components/sidebar/sidebarComp.vue'
import cardRetiradaComp from '../components/cards/cardRetiradaComp.vue'
import { fetchProdutos } from '../services/produtoService'
import itensSelecionadosComp from '../components/cards/retirada/itensSelecionadosComp.vue'

const produtos = ref([])

  import { fetchCategorias } from '../services/categoriaService'

  const categorias = ref([])
  const categoriaMap = ref({})
  const itensSelecionados = ref([]) 

  function handleToggleSelect({ produto, quantidadeSelecionada }) {
    const index = itensSelecionados.value.findIndex(i => i.id === produto.id)
    if (index === -1) {
      itensSelecionados.value.push({ ...produto, quantidadeSelecionada })
    }
  }

  onMounted(async () => {
    produtos.value = await fetchProdutos()
    categorias.value = await fetchCategorias()
    categoriaMap.value = categorias.value.reduce((acc, cat) => {
      acc[cat.id] = cat.nome
      return acc
    }, {})
  })
</script>

<style scoped>
  .retirada-container {
    display: flex;
    height: 100vh;
  }

  .retirada-content {
    flex: 1;
    padding: 40px;
    overflow-y: auto;
  }

  .retirada-content h2 {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 24px;
  }

  .filtro-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 32px;
  }

  .filtro-container input[type="search"],
  .filtro-container input[type="filter"] {
    padding: 12px 16px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fff;
  }

  .conteudo-retirada {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: flex-start;
  }

  .cards {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }


</style>
