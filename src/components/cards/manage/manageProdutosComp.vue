<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h3>Gerenciar Produtos</h3>

      <ul>
        <li v-for="produto in produtos" :key="produto.id" class="mb-2">
          {{ produto.nome }} ({{ produto.numero_serie }})
          <button @click="abrirModalEdicao(produto)" class="bg-blue-500 text-white px-2 py-1 rounded ml-2">Editar</button>
          <button @click="deletarProduto(produto.id)" class="bg-red-500 text-white px-2 py-1 rounded ml-2">Deletar</button>
        </li>
      </ul>

      <button @click="$emit('close')" class="mt-4 bg-gray-300 px-4 py-2 rounded">Fechar</button>
    </div>

    <!-- Modal de Edição -->
    <div v-if="modalEdicaoAberto" class="modal-overlay">
      <div class="modal-content max-w-md w-full">
        <h4 class="mb-4 text-lg font-semibold">Editar Produto</h4>

        <div class="space-y-2">
          <input v-model="produtoEditado.nome" class="input" placeholder="Nome do Produto" />
          <input v-model="produtoEditado.numero_serie" class="input" placeholder="Número de Série" />
          <input v-model.number="produtoEditado.quantidade" type="number" class="input" placeholder="Quantidade" />
          <input v-model="produtoEditado.preco" type="number" step="0.01" class="input" placeholder="Preço" />
          <select v-model.number="produtoEditado.categoria" class="input">
            <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.nome }}</option>
          </select>
        </div>

        <div class="flex justify-end mt-4 space-x-2">
          <button @click="salvarEdicao" class="bg-green-600 text-white px-4 py-2 rounded">Salvar</button>
          <button @click="fecharModalEdicao" class="bg-gray-400 text-white px-4 py-2 rounded">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { deleteProduto, updateProduto } from '../../../services/produtoService'

const props = defineProps({
  show: Boolean,
  produtos: Array,
  categorias: Array
})

const emit = defineEmits(['close', 'produto-deletado', 'produto-editado'])

const modalEdicaoAberto = ref(false)
const produtoEditado = ref({})

function abrirModalEdicao(produto) {
  produtoEditado.value = { ...produto } // clone para edição
  modalEdicaoAberto.value = true
}

function fecharModalEdicao() {
  modalEdicaoAberto.value = false
  produtoEditado.value = {}
}

async function salvarEdicao() {
  try {
    const atualizado = await updateProduto(produtoEditado.value.id, produtoEditado.value)
    emit('produto-editado', atualizado)
    fecharModalEdicao()
  } catch (err) {
    alert('Erro ao atualizar produto')
    console.error(err)
  }
}

async function deletarProduto(id) {
  if (confirm('Tem certeza que deseja deletar este produto?')) {
    try {
      await deleteProduto(id)
      emit('produto-deletado', id)
    } catch (err) {
      alert('Erro ao deletar produto')
      console.error(err)
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
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
}
.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
