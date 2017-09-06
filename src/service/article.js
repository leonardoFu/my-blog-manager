import { SERVER } from 'constants/server';
import request from 'utils/request';

const queryArticles = (params) => {
  let param = {
    pageNum: params.pageNum || 1,
    classId: params.classId || '',
    order: params.order,
    orderBy: params.orderBy,
  }
  return request.get(`${SERVER}/articles/list`, param).then(result => {
    return result.json();
  }, err => {
    return err;
  })
}
export {
  queryArticles
}
