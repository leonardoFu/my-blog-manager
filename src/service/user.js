import { SERVER } from 'constants/server'
import request from 'utils/request';

const login = (formData) => {
  request.post(`${SERVER}/user/adminlogin`, formData).then((result) => {
    return result.json()
  }).then(result => {
    console.log(result);
  })
}
export {
  login
}
