import Cookies from 'js-cookie'
import { SESSION_KEY } from 'constants/server';

const authUtil = {
  checkLogin(){
    return !!Cookies.get(SESSION_KEY);
  }
}
export default authUtil;
