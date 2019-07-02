import * as types from './actionType'
import axios from '@/axios'
import { setToken } from '@/libs/utils'
// 测试redux
export const changeReduxTest = value => {
  return {
    type: types.REDUX_TEST,
    value,
  }
}
export const ChangeTagNavText = tagNav => {
  return {
    type: types.CHANGE_TAGNAV_TEXT,
    tagNav,
  }
}
export const ChangeToken = token => {
  return {
    type: types.CHANGE_TOKEN,
    token,
  }
}
export const ChangeMenu = menu => {
  return {
    type: types.CHANGE_MENU,
    menu,
  }
}
// 使用redux-thunk， 异步封装action
export const AsyncLogin = _ => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios
        .get('/login')
        .then(res => {
          if (res.data.code === 200) {
            dispatch(ChangeToken(res.data.result.token))
            setToken(res.data.result.token)
            resolve(res)
          }
        })
        .catch(e => reject(e))
    })
  }
}
