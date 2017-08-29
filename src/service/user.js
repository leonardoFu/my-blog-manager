import { SERVER } from 'constants/server'
import request from 'utils/request';

const login = (formData) => {
  return request.post(`${SERVER}/user/adminlogin`, formData).then((result) => {
    return result.json()
  })
}
export {
  login
}
