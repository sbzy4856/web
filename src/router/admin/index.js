import notice from './notice'

export default [
  {
    path: '/adminIndex',
    name: 'adminIndex',
    component: () => import('@/views/admin/admin-index'),
    children: [...notice]
  }
]
