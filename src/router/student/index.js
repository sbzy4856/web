import studentCourse from './student-course'
import studentProject from './student-project'
import courseResource from './course-resource'

export default [
  {
    path: '/studentIndex',
    name: 'studentIndex',
    redirect: {
      name: 'student-project'
    },
    component: () => import('@/views/student/student-index'),
    children: [...studentCourse, ...studentProject, ...courseResource]
  }
]
