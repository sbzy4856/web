import request from '@/utils/request'

// 获取所有文件
export function getAllFiles(option) {
  return request({
    url: `/file`,
    method: 'get',
    ...option
  })
}

// 教师下载
export function teacherDownload(option) {
  return request({
    url: `download/teacher`,
    method: 'get',
    ...option
  })
}

// 学生下载
export function studentDownload(option) {
  return request({
    url: `download/student`,
    method: 'get',
    ...option
  })
}

// 获取学生上传的文件
export function getStudentFiles(option) {
  return request({
    url: '/file/student',
    method: 'get',
    ...option
  })
}
