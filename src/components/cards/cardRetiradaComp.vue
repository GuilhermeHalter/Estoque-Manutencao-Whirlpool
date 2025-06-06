<template>
  <div class="card">
    <div class="card-title">{{ produto.nome }}</div>
    <div class="card-code">Código: {{ produto.numero_serie }}</div>
    <div class="card-category">Categoria: {{ nomeCategoria }}</div>
    <div class="card-stock">
      Disponível: <span class="card-quantity">{{ produto.quantidade }}</span>
    </div>
    <button class="retirar-btn" @click="abrirModal">
      <i class="fa-solid fa-cart-shopping"></i>
      Retirar Item
    </button>

  </div>

  <!-- Modal de confirmação -->
  <div v-if="mostrarModal" class="modal-overlay">
    <div class="modal-content">
      <p>Realmente deseja retirar <strong>{{ produto.nome }}</strong>?</p>
      <div class="modal-buttons">
        <button @click="confirmarRetirada" class="confirmar">Sim</button>
        <button @click="fecharModal" class="cancelar">Cancelar</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  produto: {
    type: Object,
    required: true
  },
  nomeCategoria: {
    type: String,
    required: true
  },
  selectedItems: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['toggle-select'])

const isSelected = computed(() => {
  return Array.isArray(props.selectedItems) &&
         props.selectedItems.some(p => p.id === props.produto.id)
})

const mostrarModal = ref(false)

  function abrirModal() {
    mostrarModal.value = true
  }

  function fecharModal() {
    mostrarModal.value = false
  }

  function handleLimpar() {
    itensSelecionados.value = []
  }

  function confirmarRetirada() {
    emit('toggle-select', {
      produto: props.produto,
      quantidadeSelecionada: 1
    })
    fecharModal()
  }

function toggleSelection(event) {
  emit('toggle-select', {
    produto: props.produto,
    checked: event.target.checked
  })
}
</script>

<style scoped>
  .card {
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 16px;
    width: 240px;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .card-title {
    font-weight: bold;
    font-size: 16px;
  }

  .card-code,
  .card-category {
    font-size: 14px;
    color: #aaa;
  }

  .card-stock {
    font-size: 14px;
  }

  .card-quantity {
    color: red;
    font-weight: bold;
  }

  .retirar-btn {
    background-color: #007aff;
    color: white;
    border: none;
    padding: 10px;
    margin-top: 8px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .retirar-btn i {
    font-size: 16px;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 260px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  }

  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }

  .modal-buttons .confirmar {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
  }

  .modal-buttons .cancelar {
    background-color: #ddd;
    color: #333;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
  }

</style>
