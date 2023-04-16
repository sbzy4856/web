import studentCourse from './student-course'

export default [
  {
    path: '/studentIndex',
    name: 'studentIndex',
    redirect: {
      name: 'student-project'
    },
    component: () => import('@/views/student/student-index'),
    children: [...studentCourse]
  }
]
