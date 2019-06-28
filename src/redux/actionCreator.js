import * as types from './actionType'
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
