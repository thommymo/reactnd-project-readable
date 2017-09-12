import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
//import logger from 'redux-logger' (TODO: Install and use redux-logger)
import 'semantic-ui-css/semantic.min.css'

  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('root'));

registerServiceWorker();
