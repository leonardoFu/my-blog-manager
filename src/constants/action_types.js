/*文章*/
const INIT_ARTICLE_LIST = Symbol();

const CLEAR_ARTICLE_LIST = Symbol();

const INIT_CURRENT_ARTICLE = Symbol();

/*登录*/

const LOGIN_REQUEST = Symbol();

const LOGIN_SUCCESS = Symbol();

const LOGIN_FAILED = Symbol();

/*侧边菜单栏*/

const OPEN_MENU = Symbol();

const CLOSE_MENU = Symbol();

export {
  INIT_ARTICLE_LIST,
  CLEAR_ARTICLE_LIST,
  INIT_CURRENT_ARTICLE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  OPEN_MENU,
  CLOSE_MENU
}
