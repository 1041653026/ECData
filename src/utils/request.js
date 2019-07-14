// 封装axios
import axios from 'axios'
// import store from '../store'
import { Message, Loading }  from 'element-ui';


let loadingInstance

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // 创建 Loading
  loadingInstance = Loading.service({fullscreen: true, text: 'Loading', color: '#332117', background: 'rgba(0, 0, 0, 0.5)'})
  // let _token = JSON.parse(localStorage.getItem('token'));
  // if (_token) {
  //   config.headers['X-Token'] = _token // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
  console.log('config error:', error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    // 请求响应成功关闭全屏 Loading
    loadingInstance && loadingInstance.close()
    return response.data
  },
  error => {
    // 请求响应失败关闭全屏 Loading
    loadingInstance && loadingInstance.close()
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    console.log('response error:' + error)// for debug
    return Promise.reject(error)
  }
)

export default service
