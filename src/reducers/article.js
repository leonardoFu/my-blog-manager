import { createReducer } from 'utils/reducerUtils';
import {
  ARTICLE_LIST_REQUEST,
  INIT_ARTICLE_LIST,
  CLEAR_ARTICLE_LIST,
  INIT_CURRENT_ARTICLE,
  INIT_ARTICLE_LIST_FAILD,
  ARTICLE_CLASSES_REQUEST,
  ARTICLE_CLASSES_FAILD,
  INIT_ARTICLE_CLASSES,
  DEL_ARTICLES_FAILD,
  DEL_ARTICLES_REQUEST,
  DEL_ARTICLES_SUCCESS,
  CLEAR_ARTICLES_ERROR
} from 'constants/ActionTypes';

const initialState = {
  list: [],
  current: {},
  total: 0,
  error: null,
  delSuccess: false,
  loading: false,
  classes: []
}

const initArticleList =  (state, action) => {
  let { payload: {articles: list, total} } = action;
  return Object.assign({}, state, { list, total, loading: false });
};

const initAticleListFaild = (state, action) => {
  let { payload: message } = action;
  return Object.assign({}, state, {error: message, loading: false});
}


const articleListRequest = (state, action) => {
  return Object.assign({}, state, {loading: true});
}

const clearArticleList = (state, action) => {
  return Object.assign(state, { list: initialState.list });
}

const initCurrentArticle = (state, action) => {
  let { payload: current } = action;
  return Object.assign(state, { current })
}

const initAticleClassesFaild = (state, action) => {
  let { payload: message } = action;
  return Object.assign({}, state, {error: message, loading: false});
}

const articleClassesRequest = (state) => {
  return Object.assign({}, state, {loading: true});
}

const initArticleClasses = (state, action) => {
  let { payload: classes } = action;
  return Object.assign({}, state, { loading: false, classes })
}

const delArticlesRequest = (state, action) => {
  return Object.assign({}, state, {loading: true});
}

const delArticlesSuccess = (state, action) => {
  return Object.assign({}, state, {delSuccess: true, loading: false});
}

const delArticlesFailed = (state, action) => {
  let { payload: message } = action;
  return Object.assign({}, state, {error: message, loading: false});
}

const clearArticlesErr = (state, action) => {
  return Object.assign({}, state, {error: initialState.error})
}
let articleReducer = createReducer(initialState, {
  [INIT_ARTICLE_LIST]: initArticleList,
  [CLEAR_ARTICLE_LIST]: clearArticleList,
  [INIT_CURRENT_ARTICLE]: initCurrentArticle,
  [INIT_ARTICLE_LIST_FAILD]: initAticleListFaild,
  [ARTICLE_LIST_REQUEST]: articleListRequest,
  [ARTICLE_CLASSES_REQUEST]: articleClassesRequest,
  [ARTICLE_CLASSES_FAILD]: initAticleClassesFaild,
  [INIT_ARTICLE_CLASSES]: initArticleClasses,
  [DEL_ARTICLES_FAILD]: delArticlesFailed,
  [DEL_ARTICLES_REQUEST]: delArticlesRequest,
  [DEL_ARTICLES_SUCCESS]: delArticlesSuccess,
  [CLEAR_ARTICLES_ERROR]: clearArticlesErr
})

export default articleReducer;
