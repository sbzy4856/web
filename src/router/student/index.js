import studentProject from './student-project'

export default [
  {
    path: '/studentIndex',
    name: 'studentIndex',
    redirect: {
      name: 'student-project'
    },
    component: () => import('@/views/student/student-index'),
    children: [...studentProject]
  }
]
