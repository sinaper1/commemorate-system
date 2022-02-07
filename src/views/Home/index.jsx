import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as echarts from 'echarts';
import {Switch} from 'antd';
import {getRegularSeason, getPlayoffs} from '../../actions/home';
import './index.less';


const Home = (props) => {
  const { regularSeasonData, playoffsData } = useSelector(
    state => ({
      regularSeasonData: state.getIn(['home', 'regularSeasonData'])?.toJS(),
      playoffsData: state.getIn(['home', 'playoffsData'])?.toJS(),
    }),
    shallowEqual
  );
  const [regularScoreSource, setRegularScoreSource] = useState([]);
  const [playoffsScoreSource, setPlayoffsScoreSource] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRegularSeason())
    dispatch(getPlayoffs())
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(regularSeasonData, playoffsData, '----regularSeasonData, playoffsData----');
    const regularScoreData = [];
    const playoffsScoreData = [];
    if(regularSeasonData && regularSeasonData.length){
      regularSeasonData.map(v => {
        regularScoreData.push({
          '年份': v.year,
          '得分': v.score,
        })
      })
    }
    if(regularScoreData && regularScoreData.length){
      console.log(regularScoreData, '----regularScoreData---')
      // setRegularScoreSource(regularScoreData);
    }
    if(playoffsData && playoffsData.length) {
      playoffsData.map(v => {
        playoffsScoreData.push({
          '年份': v.year,
          '得分': v.score,
        })
      })
    }
    // if(playoffsScoreData && playoffsScoreData.length){
    //   setPlayoffsScoreSource(playoffsScoreData);
    // }
    resetChart(regularScoreData, playoffsScoreData);
  }, [regularSeasonData, playoffsData]);

  const resetChart = (regularScoreData, playoffsScoreData) => {
    const regularChart = echarts.init(document.getElementById('regular'), 'dark');
    const playoffsChart = echarts.init(document.getElementById('playoffs'));
    regularChart.setOption(setOption('常规赛场均得分', regularScoreData, '年份', '得分', 'rgb(25, 183, 207)'));
    playoffsChart.setOption(setOption('季后赛场均得分', playoffsScoreData, '年份', '得分', 'rgb(255,220,96)'));
  }

  const setOption = (text, source, xAxis, yAxis, color) => {
    return {
      title: {
        text
      },
      //图例
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        data: [yAxis],
      },
      tooltip: {},
      dataset: {
        dimensions: [
          { name: xAxis },
          { name: yAxis },
        ],
        source,
      },
      xAxis: { type: 'category', name: xAxis },
      yAxis: {
        type: 'value',
        name: yAxis
      },
      series: {
        type: 'bar',
        seriesLayoutBy: 'row',
        // 普通样式。
        itemStyle: {
          // 点的颜色。
          color: color
        },
        // 高亮样式。
        emphasis: {
          itemStyle: {
            // 高亮时点的颜色。
            color: color
          },
        }
      },
    };
  }

  const onSwitchChange = (checked) => {
    if(checked) {

    }
  }

  return (
    <div className={'home'}>
      <div>
        <span>深色模式：</span>
        <Switch onChange={onSwitchChange} />
      </div>
      <div id={'regular'}/>
      <div id={'playoffs'}/>
    </div>
  );
}
export default Home