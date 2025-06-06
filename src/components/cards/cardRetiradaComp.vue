<template>
  <div class="card">
    <div class="card-header">
      <span class="categoria-tag">{{ nomeCategoria }}</span>
      <input
        type="checkbox"
        class="card-checkbox"
        :checked="isSelected"
        @change="toggleSelection"
      />
    </div>

    <div class="card-content">
      <div class="card-title">{{ produto.nome }}</div>
      <div class="card-code">Código: {{ produto.numero_serie }}</div>
      <div class="card-stock">
        Disponível:
        <span class="card-quantity">{{ produto.quantidade }}</span>
        <i class="fa-solid fa-cart-shopping cart-icon"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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
  width: 220px;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.categoria-tag {
  background-color: #f5f5f5;
  border-radius: 12px;
  border: 1px solid darkgray;
  padding: 4px 8px;
  font-size: 12px;
}

.card-checkbox {
  width: 16px;
  height: 16px;
}

.card-content {
  margin-top: 12px;
}

.card-title {
  font-weight: bold;
  font-size: 16px;
}

.card-code {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.card-stock {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.card-quantity {
  color: red;
  font-weight: bold;
}

.cart-icon {
  font-size: 18px;
  cursor: pointer;
}
</style>
