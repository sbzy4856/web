import request from '@/utils/request'

// 获取所有公告
export function getAllNotices(option) {
  return request({
    url: `/notice`,
    method: 'get',
    ...option
  })
}

// 添加公告
export function addNotice(option) {
  return request({
    url: `/notice`,
    method: 'post',
    ...option
  })
}

// 修改公告
export function modifyNotice(id, option) {
  return request({
    url: `/notice/${id}`,
    method: 'put',
    ...option
  })
}

// 删除公告
export function deleteNotice(id) {
  return request({
    url: `/notice/${id}`,
    method: 'delete'
  })
}

// 修改公告状态
export function modifyNoticeState(id, option) {
  return request({
    url: `/notice/state/${id}`,
    method: 'put',
    ...option
  })
}
