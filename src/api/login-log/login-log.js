import request from '@/utils/request'

// 获取所有公告
export function getAllLogs(option) {
  return request({
    url: `/log`,
    method: 'get',
    ...option
  })
}
