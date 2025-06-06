<template>
  <div class="itens-selecionados-card">
    <h3>Itens selecionados</h3>

    <div class="carrinho-vazio" v-if="itens.length === 0">
      <i class="fa-solid fa-cart-shopping"></i>
      <p>Carrinho vazio</p>
      <span>Adicione itens para realizar a retirada.</span>
    </div>

    <li v-for="item in itens" :key="item.id">
      <div class="info-item">
        <p>{{ item.nome }}</p>
        <div>
          <label>Quantidade:</label>
          <input
            type="number"
            v-model.number="item.quantidadeSelecionada"
            :min="1"
            :max="item.quantidade"
            class="input-quantidade"
          />
          <span>/ {{ item.quantidade }} disponíveis</span>
        </div>
      </div>
      <button @click="removerItem(item.id)">✕</button>
    </li>




    <div class="observacao">
      <label for="obs">Observação (opcional)</label>
      <textarea id="obs" v-model="observacao" placeholder="Adicione uma observação sobre esta retirada..."></textarea>
    </div>

    <div class="botoes">
      <button class="confirmar" @click="confirmarRetirada">✔ Confirmar retirada</button>
      <button class="limpar" @click="limparItens">🧹 Limpar Seleção</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  itens: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['confirmar', 'limpar', 'remover'])

const observacao = ref('')

  function confirmarRetirada() {
    emit('toggle-select', {
      produto: props.produto,
      quantidadeSelecionada: 1 // inicia com 1 unidade
    })
    fecharModal()
  }


function limparItens() {
  emit('limpar')
}

function removerItem(id) {
  emit('remover', id)
}
</script>


<style scoped>
.itens-selecionados-card {
  width: 330px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  font-family: Arial, sans-serif;
}

.itens-selecionados-card h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.carrinho-vazio {
  text-align: center;
  color: #888;
  margin-bottom: 16px;
}

.carrinho-vazio i {
  font-size: 28px;
  margin-bottom: 8px;
  display: block;
  color: #444;
}

.carrinho-vazio p {
  font-weight: 600;
  margin: 0;
}

.carrinho-vazio span {
  font-size: 13px;
}

ul {
  padding-left: 0;
  list-style: none;
  margin-bottom: 20px;
}

.observacao label {
  font-size: 13px;
  font-weight: 500;
  color: #555;
}

.observacao textarea {
  width: 92%;
  margin-top: 6px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  resize: none;
  height: 60px;
  background-color: #f9f9f9;
  color: #333;
}

.botoes {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.botoes .confirmar {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.botoes .limpar {
  background-color: #f5f5f5;
  color: #444;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}

  li {
    display: flex;
    flex-direction: row;
    align-items: center; /* alinha tudo verticalmente ao centro */
    padding: 12px 14px;
    border-radius: 8px;
    background-color: #fafafa;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    font-size: 14px;
    color: #2c3e50;
    transition: box-shadow 0.2s ease;
  }

  li:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    background-color: #fff;
  }

  /* A div que engloba o nome e quantidade ocupa o máximo possível */
  .info-item {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  /* Nome do item em cima */
  .info-item > p {
    font-weight: 600;
    color: #222;
    margin: 0 0 6px 0;
  }

  /* Linha da quantidade */
  .info-item > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .info-item > div > label {
    font-size: 13px;
    color: #666;
    white-space: nowrap;
  }

  .info-item > div > .input-quantidade {
    width: 40px;
    padding: 4px 6px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: #fff;
    color: #333;
    transition: border-color 0.2s ease;
  }

  .info-item > div > .input-quantidade:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 4px #007bffaa;
  }

  .info-item > div > span {
    font-size: 12px;
    color: #999;
    user-select: none;
    white-space: nowrap;
  }

  /* Botão remover alinhado verticalmente no centro, sem margem no topo */
  li > button {
    background: transparent;
    border: none;
    color: #e74c3c;
    font-size: 20px;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    margin-left: 12px; /* espaço entre botão e conteúdo */
    height: fit-content;
  }

  li > button:hover {
    background-color: #fceaea;
    color: #c0392b;
  }


  
</style>
