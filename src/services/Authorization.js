const token = localStorage.getItem('access_token');

const response = await axios.get('https://seu-backend-url/api/algum-recurso/', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
