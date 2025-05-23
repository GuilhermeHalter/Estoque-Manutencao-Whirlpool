<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h2>Novo Produto</h2>

      <input v-model="produto.nome" type="text" placeholder="Nome do produto" />
      <input v-model.number="produto.quantidade" type="number" placeholder="Quantidade" />
      <input v-model="produto.numero_serie" type="text" placeholder="Número de série" />
      <input v-model="produto.preco" type="text" placeholder="Preço" />
      <input v-model="produto.data_cadastro" type="date" placeholder="Data de Cadastro" />

      <select v-model="produto.categoria">
        <option disabled value="">Selecione uma categoria</option>
        <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.nome }}</option>
      </select>

      <div class="modal-buttons">
        <button class="cancel" @click="$emit('close')">Cancelar</button>
        <button class="save" @click="handleSave">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createProduto } from '../../../services/produtoService'
import { fetchCategorias } from '../../../services/categoriaService'

const props = defineProps({
  show: Boolean
})
const emit = defineEmits(['close', 'save'])

const categorias = ref([])
const produto = ref({
  nome: '',
  quantidade: null,
  numero_serie: '',
  preco: '',
  data_cadastro: '',
  categoria: ''
})

async function handleSave() {
  if (!produto.value.nome.trim()) return alert('Digite o nome do produto')
  if (!produto.value.categoria) return alert('Selecione uma categoria')

  try {
    const novoProduto = await createProduto(produto.value)
    emit('save', novoProduto)
    resetForm()
    emit('close')
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    alert('Erro ao criar produto')
  }
}

function resetForm() {
  produto.value = {
    nome: '',
    quantidade: null,
    numero_serie: '',
    preco: '',
    data_cadastro: '',
    categoria: ''
  }
}

onMounted(async () => {
  categorias.value = await fetchCategorias()
})
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background-color: white;
  padding: 24px;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
.modal-content h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}
.modal-content input,
.modal-content select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 16px;
}
.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.modal-buttons button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}
.modal-buttons .cancel {
  background-color: #ccc;
  color: #333;
}
.modal-buttons .save {
  background-color: #2563eb; 
  color: white;
}
.modal-buttons .save:hover {
  background-color: #1e40af;
}
.modal-buttons .cancel:hover {
  background-color: #999;
}
</style>