<template>
  <div class="card">
    <div class="header">
      <span class="tag">Rolamentos</span>
      <input type="checkbox" class="checkbox" />
    </div>
    <div class="content">
      <div class="title">Rolamentos 6040</div>
      <div class="code">Código: RL-6040</div>
      <div class="stock">
        Disponível: <span class="quantity">2</span>
        <i class="cart-icon">🛒</i>
      </div>
    </div>
  </div>
</template>

<script setup>

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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag {
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 4px 8px;
  font-size: 12px;
}

.checkbox {
  width: 16px;
  height: 16px;
}

.content {
  margin-top: 12px;
}

.title {
  font-weight: bold;
  font-size: 16px;
}

.code {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.stock {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.quantity {
  color: red;
  font-weight: bold;
}

.cart-icon {
  font-size: 18px;
  cursor: pointer;
}
</style>
