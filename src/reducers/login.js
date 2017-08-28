import { createReducer } from 'utils/reducerUtils';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from 'constants/action_types'

const initialState = {
  requestPedding: false,
  error: null,
  success: false
}

const loginRequest = (state, action) => {
  return {
    requestPedding: true,
    error: null,
    success: false
  }
}

const loginSuccess = (state, action) => {
  return {
    requestPedding: false,
    error: null,
    success: true
  }
}
const loginFailed = (state, action) => {
  const { payload: errorMsg } = action;
  return {
    requestPedding: false,
    error: errorMsg,
    success: false
  }
}
const loginReducer = createReducer(initialState, [
  LOGIN_REQUEST: loginRequest,
  LOGIN_SUCCESS: loginSuccess,
  LOGIN_FAILED: loginFailed
])
export default loginReducer;
