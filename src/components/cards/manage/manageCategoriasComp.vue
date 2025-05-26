<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h3>Gerenciar Categorias</h3>

      <ul>
        <li v-for="categoria in categorias" :key="categoria.id" class="mb-2">
          {{ categoria.nome }}
          <button @click="abrirModalEdicao(categoria)" class="bg-blue-500 text-white px-2 py-1 rounded">Editar</button>
          <button @click="deletarCategoria(categoria.id)" class="bg-red-500 text-white px-2 py-1 rounded ml-2">Deletar</button>
        </li>
      </ul>

      <button @click="$emit('close')" class="mt-4 bg-gray-300 px-4 py-2 rounded">Fechar</button>
    </div>

    <!-- Modal de edição -->
    <div v-if="modalEdicaoAberto" class="modal-overlay">
      <div class="modal-content">
        <h4>Editar Categoria</h4>
        <input v-model="nomeEditado" class="border px-2 py-1 w-full mt-2" />
        <div class="flex justify-end mt-4 space-x-2">
          <button @click="salvarEdicao" class="bg-green-500 text-white px-3 py-1 rounded">Salvar</button>
          <button @click="fecharModalEdicao" class="bg-gray-400 text-white px-3 py-1 rounded">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { deleteCategoria, updateCategoria } from '../../../services/categoriaService'

const props = defineProps({
  show: Boolean,
  categorias: Array
})

const emit = defineEmits(['close', 'categoria-deletada', 'categoria-editada'])

const modalEdicaoAberto = ref(false)
const categoriaEditando = ref(null)
const nomeEditado = ref('')

function abrirModalEdicao(categoria) {
  categoriaEditando.value = categoria
  nomeEditado.value = categoria.nome
  modalEdicaoAberto.value = true
}

function fecharModalEdicao() {
  categoriaEditando.value = null
  nomeEditado.value = ''
  modalEdicaoAberto.value = false
}

async function salvarEdicao() {
  if (!nomeEditado.value.trim()) {
    alert('O nome não pode estar vazio.')
    return
  }

  try {
    const atualizado = await updateCategoria(categoriaEditando.value.id, { nome: nomeEditado.value })
    emit('categoria-editada', atualizado)
    fecharModalEdicao()
  } catch (err) {
    alert('Erro ao atualizar categoria')
    console.error(err)
  }
}

async function deletarCategoria(id) {
  if (confirm('Tem certeza que deseja deletar esta categoria?')) {
    try {
      await deleteCategoria(id)
      emit('categoria-deletada', id)
    } catch (err) {
      alert('Erro ao deletar categoria')
      console.error(err)
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}
</style>
