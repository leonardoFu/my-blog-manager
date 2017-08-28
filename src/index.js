import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configStore from './store/configStore';
const store = configStore();

const Root = <Provider store = {store}>
  <App />
</Provider>

ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();
