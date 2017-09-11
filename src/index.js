import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
//import reducer from './reducers' (TODO: Implement Reducers and Actions)
import { Provider } from 'react-redux'
// import logger from 'redux-logger' (TODO: Install and use redux-logger)
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <Provider>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
