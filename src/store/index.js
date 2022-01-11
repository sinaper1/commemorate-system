// import { createStore } from 'redux';
// import incrementReducer from '../reducers/index.jsx';
//
// const store = createStore(incrementReducer);
//
// export default store;

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))
const store = createStore(reducer, enhancer)
export default store