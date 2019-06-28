import * as types from './actionType'
import { getToken, setToken } from '@/libs/utils'
let initalState = {
  value: '初始值',
  tagNav: '首页',
  token: getToken(),
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
      setToken(action.token)
      newState = Object.assign({}, newState, { token: action.token })
      break
    default:
      newState = Object.assign({}, state)
  }

  return newState
}
