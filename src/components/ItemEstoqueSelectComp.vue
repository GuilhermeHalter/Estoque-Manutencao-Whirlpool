<template>
  <div
    v-if="selectedCount > 0"
    class="fixed-panel"
  >
    <span class="text-gray-800 font-medium">
      {{ selectedCount }} item{{ selectedCount > 1 ? 's' : '' }} selecionado{{ selectedCount > 1 ? 's' : '' }}
    </span>

    <button
      @click="onClear"
      class="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
    >
      Limpar
    </button>

    <button
      @click="onAddToCart"
      class="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
    >
      <i class="fa-solid fa-cart-shopping"></i> Adicionar
    </button>
  </div>
</template>

<script setup>
defineProps({
  selectedCount: {
    type: Number,
    required: true
  },
  onClear: {
    type: Function,
    required: true
  },
  onAddToCart: {
    type: Function,
    required: true
  }
});
</script>

<style scoped>
  .fixed-panel {
    position: fixed;
    bottom: 16px;
    right: 16px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    z-index: 999;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .fixed-panel span {
    color: #333;
    font-weight: 500;
    font-size: 15px;
  }

  .fixed-panel button {
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .fixed-panel button:first-of-type {
    background-color: #e5e5e5;
    color: #333;
  }

  .fixed-panel button:first-of-type:hover {
    background-color: #d4d4d4;
  }

  .fixed-panel button:last-of-type {
    background-color: #2563eb; /* blue-600 */
    color: white;
  }

  .fixed-panel button:last-of-type:hover {
    background-color: #1d4ed8; /* blue-700 */
  }

</style>
