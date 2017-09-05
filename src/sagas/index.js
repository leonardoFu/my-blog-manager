import { all, take, call, put, fork } from 'redux-saga/effects'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  ARTICLE_LIST_REQUEST,
  INIT_ARTICLE_LIST,
} from 'constants/ActionTypes';
import { login } from 'service/user';
import { queryArticles } from 'service/article';
import { createAction } from 'utils/reducerUtils';

export function* watchLogin() {
  while(true) {
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

function* watchInitArticles() {
  while(true) {
    const { payload } = yield take(ARTICLE_LIST_REQUEST);
    let result = yield call(queryArticles, payload);
    if(result.error_code === 200){
      yield put(createAction(INIT_ARTICLE_LIST, result.data));
    }
  }
}
export default function* root() {
  yield all([
    fork(watchLogin),
    fork(watchInitArticles),
  ])
}
