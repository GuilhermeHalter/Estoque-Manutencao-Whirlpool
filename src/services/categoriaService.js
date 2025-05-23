import axios from 'axios'

const API_URL = 'https://759lh3-8000.csb.app//api/categorias/'

export async function fetchCategorias() {
  const response = await axios.get(API_URL)
  return response.data
}

export async function createCategoria(nome) {
  const response = await axios.post(API_URL, { nome });
  return response.data;
}

