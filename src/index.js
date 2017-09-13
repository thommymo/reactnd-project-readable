import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { createLogger }  from 'redux-logger'
import 'semantic-ui-css/semantic.min.css'
import thunkMiddleware from 'redux-thunk'


const logger = createLogger()

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    logger
  )
)





  /*store
  .dispatch(fetchCategories())
  .then(() => console.log(store.getState()))*/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

registerServiceWorker();
