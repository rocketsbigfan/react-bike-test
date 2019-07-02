export const getToken = _ => {
  return sessionStorage.getItem('token')
}
export const setToken = token => {
  return sessionStorage.setItem('token', token)
}
export const getMenu = _ => {
  return sessionStorage.getItem('menu')
    ? JSON.parse(sessionStorage.getItem('menu'))
    : []
}
export const setMenu = menu => {
  return menu && sessionStorage.setItem('menu', JSON.stringify(menu))
}
// 扁平化路由
export const flat = array => {
  return array.reduce((prev, cur, index) => {
    if (index === 0) {
      return [cur]
    }
    return cur.children && cur.children.length
      ? [...prev, cur, ...flat(cur.children)]
      : [...prev, cur]
  }, [])
}
// 查询路由
export const checkRouter = (routers, path) => {
  if (!routers.length) return true
  routers = flat(routers)
  return routers.some(item => {
    return item.key === path
  })
}
