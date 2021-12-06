import Cookies from "js-cookie";

export function setToken(token: string) {
  let expTime = new Date(new Date().getTime() + 3 * 60 * 1000)
  return Cookies.set('token', token, {
    expires: expTime
  })
}

export function getToken(): string | undefined {
  return Cookies.get('token')
}

export function removeToken() {
  return Cookies.remove('token')
}