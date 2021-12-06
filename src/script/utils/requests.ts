import axios from "axios";
import { getToken } from "./cookie";

const requests = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 4000
})

// 拦截器
requests.interceptors.request.use( config => {
  config = config || {}
  const token = getToken()
  if(token) {
    config.headers!['Authorization'] = `Bearer ${token}`
  }
  return config
})

requests.interceptors.response.use(res => {
  
})

export default requests