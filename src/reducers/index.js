import article from './article';
import login from './login';
import menu from './menu';
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

let mainReducer = combineReducers({
  article,
  login,
  menu,
  routing: routerReducer
})

const rootReducer = (state, action) => {
  return mainReducer(state, action);
}

export default rootReducer;
