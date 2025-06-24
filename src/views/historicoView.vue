<template>
  <div class="estoque-container">
    <sidebarComp />
    <div class="historico-content">
      <h2>Histórico</h2>
      <p>Visualize o histórico de retiradas e movimentações</p>

      <div class="top-bar">
        <input
          type="search"
          placeholder="🔍 Busque por Usuário, Item ou Código..."
          v-model="searchTerm"
        />
        <button class="btn btn-outline">Selecionar Data</button>
        <button class="btn btn-outline">Filter</button>
        <button class="btn btn-icon">⭳ Export</button>
      </div>

      <div class="filtros">
        <button :class="{ ativo: filtro === 'todas' }" @click="filtro = 'todas'">
          Todas as Retiradas
        </button>
        <button :class="{ ativo: filtro === 'minhas' }" @click="filtro = 'minhas'">
          Minhas Retiradas
        </button>
      </div>

      <div class="historico-lista">
        <div v-for="r in retiradasFiltradas" :key="r.id" class="card-retirada">
          <div class="retirada-topo">
            <i class="fa-solid fa-box-open" style="color: #38a9ff; background-color: lightgray; padding: 10px; border-radius: 50%; font-size: 23px;"></i>
            <div class="user-info">
              <strong>{{ r.usuario_nome }}</strong>
              <span>{{ r.data }} - {{ r.hora }}</span>
            </div>
            <span class="status">Concluído</span>
          </div>
          <div class="retirada-conteudo">
            <p><strong>Itens retirados:</strong></p>
            <ul>
              <li v-for="item in r.itens" :key="item">{{ item }}</li>
            </ul>
            <hr>
            <p v-if="r.observacoes"><strong>Observações:</strong> {{ r.observacoes }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import sidebarComp from '../components/sidebar/sidebarComp.vue'
import { ref, computed, onMounted } from 'vue'
import apiClient from '../api/api'

const retiradas = ref([])
const usuariosMap = ref({})
const searchTerm = ref('')

  const fetchUsuarios = async () => {
    try {
      const response = await apiClient.get('/usuarios/')
      const map = Object.fromEntries(
        response.data.map(u => [u.id, `${u.first_name} ${u.last_name}`.trim()])
      )
      console.log('Usuários carregados:', map)  // veja o que foi carregado
      usuariosMap.value = map
      return map
    } catch (err) {
      console.error('Erro ao buscar usuários:', err)
      return {}
    }
  }

  const fetchRetiradas = async (usuarios) => {
    try {
      const response = await apiClient.get('/retiradas/')
      console.log('Retiradas:', response.data)  // veja os dados retornados
      retiradas.value = response.data.map(r => {
        const dataObj = new Date(r.data)
        return {
          id: r.id,
          usuario_nome: usuarios[r.usuario] || `Usuário #${r.usuario}`,
          data: dataObj.toLocaleDateString('pt-BR'),
          hora: dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          itens: r.itens.map(i => `${i.quantidade}x ${i.produto_nome}`),
          observacoes: r.observacoes || ''
        }
      })
    } catch (err) {
      console.error('Erro ao buscar retiradas:', err)
    }
  }


  onMounted(async () => {
    const usuarios = await fetchUsuarios()
    await fetchRetiradas(usuarios)
  })


const retiradasFiltradas = computed(() => {
  if (!searchTerm.value.trim()) return retiradas.value
  const termo = searchTerm.value.toLowerCase()
  return retiradas.value.filter(r =>
    r.usuario_nome.toLowerCase().includes(termo) ||
    r.itens.some(item => item.toLowerCase().includes(termo))
  )
})
</script>



<style scoped>
hr{
  margin-top:10px;
}
  
.estoque-container {
  display: flex;
  height: 100vh;
  background: #f8f9fb;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

.historico-content {
  flex: 1;
  padding: 40px 60px;
  overflow-y: auto;
  background-color: #f8f9fb;
}

h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #222;
}

p {
  color: #7b7b7b;
  font-size: 14px;
  margin-bottom: 24px;
}

.top-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.top-bar input[type="search"] {
  flex: 1;
  padding: 12px 20px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fff;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
}

.btn {
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-outline {
  border: 1px solid #ccc;
  background-color: white;
  color: #444;
}

.btn-outline:hover {
  background-color: #f0f0f0;
}

.btn-icon {
  background-color: #fff;
  border: 1px solid #ccc;
  font-weight: bold;
}

.filtros {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.filtros button {
  padding: 8px 18px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background: white;
  font-size: 13px;
  cursor: pointer;
  color: #444;
}

.filtros .ativo {
  background: #007bff;
  color: white;
  font-weight: 500;
  border-color: #007bff;
}

.historico-lista {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-retirada {
  background: white;
  border: 1px solid #dfe4ea;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);
}

.retirada-topo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #e2e8f0;
}

.user-info {
  flex: 1;
}

.user-info strong {
  display: block;
  font-size: 16px;
  color: #222;
}

.user-info span {
  font-size: 13px;
  color: #888;
}

.status {
  background: #e6f4ea;
  color: #35a36b;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  font-weight: 500;
}

.retirada-conteudo {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin-top: 8px;
}

.retirada-conteudo ul {
  padding-left: 20px;
  margin: 6px 0;
}

.retirada-conteudo li {
  margin-bottom: 4px;
}
</style>
