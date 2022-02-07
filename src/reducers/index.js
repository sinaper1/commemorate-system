import { combineReducers } from 'redux-immutable'
import userReducer from './users';
import homeReducer from "./home";

export default combineReducers({
  user: userReducer,
  home: homeReducer,
})