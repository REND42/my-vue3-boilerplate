import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import { useStore } from "@/store";

interface BaseType {
  baseURL: string
  getConfigParams(): any
  interceptors(instance: AxiosInstance, url: string | number | undefined): any
  request(options: AxiosRequestConfig): any
}

interface AxiosRequestType {
  baseURL?: string
  url?: string | undefined
  data?: any
  params?: any
  method?: string
  headers?: any
  timeout?: any
  value?: any
  cancelToken?: any
}

const store = useStore()

// 取消重复请求
const CancelToken = axios.CancelToken
// 用于存储每个请求的取消函数及对应标识
let sources: any = []

// 取消函数
let removeSource = (config: any) => {
  for(let item in sources) {
    if(sources[item].umet === config.url + '&' + config.method) {
      sources[item].cancel()
      sources.splice(item, 1)
    }
  }
}


class AxiosHttpRequest implements BaseType {
  baseURL: string
  timeout: number

  constructor() {
    this.baseURL = import.meta.env.VITE_APP_BASE_URL
    // this.baseURL = 'http://localhost:3002/api'
    this.timeout = 1500
  }

  getConfigParams() {
    const config = {
      baseURL: this.baseURL,
      timeout: this.timeout,
      header: {}
    }
    return config
  }

  interceptors(instance: AxiosInstance, url: string | number | undefined) {
    // 请求拦截
    instance.interceptors.request.use((config: AxiosRequestType) => {
      removeSource(config)
      config.cancelToken = new CancelToken(c => {
        // 存储取消函数
        sources.push({ umet: config.url+'&' + config.method, cancel: c })
      })
      // 全局loading
      // 请求头携带token
      const token = localStorage.getItem('token')
      if(token) {
        config.headers['Authorization'] = `Bearer ${ token }` 
      } 
      config.headers['Content-Type'] = 'application/json;charset=utf-8'
      config.headers['Access-Control-Allow-Origin'] = "*"
      if(config.method === 'get' && config.params) {
        let url = config.url + '?'
        for(let propName of Object.keys(config.params)) {
          let value = config.params[propName]
          let part = encodeURIComponent(propName) + '='
          if(value !== null && typeof(value) !== 'undefined') {
            if(typeof value === 'object') {
              for(let key of Object.keys(value)) {
                let params = propName + '[' + key + ']'
                let subPart = encodeURIComponent(params) + '='
                url += subPart + encodeURIComponent(value[key]) + '&'
              }
            } else {
              url += part + encodeURIComponent(value) + '&'
            }
          }
        }
        url = url.slice(0, -1)
        config.params = {}
        config.url = url
      }
      return config
    }, (error: any) => {
      return Promise.reject(error)
    })
    
    // 响应拦截
    instance.interceptors.response.use((res: any) => {
      console.log(3333, res)
      // 取消重复请求
      removeSource(res.config)
      // 未设置状态码则默认成功状态
      const code = res.data['code'] || 200
      // 获取错误信息
      let msg = res.data['msg'] || ''
      switch (code) {
        case '401':
          msg = '认证失败，无法访问系统资源'
          break
        case '403':
          msg = '当前操作没有权限'
          break
        case '404':
          msg = '访问资源不存在'
          break
        default:
          msg = '未知错误'
          break
      }
      if(code === 200) {
        return Promise.resolve(res.data)
      } else {
        ElMessage.error(msg)
        return Promise.reject(res.data)
      }
    }, (error: AxiosError) => {
      let { message } = error
      console.log(2222, error, )
      if(message == 'Network Error') {
        message = '接口连接异常'
      } else if(message.includes('timeout')) {
        message = '接口请求超时'
      } else if(message.includes('Request failed with status code')) {
        // message = '接口' + message.substr(message.length - 3) + '异常'
        message = '接口' + message.substr(message.length - 3) + '异常'
      }
      ElMessage.error({
        message: message,
        duration: 5 * 1000
      })
      return Promise.reject(error)
    })
  }

  /**
   * 外部调用方法
   * @param options  请求参数 
   * @returns 
   */
  request(options: AxiosRequestConfig<any>) {
    const instance = axios.create()
    options = Object.assign(this.getConfigParams(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

const http = new AxiosHttpRequest()

export default http