import { createRouter, createWebHistory } from 'vue-router'

import LoginView from  '../views/loginView.vue'
import EstoqueView from  '../views/estoqueView.vue'
import HistoricoView from  '../views/historicoView.vue'
import FaceIDView from  '../views/faceIDView.vue'
import RetiradaView from  '../views/retiradaView.vue'
import LoginAdminView from  '../views/admin/loginAdminView.vue'
import EstoqueAdminView from  '../views/admin/estoqueAdminView.vue'

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
  },
  {
    path: '/admin',
    name: 'LoginAdmin',
    component: LoginAdminView
  },
  {
    path: '/admin/estoque',
    name: 'EstoqueAdmin',
    component: EstoqueAdminView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
  })

export default router