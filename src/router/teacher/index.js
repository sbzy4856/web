import teacherProject from './teacher-project'
import courseManage from './course-manage'
import loginLog from './login-log'
import studentManage from './student-manage'
import fileManage from './file-manage'

export default [
  {
    path: '/teacherIndex',
    name: 'teacherIndex',
    redirect: {
      name: 'teacher-project'
    },
    component: () => import('@/views/teacher/teacher-index'),
    children: [
      ...teacherProject,
      ...courseManage,
      ...loginLog,
      ...studentManage,
      ...fileManage
    ]
  }
]
