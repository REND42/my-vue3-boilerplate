import http from "../utils/http"

const BASEURL = 'http://localhost:3000'

export const getAllDoodles = (data:object) => {
  return http.request({
    url: '/doodles/all',
    method: 'POST',
    data
  })
}

export const getDoodleNum = () => {
  return http.request({
    url: '/doodles',
    method: 'GET'
  })
}

export const register = (params: object) => {
  return http.request({
    baseURL: BASEURL,
    url: '/auth/register',
    method: 'POST',
    data: params
  })
}

export const login = (params: object) => {
  return http.request({
    baseURL: BASEURL,
    url: '/auth/login',
    method: 'POST',
    data: params
  })
}