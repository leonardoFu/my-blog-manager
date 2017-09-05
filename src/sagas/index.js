import { all, take, call, put, fork } from 'redux-saga/effects'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from 'constants/ActionTypes';
import { login } from 'service/user';
export function* watchLogin(){
  while(true){
    const { payload } = yield take(LOGIN_REQUEST);
    yield put({
      type: LOGIN_REQUEST
    });
    let loginResult = yield call(login, payload);
    let action;
    if(loginResult.error_code === 200){
      action = {
        type: LOGIN_SUCCESS
      };
    } else {
      action = {
        type: LOGIN_FAILED,
        payload: loginResult.message
      };
    }
    yield put(action);
  }
}

export default function* root() {
  yield all([
    fork(watchLogin),
  ])
}
