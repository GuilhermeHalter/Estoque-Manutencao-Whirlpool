<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h2>Nova Categoria</h2>
      <input
        v-model="categoryName"
        type="text"
        placeholder="Nome da categoria"
      />
      <div class="modal-buttons">
        <button class="cancel" @click="$emit('close')">Cancelar</button>
        <button class="save" @click="handleSave">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createCategoria } from '../../../services/categoriaService'

const props = defineProps({
  show: Boolean
})
const emit = defineEmits(['close', 'save'])

const categoryName = ref('')

async function handleSave() {
  if (!categoryName.value.trim()) return alert('Digite um nome de categoria.')

  try {
    const novaCategoria = await createCategoria(categoryName.value)
    emit('save', novaCategoria) 
    categoryName.value = ''
    emit('close')
  } catch (error) {
    console.error('Erro ao criar categoria:', error)
    alert('Erro ao criar categoria')
  }
}
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

  .modal-content input {
    width: 94%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
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
