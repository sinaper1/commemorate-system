import { get, post, postp } from '@api'

export const checkNumber = data => {
  return get(`/phone/${data}`)
}
export const register = data => {
  return post('/register', data)
}
export const login = data => {
  return post('/login/normal', data)
}
export const loginPhone = data => {
  return post('/login/phone', data)
}
export const reset = data => {
  return post('/forget', data)
}
export const getUserInfo = id => {
  return get(`/token/user/information/${id}`)
}