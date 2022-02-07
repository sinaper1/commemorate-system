import { fromJS } from 'immutable';
import { GET_PLAYOFFSDATA, GET_REGULARSEASONDATA, GET_SELECTHOMEDATA } from '../../constants';

const initalState = fromJS({
  regularSeasonData: {},
  playoffsData: {},
  selectHomeData: [],
})

const homeReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_PLAYOFFSDATA:
      return state.set('playoffsData', action.value);
    case GET_REGULARSEASONDATA:
      return state.set('regularSeasonData', action.value);
    case GET_SELECTHOMEDATA:
      return state.set('selectHomeData', action.value);
    default:
      return state
  }
}
export default homeReducer