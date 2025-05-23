import axios from 'axios'

const API_URL = 'https://mgfmg6-8000.csb.app/api/categorias/'

export async function fetchCategorias() {
  const response = await axios.get(API_URL)
  return response.data
}
