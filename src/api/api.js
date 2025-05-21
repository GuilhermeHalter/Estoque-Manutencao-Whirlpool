import axios from 'axios';

async function login(username, password) {
  try {
    const response = await axios.post('https://seu-backend-url/api/token/', {
      username,
      password
    });
    // Recebe os tokens
    const { access, refresh } = response.data;

    // Salva o access token no localStorage (ou Vuex, dependendo da arquitetura)
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);

    // Agora você pode usar o token para chamadas autenticadas
    return true; // login bem sucedido
  } catch (error) {
    console.error('Erro no login', error);
    return false;
  }
}
