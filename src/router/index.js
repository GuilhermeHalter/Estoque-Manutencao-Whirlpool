import { createRouter, createWebHistory } from 'vue-router'

import LoginView from  '../views/loginView.vue'
import EstoqueView from  '../views/estoqueView.vue'
import HistoricoView from  '../views/historicoView.vue'
import FaceIDView from  '../views/faceIDView.vue'
import RetiradaView from  '../views/retiradaView.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },  
  {
    path: '/estoque',
    name: 'Estoque',
    component: EstoqueView
  },
  {
    path: '/historico',
    name: 'Historico',
    component: HistoricoView
  },
  {
    path: '/faceID',
    name: 'FaceID',
    component: FaceIDView
  },
  {
    path: '/retirada',
    name: 'Retirada',
    component: RetiradaView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
  })

export default router