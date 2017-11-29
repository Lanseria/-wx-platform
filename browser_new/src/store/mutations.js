import * as types from './mutation-types'
const mutation = {
  [types.SET_USERTOKEN] (state, userToken) {
    state.userToken = userToken
  }
}

export default mutation
