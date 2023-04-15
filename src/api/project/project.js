import request from '@/utils/request'

// 获取所有课程
export function getAllProjects(option) {
  return request({
    url: `/project`,
    method: 'get',
    ...option
  })
}

// 添加课程
export function addProject(option, userId, userName) {
  return request({
    url: `/project`,
    method: 'post',
    ...option
  })
}

// 修改课程信息
export function updateProject(option) {
  return request({
    url: `/project`,
    method: 'put',
    ...option
  })
}
