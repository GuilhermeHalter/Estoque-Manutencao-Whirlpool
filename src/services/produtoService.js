import axios from 'axios'

const API_URL = 'https://mgfmg6-8000.csb.app/api/produtos/'

export async function fetchProdutos() {
  const response = await axios.get(API_URL)
  return response.data
}
