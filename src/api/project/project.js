import request from '@/utils/request'

// 获取所有实验项目
export function getAllProjects(option) {
  return request({
    url: `/project`,
    method: 'get',
    ...option
  })
}

// 添加实验项目
export function addProject(option, userId, userName) {
  return request({
    url: `/project`,
    method: 'post',
    ...option
  })
}

// 修改实验项目信息
export function updateProject(id, option) {
  return request({
    url: `/project/${id}`,
    method: 'put',
    ...option
  })
}
