import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/loginView.vue'
import EstoqueView from '../views/estoqueView.vue'
import HistoricoView from '../views/historicoView.vue'
import FaceIDView from '../views/faceIDView.vue'
import RetiradaView from '../views/retiradaView.vue'
import LoginAdminView from '../views/admin/loginAdminView.vue'
import EstoqueAdminView from '../views/admin/estoqueAdminView.vue'
import ConfiguracoesView from '../views/configuracaoView.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/estoque',
    name: 'Estoque',
    component: EstoqueView,
    meta: { requiresAuth: true }
  },
  {
    path: '/historico',
    name: 'Historico',
    component: HistoricoView,
    meta: { requiresAuth: true }
  },
  {
    path: '/faceID',
    name: 'FaceID',
    component: FaceIDView,
    meta: { requiresAuth: true }
  },
  {
    path: '/retirada',
    name: 'Retirada',
    component: RetiradaView,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'LoginAdmin',
    component: LoginAdminView
  },
  {
    path: '/admin/estoque',
    name: 'EstoqueAdmin',
    component: EstoqueAdminView,
    meta: { requiresAuth: true }
  },
  {
    path: '/configuracoes',
    name: 'Configuracoes',
    component: ConfiguracoesView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Protege as rotas com `meta.requiresAuth`
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next({ path: '/' }) // redireciona para login se não tiver token
  } else {
    next() // segue para a rota normalmente
  }
})

export default router
