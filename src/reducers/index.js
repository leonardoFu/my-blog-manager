import article from './article';
import login from './login';
import menu from './menu';

import { combineReducers } from 'redux'

let mainReducer = combineReducers({
  article,
  login,
  menu
})

const rootReducer = (state, action) => {
  return mainReducer(state, action);
}

export default rootReducer;
