import { all, take, call, put, fork } from 'redux-saga/effects'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  ARTICLE_LIST_REQUEST,
  INIT_ARTICLE_LIST,
  INIT_ARTICLE_LIST_FAILD,
  ARTICLE_CLASSES_REQUEST,
  INIT_ARTICLE_CLASSES,
  ARTICLE_CLASSES_FAILD
} from 'constants/ActionTypes';
import { login } from 'service/user';
import { queryArticles, queryClasses } from 'service/article';
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
    let [articles, classes] = yield [
      call(queryArticles, payload),
      call(queryClasses)
    ];
    
    if(articles.error_code === 200) {
      yield put(createAction(INIT_ARTICLE_LIST, articles.data));
    } else {
      yield put(createAction(INIT_ARTICLE_LIST_FAILD, articles.message))
    }

    if(classes.error_code === 200) {
      yield put(createAction(INIT_ARTICLE_CLASSES, classes.data));
    } else {
      yield put(createAction(ARTICLE_CLASSES_FAILD, classes.message))
    }
  }
}

function* watchInitArticleClasses() {
  while(true) {
    yield take(ARTICLE_CLASSES_REQUEST);
    let result = yield call(queryClasses);
    if(result.error_code === 200) {
      yield put(createAction(INIT_ARTICLE_CLASSES, result.data));
    } else {
      yield put(createAction(ARTICLE_CLASSES_FAILD, result.message));
    }
  }
}
export default function* root() {
  yield all([
    fork(watchLogin),
    fork(watchInitArticles),
    fork(watchInitArticleClasses)
  ])
}
