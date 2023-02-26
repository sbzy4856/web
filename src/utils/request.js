import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { downloadFile } from './index'
import router from '@/router'
// import auth from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: "",
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // console.log(config);
    if ((config && config.isDownload) || (config && config.showImg)) {
      config.responseType = 'blob'
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    console.log("response", response);
    if (
      response.config &&
      response.config.name === 'showFileImg' &&
      response.headers['content-type'] === 'application/json' &&
      response.status === 200
    ) {
      return
    }
    //异步下载判断
    if (
      response.headers['content-type'] === 'application/force-download' &&
      response.status === 200
    ) {
      downloadFile(response)
      return
    }
    //异步加载图片
    if (
      response.headers['content-type'] === 'image/*' &&
      response.status === 200
    ) {
      return response
    }
    let data = response.data
    if (!data) {
      window.location.reload()
    }
    if (data.code === 200) {
      return data.data
    }
    // if (data.status == "401" || data.status == 401) {
    //     auth.removeCurrentUser();
    //     routerLearn.push({
    //         name: "login"
    //     });
    //     return;
    // }
    if (data.code == 401 || data.code == 401) {
      // auth.removeCurrentUser();
      localStorage.clear()
      // if (process.env.NODE_ENV !== 'development') {
      //     window.location.href = `${window.location.origin}/login`;
      //   } else {
      //     router.push({
      //         name: "login"
      //     });
      //   }
      router.push({
        path: '/'
      })
      return
    }
    if (data.code == '406' || data.code == 406) {
      if (data.body.length && data.message == '') {
        data.message = data.body[0].defaultMessage
      }
    }
    Message.error(data.message)
    return Promise.reject(data.message || 'Error')
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
