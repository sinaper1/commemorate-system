import { fromJS } from 'immutable';
import { GET_PLAYOFFSDATA, GET_REGULARSEASONDATA, GET_SELECTHOMEDATA } from '../constants';
import { getRegularSeasonData, getPlayoffsData, getSelectData } from '@api/home';

const getData = (data, constants) => ({
  type: constants,
  value: fromJS(data),
});

export const getRegularSeason = (keyword) => {
  return async dispatch => {
    const res = await getRegularSeasonData();
    let year = [];
    let data = [];
    if(res && res.length) {
      res.map(v => {
        year.push(v.year);
        data.push(v[keyword]);
      })
    }
    let dataSet = {
      year,
      data,
    }
    dispatch(getData(dataSet, GET_REGULARSEASONDATA));
  }
}
export const getPlayoffs = (keyword) => {
  return async dispatch => {
    const res = await getPlayoffsData();
    let year = [];
    let data = [];
    if(res && res.length) {
      res.map(v => {
        year.push(v.year);
        data.push(v[keyword]);
      })
    }
    let dataSet = {
      year,
      data,
    }
    dispatch(getData(dataSet, GET_PLAYOFFSDATA));
  }
}

export const getSelectDataSource = () => {
  return async dispatch => {
    const res = await getSelectData();
    dispatch(getData(res, GET_SELECTHOMEDATA))
  }
}