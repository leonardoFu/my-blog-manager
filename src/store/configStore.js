import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';


const configStore = () => {

  const store = createStore(reducer);
  return store;
}
export default configStore;
