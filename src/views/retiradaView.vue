<template>
  <div class="retirada-container">
    <sidebarComp />
    <div class="retirada-content">
      <h2>Retirada</h2>

      <div class="filtro-container">
        <input type="search" v-model="filtro" placeholder="Buscar produto..." />
      </div>

      <div class="conteudo-retirada">
        <div class="cards">
          <cardRetiradaComp
            v-for="produto in produtosFiltrados"
            :key="produto.id"
            :produto="produto"
            :nomeCategoria="categoriaMap[produto.categoria]"
            @toggle-select="handleToggleSelect"
          />
        </div>

        <itensSelecionadosComp
          :itens="itensSelecionados"
          @confirmar="handleConfirmar"
          @limpar="handleLimpar"
          @remover="handleRemover"
          @atualizar-itens="atualizarItens"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import sidebarComp from '../components/sidebar/sidebarComp.vue'
import cardRetiradaComp from '../components/cards/cardRetiradaComp.vue'
import itensSelecionadosComp from '../components/cards/retirada/itensSelecionadosComp.vue'
import { fetchProdutos } from '../services/produtoService'
import { fetchCategorias } from '../services/categoriaService'
import axios from 'axios'

const produtos = ref([])
const categorias = ref([])
const categoriaMap = ref({})
const filtro = ref('')
const itensSelecionados = ref([])

const produtosFiltrados = computed(() => {
  const termo = filtro.value.toLowerCase()
  return produtos.value.filter(p =>
    p.nome.toLowerCase().includes(termo) || p.numero_serie.toLowerCase().includes(termo)
  )
})

onMounted(async () => {
  produtos.value = await fetchProdutos()
  categorias.value = await fetchCategorias()
  categoriaMap.value = categorias.value.reduce((map, cat) => {
    map[cat.id] = cat.nome
    return map
  }, {})
})

function handleToggleSelect({ produto, quantidadeSelecionada }) {
  const existente = itensSelecionados.value.find(item => item.id === produto.id)
  if (!existente) {
    itensSelecionados.value = [
      ...itensSelecionados.value,
      {
        ...produto,
        quantidadeSelecionada
      }
    ]
  } else {
    itensSelecionados.value = itensSelecionados.value.map(item =>
      item.id === produto.id
        ? { ...item, quantidadeSelecionada }
        : item
    )
  }
}

function atualizarItens(listaAtualizada) {
  itensSelecionados.value = listaAtualizada
}

function handleConfirmar(payload) {
  if (!payload || !payload.itens || payload.itens.length === 0) {
    alert('Nenhum item para confirmar.')
    return
  }
  enviarRetirada(payload.itens, payload.observacao)
}

function handleLimpar() {
  itensSelecionados.value = []
}

function handleRemover(id) {
  itensSelecionados.value = itensSelecionados.value.filter(item => item.id !== id)
}

async function enviarRetirada(itens, observacao) {
  const userStr = localStorage.getItem('user')
  const token = localStorage.getItem('token')
  if (!userStr || !token) {
    alert('Usuário não autenticado.')
    return
  }

  const userArray = JSON.parse(userStr)
  const user = Array.isArray(userArray) && userArray.length > 0 ? userArray[0] : null

  if (!user) {
    alert('Usuário inválido.')
    return
  }

  const payload = {
    usuario: user.id,
    status: 1,
    data: new Date().toISOString(),
    itens: itens.map(i => ({
      produto: i.id,
      quantidade: i.quantidadeSelecionada
    })),
    observacoes: observacao || 'Retirada de itens'
  }

  try {
    await axios.post('https://979lmp-8000.csb.app/api/retiradas/', payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    alert('Retirada enviada com sucesso!')
    itensSelecionados.value = []
  } catch (err) {
    console.error(err)
    alert('Erro ao enviar retirada.')
  }
}
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

.filtro-container input[type="search"] {
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
