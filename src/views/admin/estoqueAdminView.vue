<template>
  <div class="estoque-container">
    <div class="estoque-content">
      <h2>Estoque Admin</h2>
      <p>Visualize os itens disponíveis no estoque</p>

      <input type="search" placeholder="Buscar produtos..." />

      <div class="mb-4 mt-2 flex gap-2">
        <button @click="modalCategoriaOpen = true" class="bg-green-600 text-white px-4 py-2 rounded">
          Nova Categoria
        </button>

        <button @click="modalGerenciarCategoriasOpen = true" class="bg-blue-600 text-white px-4 py-2 rounded">
          Gerenciar Categoria
        </button>

        <button @click="modalProdutoOpen = true" class="bg-green-600 text-white px-4 py-2 rounded">
          Novo Produto
        </button>

        <button @click="modalGerenciarProdutosOpen = true" class="bg-blue-600 text-white px-4 py-2 rounded">
          Gerenciar Produto
        </button>

      </div>

      <!-- Modal de Categoria -->
      <CreateCategoryModal
        :show="modalCategoriaOpen"
        @close="modalCategoriaOpen = false"
        @save="handleCategoriaSave"
      />

      <!-- Modal Gerenciar Categoria -->
      <ManageCategoriasModal
        :show="modalGerenciarCategoriasOpen"
        :categorias="categorias"
        @close="modalGerenciarCategoriasOpen = false"
        @categoria-deletada="removerCategoria"
        @categoria-editada="atualizarCategoria"
      />

      <ManageProdutosModal
        :show="modalGerenciarProdutosOpen"
        :produtos="produtos"
        :categorias="categorias"
        @close="modalGerenciarProdutosOpen = false"
        @produto-deletado="removerProduto"
        @produto-editado="atualizarProduto"
      />

      <!-- Modal de Produto -->
      <CreateProductModal
        :show="modalProdutoOpen"
        @close="modalProdutoOpen = false"
        @save="handleProdutoSave"
      />

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
import { ref, onMounted } from 'vue'
import cardEstoqueComp from '../../components/cards/cardEstoqueComp.vue'
import CreateCategoryModal from '../../components/cards/create/createCategoriaComp.vue'
import CreateProductModal from '../../components/cards/create/createProdutoComp.vue'
import ManageCategoriasModal from '../../components/cards/manage/manageCategoriasComp.vue'
import { fetchProdutos } from '../../services/produtoService'
import { fetchCategorias } from '../../services/categoriaService'
  import ManageProdutosModal from '../../components/cards/manage/manageProdutosComp.vue'



const produtos = ref([])
const categorias = ref([])
const categoriaMap = ref({})

const modalCategoriaOpen = ref(false)
const modalProdutoOpen = ref(false)
const modalGerenciarCategoriasOpen = ref(false)
const modalGerenciarProdutosOpen = ref(false)

async function carregarDados() {
  categorias.value = await fetchCategorias()
  categoriaMap.value = categorias.value.reduce((acc, cat) => {
    acc[cat.id] = cat.nome
    return acc
  }, {})

  produtos.value = await fetchProdutos()
}

function handleCategoriaSave(novaCategoria) {
  categorias.value.push(novaCategoria)
  categoriaMap.value[novaCategoria.id] = novaCategoria.nome
}

function handleProdutoSave(novoProduto) {
  produtos.value.push(novoProduto)
}

function removerCategoria(id) {
  categorias.value = categorias.value.filter(cat => cat.id !== id)
}

function atualizarCategoria(categoriaAtualizada) {
  const index = categorias.value.findIndex(cat => cat.id === categoriaAtualizada.id)
  if (index !== -1) {
    categorias.value[index] = categoriaAtualizada
    categoriaMap.value[categoriaAtualizada.id] = categoriaAtualizada.nome
  }
}

onMounted(carregarDados)
</script>

<style scoped>
.estoque-container {
  display: flex;
}
.estoque-content {
  margin-left: 25px;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
