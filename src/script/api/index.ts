import http from "../utils/http"

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