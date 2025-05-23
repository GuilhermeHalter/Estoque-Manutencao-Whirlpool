import axios from 'axios'

const API_URL = 'https://759lh3-8000.csb.app/api/produtos/'

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
