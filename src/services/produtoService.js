import axios from 'axios'

const API_URL = 'https://estoque-b8sm.onrender.com/api/produtos/'

// Obter a lista de produtos
export async function fetchProdutos() {
  const response = await axios.get(API_URL)
  return response.data
}

// Criar um novo produto
export async function createProduto(produtoData) {
  try {
    const response = await axios.post(API_URL, produtoData)
    return response.data
  } catch (error) {
    console.error('Erro ao criar produto:', error.response?.data || error.message)
    throw error
  }
}

export async function deleteProduto(id){
  const response = await axios.delete(`${API_URL}${id}/`)
  return response.data
}

export async function updateProduto(id, dadosAtualizados){
  const response = await axios.put(`${API_URL}${id}/`, dadosAtualizados)
  return response.data
}