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

const queryClasses = () => {
  return request.get(`${SERVER}/articles/classes`).then(result => {
    return result.json();
  }, err => {
    return err;
  })
}

const deleteArticles = (ids) => {
  if (ids && Array.isArray(ids)){
    return request.delJSON(`${SERVER}/articles/classes`, ids).then(result => {
      return result.json();
    }, err => {
      return err;
    })
  }
}
export {
  queryArticles,
  queryClasses,
  deleteArticles
}
