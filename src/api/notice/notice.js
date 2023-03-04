import request from '@/utils/request'

// 获取所有用户
export function getAllNotices(option) {
  return request({
    url: `/notice`,
    method: 'get',
    ...option
  })
}
