// src/api/produtos.js
import apiClient from '../api/api'; 

// Obter a lista de produtos
export async function fetchProdutos() {
  const response = await apiClient.get('produtos/');
  return response.data;
}

// Criar um novo produto
export async function createProduto(produtoData) {
  try {
    const response = await apiClient.post('produtos/', produtoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error.response?.data || error.message);
    throw error;
  }
}

// Deletar um produto
export async function deleteProduto(id) {
  const response = await apiClient.delete(`produtos/${id}/`);
  return response.data;
}

// Atualizar um produto
export async function updateProduto(id, dadosAtualizados) {
  const response = await apiClient.put(`produtos/${id}/`, dadosAtualizados);
  return response.data;
}
