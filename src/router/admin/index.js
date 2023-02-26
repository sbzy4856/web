import notice from './notice'
import userInfoManage from './userInfo-manage'

export default [
  {
    path: '/adminIndex',
    name: 'adminIndex',
    component: () => import('@/views/admin/admin-index'),
    children: [...notice, ...userInfoManage]
  }
]
