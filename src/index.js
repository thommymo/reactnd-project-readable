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
import { fetchCategories } from './actions'

const logger = createLogger()

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    logger
  )
)

//This gets initial category Data from the API, I'm not sure at all if this call should be placed here
store.dispatch(fetchCategories())


  /*store
  .dispatch(fetchCategories())
  .then(() => console.log(store.getState()))*/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

registerServiceWorker();
