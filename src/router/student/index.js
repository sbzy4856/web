import studentProject from './student-project'

export default [
  {
    path: '/studentIndex',
    name: 'studentIndex',
    component: () => import('@/views/student/student-index'),
    children: [...studentProject]
  }
]
