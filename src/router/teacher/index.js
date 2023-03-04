import teacherProject from './teacher-project'
import courseManage from './course-manage'

export default [
  {
    path: '/teacherIndex',
    name: 'teacherIndex',
    redirect: {
      name: 'teacher-project'
    },
    component: () => import('@/views/teacher/teacher-index'),
    children: [...teacherProject, ...courseManage]
  }
]
