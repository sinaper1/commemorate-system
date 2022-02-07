import { fromJS } from 'immutable';
import { GET_PLAYOFFSDATA, GET_REGULARSEASONDATA } from '../constants';
import { getRegularSeasonData, getPlayoffsData } from '@api/home';

const getData = (data, constants) => ({
  type: constants,
  value: fromJS(data),
})
export const getRegularSeason = () => {
  return async dispatch => {
    const res = await getRegularSeasonData()
    dispatch(getData(res, GET_REGULARSEASONDATA))
  }
}
export const getPlayoffs = () => {
  return async dispatch => {
    const res = await getPlayoffsData()
    dispatch(getData(res, GET_PLAYOFFSDATA))
  }
}