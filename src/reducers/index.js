import { combineReducers } from 'redux-immutable'
// import { reducer as headerReducer } from 'pages/home/store'
import userReducer from './users';

export default combineReducers({
  // home: headerReducer,
  user: userReducer,
})