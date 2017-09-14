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
import { BrowserRouter } from 'react-router-dom';


const logger = createLogger()

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    logger
  )
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

registerServiceWorker();
