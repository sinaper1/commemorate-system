import { fromJS } from 'immutable';
import { GET_OwnInfo, GET_UserInfo, GET_UserCollect } from '../constants';
import { getUserInfo, userCollections } from '@api/users';

const getData = (data, constants) => ({
  type: constants,
  value: fromJS(data),
})
export const getOwn = id => {
  return async dispatch => {
    const res = await getUserInfo(id)
    dispatch(getData(res, GET_OwnInfo))
  }
}
// const getUserAction = data => ({
//   type: constants.GET_UserInfo,
//   value: fromJS(data),
// })
export const getUser = id => {
  return async dispatch => {
    const res = await getUserInfo(id)
    dispatch(getData(res, GET_UserInfo))
  }
}
// const getUserCollectAction = data => ({
//   type: constants.GET_UserCollect,
//   value: fromJS(data),
// })
// export const getUserCollect = () => {
//   return async dispatch => {
//     const res = await userCollections()
//     dispatch(getData(res.list, GET_UserCollect))
//   }
// }