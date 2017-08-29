import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import sagas from '../sagas';
import createSagaMiddleware from 'redux-saga';
export const sagaMiddleware = createSagaMiddleware(...sagas);

const configStore = () => {

  const store = createStore(reducer, {}, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(sagas);
  return store;
}
export default configStore;
