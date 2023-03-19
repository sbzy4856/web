import Vue from 'vue'
import VueRouter from 'vue-router'
import admin from './admin/index'
import student from './student'
import teacher from './teacher'
import userInfo from './user-info'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/index'),
    children: []
  },
  {
    path: '/noticeContent',
    name: 'noticeContent',
    component: () => import('@/views/index-notice-content'),
    children: []
  },
  {
    path: '/personalCenter',
    name: 'personalCenter',
    component: () => import('@/views/admin/personal-center'),
    children: []
  },
  ...admin,
  ...teacher,
  ...student,
  ...userInfo
]

const router = new VueRouter({
  routes
})

export default router
