import axios from 'axios'

const API_URL = 'https://estoque-b8sm.onrender.com/api/categorias/'

export async function fetchCategorias() {
  const response = await axios.get(API_URL)
  return response.data
}

export async function createCategoria(nome) {
  const response = await axios.post(API_URL, { nome })
  return response.data
}

export async function deleteCategoria(id) {
  const response = await axios.delete(`${API_URL}${id}/`)
  return response.data
}

export async function updateCategoria(id, dadosAtualizados) {
  const response = await axios.put(`${API_URL}${id}/`, dadosAtualizados)
  return response.data
}
