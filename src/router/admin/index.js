import notice from './notice'
import userInfoManage from './userInfo-manage'
import teacherProject from '../teacher/teacher-project'
import courseManage from '../teacher/course-manage'

export default [
  {
    path: '/adminIndex',
    name: 'adminIndex',
    component: () => import('@/views/admin/admin-index'),
    children: [...notice, ...userInfoManage, ...teacherProject, ...courseManage]
  }
]
