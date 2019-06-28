export const getToken = _ => {
  return sessionStorage.getItem('token')
}
export const setToken = token => {
  return sessionStorage.setItem('token', token)
}
