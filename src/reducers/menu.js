import { createReducer } from 'utils/reducerUtils';
import { OPEN_MENU, CLOSE_MENU } from 'constants/ActionTypes';
const initialState = {
  open: true
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
export default createReducer(initialState, {
  [OPEN_MENU]: openMenu,
  [CLOSE_MENU]: closeMenu
})
