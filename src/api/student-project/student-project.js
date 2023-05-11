import request from '@/utils/request'

// 获取实验项目所有学生
export function getAllStudents(option) {
  return request({
    url: `/studentProject`,
    method: 'get',
    ...option
  })
}

// 添加学生到实验项目
export function addStudentToProject(option) {
  return request({
    url: `/studentProject`,
    method: 'post',
    ...option
  })
}

// 修改学生成绩
export function revisionOfStudentGrades(option) {
  return request({
    url: `/studentProject`,
    method: 'put',
    ...option
  })
}

// 获取学生参加的课程
export function getCourseByStudentId(option) {
  return request({
    url: `/studentProject/studentId`,
    method: 'get',
    ...option
  })
}
