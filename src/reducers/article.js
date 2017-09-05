import { createReducer } from 'utils/reducerUtils';
import { INIT_ARTICLE_LIST, CLEAR_ARTICLE_LIST, INIT_CURRENT_ARTICLE } from 'constants/ActionTypes';

const initialState = {
  list: [],
  current: {},
  total: 0
}

const initArticleList =  (state, action) => {
  let { payload: {articles: list, total} } = action;
  return Object.assign({}, state, { list, total });
};

const clearArticleList = (state, action) => {
  return Object.assign(state, { list: initialState.list });
}
const initCurrentArticle = (state, action) => {
  let { payload: current } = action;
  return Object.assign(state, { current })
}

let articleReducer = createReducer(initialState, {
  [INIT_ARTICLE_LIST]: initArticleList,
  [CLEAR_ARTICLE_LIST]: clearArticleList,
  [INIT_CURRENT_ARTICLE]: initCurrentArticle
})

export default articleReducer;
