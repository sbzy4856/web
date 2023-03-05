import request from '@/utils/request'

// 获取所有用户
export function getAllUsers(option) {
  return request({
    url: `/user`,
    method: 'get',
    ...option
  })
}

// 通过id获取用户
export function getUserById(id) {
  return request({
    url: `/user/${id}`,
    method: 'get'
  })
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: `/user/${id}`,
    method: 'delete'
  })
}

// 修改用户
export function modifyUser(id, option) {
  return request({
    url: `/user/${id}`,
    method: 'put',
    ...option
  })
}

// 添加用户
export function addUser(option) {
  return request({
    url: `/user`,
    method: 'post',
    ...option
  })
}

// 登录
export function userLogin(option) {
  return request({
    url: `/login`,
    method: 'post',
    ...option
  })
}
