import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/index'),
    children: []
  },
  {
    path: '/adminIndex',
    name: 'adminIndex',
    component: () => import('@/views/admin/admin-index')
  }
]

const router = new VueRouter({
  routes
})

export default router
