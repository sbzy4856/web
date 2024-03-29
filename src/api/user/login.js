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
export function modifyUser(option) {
  return request({
    url: `/user`,
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

// 发送邮箱
export function sendEmail(option) {
  return request({
    url: `/sendEmail`,
    method: 'get',
    ...option
  })
}

// 学生激活
export function active(code, option) {
  return request({
    url: `/active`,
    method: 'post',
    params: { code: code },
    data: option
  })
}
