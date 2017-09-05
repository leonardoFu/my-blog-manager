import { createReducer } from 'utils/reducerUtils';
import { OPEN_MENU, CLOSE_MENU, TOOLBAR_TITLE } from 'constants/ActionTypes';
const initialState = {
  open: true,
  appTitle: '管理系统'
};

const openMenu = (state, action) => {
  return Object.assign({}, state, {
    open: true
  })
}

const closeMenu = (state, action) => {
  return Object.assign({}, state, {
    open: false
  })
}

const changeTitle = (state, action) => {
  return Object.assign({}, state, {
    appTitle: action.payload
  })
}
export default createReducer(initialState, {
  [OPEN_MENU]: openMenu,
  [CLOSE_MENU]: closeMenu,
  [TOOLBAR_TITLE]: changeTitle
})
