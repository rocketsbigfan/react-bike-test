import * as types from './actionType'
import { getToken, getMenu } from '@/libs/utils'
let initalState = {
  value: '初始值',
  tagNav: '首页',
  token: getToken(),
  menu: getMenu(),
}
export default function(state = initalState, action) {
  let newState = {}
  switch (action.type) {
    case types.REDUX_TEST:
      newState = Object.assign({}, state, { value: action.value })
      break
    case types.CHANGE_TAGNAV_TEXT:
      newState = Object.assign({}, state, { tagNav: action.tagNav })
      break
    case types.CHANGE_TOKEN:
      newState = Object.assign({}, newState, { token: action.token })
      break
    case types.CHANGE_MENU:
      newState = Object.assign({}, newState, { menu: action.menu })
      break
    default:
      newState = Object.assign({}, state)
  }

  return newState
}
