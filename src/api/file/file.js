import request from '@/utils/request'

// 获取所有公告
export function getAllFiles(option) {
  return request({
    url: `/file`,
    method: 'get',
    ...option
  })
}
