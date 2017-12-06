import * as types from './mutation-types'
const mutation = {
  [types.SET_USER] (state, user) {
    state.user = user
  }
}

export default mutation
