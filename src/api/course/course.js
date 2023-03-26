import request from '@/utils/request'

// 获取所有课程
export function getAllCourses(option) {
  return request({
    url: `/course`,
    method: 'get',
    ...option
  })
}

// 添加课程
export function addCourse(option, userId, userName) {
  return request({
    url: `/course?userId=${userId}&userName=${userName}`,
    method: 'post',
    ...option
  })
}

// 修改课程信息
export function updateCourse(option) {
  return request({
    url: `/course`,
    method: 'put',
    ...option
  })
}
