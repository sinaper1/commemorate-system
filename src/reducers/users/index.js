import { fromJS } from 'immutable';
import { GET_OwnInfo, GET_UserInfo, GET_UserCollect } from '../../constants';

const initalState = fromJS({
  ownInformation: [],
  userInformation: [],
  userCollections: [],
})

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_OwnInfo:
      return state.set('ownInformation', action.value)
    case GET_UserInfo:
      return state.set('userInformation', action.value)
    case GET_UserCollect:
      return state.set('userCollections', action.value)
    default:
      return state
  }
}
export default userReducer