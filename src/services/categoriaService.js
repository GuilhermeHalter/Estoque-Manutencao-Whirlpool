// src/services/categorias.js
import apiClient from '../api/api';

export async function fetchCategorias() {
  const response = await apiClient.get('categorias/');
  return response.data;
}

export async function createCategoria(nome) {
  const response = await apiClient.post('categorias/', { nome });
  return response.data;
}

export async function deleteCategoria(id) {
  const response = await apiClient.delete(`categorias/${id}/`);
  return response.data;
}

export async function updateCategoria(id, dadosAtualizados) {
  const response = await apiClient.put(`categorias/${id}/`, dadosAtualizados);
  return response.data;
}
