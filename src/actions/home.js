import { fromJS } from 'immutable';
import { GET_PLAYOFFSDATA, GET_REGULARSEASONDATA, GET_SELECTHOMEDATA } from '../constants';
import { getRegularSeasonData, getPlayoffsData, getSelectData } from '@api/home';

const getData = (data, constants) => ({
  type: constants,
  value: fromJS(data),
});

const setData = (res, keyword='score') => {
  let data = [];
  let year = '年份'
  let keyName = '';
  if(res && res.length) {
    switch (keyword){
      case 'score':
        keyName = '场均得分';
        break;
      case 'rebounds':
        keyName = '场均篮板';
        break;
      case 'assists':
        keyName = '场均助攻';
        break;
      case 'steals':
        keyName = '场均抢断';
        break;
      case 'blocks':
        keyName = '场均盖帽';
        break;
      case 'miss':
        keyName = '场均失误';
        break;
      case 'foul':
        keyName = '场均犯规';
        break;
      default:
        keyName = '场均得分';
        break;
    }
    res.map(v => {
      data.push({
        [year]: v.year,
        [keyName]: v[keyword],
      })
    });
    return data;
  }
}

export const getRegularSeason = (keyword) => {
  return async dispatch => {
    const res = await getRegularSeasonData();
    // let data = setData(res, keyword);
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
    // let data = setData(res, keyword);
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