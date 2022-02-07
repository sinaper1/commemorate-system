import { fromJS } from 'immutable';
import { GET_PLAYOFFSDATA, GET_REGULARSEASONDATA } from '../../constants';

const initalState = fromJS({
  regularSeasonData: [],
  playoffsData: [],
})

const homeReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_PLAYOFFSDATA:
      return state.set('playoffsData', action.value);
    case GET_REGULARSEASONDATA:
      return state.set('regularSeasonData', action.value);
    default:
      return state
  }
}
export default homeReducer