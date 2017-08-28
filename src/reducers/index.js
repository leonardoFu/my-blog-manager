import article from './article';
import login from './login';
import { combineReducers } from 'redux'

let mainReducer = combineReducers({
  article,
  login
})

const rootReducer = (state, action) => {
  return mainReducer(state, action);
}

export default rootReducer;
