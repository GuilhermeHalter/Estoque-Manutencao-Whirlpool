<template>
  <div class="estoque-container">
    <sidebarComp />
        <div class="estoque-content">
          <h2>Estoque</h2>
          <p>Vizualize os itens disponiveis no estoque</p>

          <div class="filtro-container">
            <input
              type="search"
              placeholder="Busque produtos por Nome ou Código..."
              v-model="searchTerm"
            />

            <select class="filtro-select" v-model="categoriaSelecionada">
              <option value="">Todas as categorias</option>
              <option 
                v-for="categoria in categorias" 
                :key="categoria.id" 
                :value="categoria.id"
              >
                {{ categoria.nome }}
              </option>
            </select>
          </div>

        

          <div class="cards">
            <cardEstoqueComp 
              v-for="item in produtosFiltrados" 
              :key="item.id" 
              :produto="item" 
              :nomeCategoria="categoriaMap[item.categoria]"
              :selectedItems="selectedItems"
              @toggle-select="handleToggleSelection"
            />
          </div>

          <ItemEstoqueSelectComp
            :selectedCount="selectedItems.length"
            :onClear="clearSelection"
            :onAddToCart="addToCart"
          />
        </div>
  </div>
</template>

<script setup>
import sidebarComp from '../components/sidebar/sidebarComp.vue';
import cardEstoqueComp from '../components/cards/cardEstoqueComp.vue';
import { fetchProdutos } from '../services/produtoService';
import { fetchCategorias } from '../services/categoriaService';
import ItemEstoqueSelectComp from '../components/ItemEstoqueSelectComp.vue';
import { ref, onMounted, computed } from 'vue';

const produtos = ref([])
const categorias = ref([])
const categoriaMap = ref({})
const selectedItems = ref([])
const searchTerm = ref('')


const categoriaSelecionada = ref('')

  const produtosFiltrados = computed(() => {
    let resultado = produtos.value

    if (categoriaSelecionada.value) {
      resultado = resultado.filter(p => p.categoria === categoriaSelecionada.value)
    }

    if (searchTerm.value.trim()) {
      const termo = searchTerm.value.trim().toLowerCase()
      resultado = resultado.filter(p =>
        p.nome.toLowerCase().includes(termo) ||
        p.numero_serie.toLowerCase().includes(termo)
      )
    }

    return resultado
  })


async function carregarDados() {
  categorias.value = await fetchCategorias()
  categoriaMap.value = categorias.value.reduce((acc, cat) => {
    acc[cat.id] = cat.nome
    return acc
  }, {})

  produtos.value = await fetchProdutos()
}

  function handleToggleSelection({ produto, checked }) {
    if (checked) {
      if (!selectedItems.value.find(p => p.id === produto.id)) {
        selectedItems.value.push(produto)
      }
    } else {
      selectedItems.value = selectedItems.value.filter(p => p.id !== produto.id)
    }
  }

  function clearSelection() {
    selectedItems.value = []
  }


onMounted(carregarDados)
</script>


<style scoped>
  .estoque-container {
    display: flex;
    height: 100vh;
  }

  .estoque-content {
    flex: 1;
    padding: 40px;
    overflow-y: auto;
  }

  .estoque-content h2 {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .estoque-content p {
    color: #666;
    margin-bottom: 24px;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .filtro-container {
    display: flex;
    align-items: center;
    justify-content:center;
    text-align:center;
    gap: 12px;
    margin-bottom: 32px;
  }

  .filtro-container input[type="search"] {
    flex: 1;
    padding: 12px 16px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fff;
  }

  .filtro-select {
    padding: 12px 16px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fff;
    cursor: pointer;
  }

</style>
