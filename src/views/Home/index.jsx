import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as echarts from 'echarts';
import {Switch, Select} from 'antd';
import {getRegularSeason, getPlayoffs, getSelectDataSource} from '../../actions/home';
import './index.less';

const { Option } = Select;

const Home = (props) => {
  const [titleText, setTitleText] = useState('场均得分数据');
  const [xAxis, setXAxis] = useState('年份');
  const [yAxis, setYAxis] = useState('场均得分');
  const [theme, setTheme] = useState('');
  const [chart, setChart] = useState('bar');

  const { regularSeasonData, playoffsData, selectHomeData } = useSelector(
    state => ({
      regularSeasonData: state.getIn(['home', 'regularSeasonData'])?.toJS(),
      playoffsData: state.getIn(['home', 'playoffsData'])?.toJS(),
      selectHomeData: state.getIn(['home', 'selectHomeData'])?.toJS(),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRegularSeason('score'));
    dispatch(getPlayoffs('score'));
    dispatch(getSelectDataSource());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if(regularSeasonData && regularSeasonData.data && playoffsData && playoffsData.data) {
      resetChart();
    }
  }, [regularSeasonData, playoffsData]);

  const resetChart = () => {
    echarts.dispose(document.getElementById('regular'));
    const regularChart = echarts.init(document.getElementById('regular'), theme);
    regularChart.setOption(setOption('rgb(25, 183, 207)', 'rgb(255,220,96)'));
  }

  const setOption = (color1, color2) => {
    return {
      title: {
        text: titleText
      },
      //图例
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        data: ['常规赛', '季后赛'],
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        name: xAxis,
        data: regularSeasonData && regularSeasonData.year,
      },
      yAxis: {
        type: 'value',
        name: yAxis
      },
      series: [
        {
          name: '常规赛',
          type: chart,
          // seriesLayoutBy: 'row',
          data: regularSeasonData && regularSeasonData.data,
          smooth: true,
          areaStyle: {},
          // 普通样式。
          itemStyle: {
            // 点的颜色。
            color: color1
          },
          // 高亮样式。
          emphasis: {
            itemStyle: {
              // 高亮时点的颜色。
              color: color1
            },
          }
        },
        {
          name: '季后赛',
          type: chart,
          // seriesLayoutBy: 'row',
          data: playoffsData && playoffsData.data,
          smooth: true,
          areaStyle: {},
          // 普通样式。
          itemStyle: {
            // 点的颜色。
            color: color2
          },
          // 高亮样式。
          emphasis: {
            itemStyle: {
              // 高亮时点的颜色。
              color: color2
            },
          }
        }
      ],
    };
  }

  const onSwitchChange = (checked) => {
    if(checked) {
      setTheme('dark');
    } else {
      setTheme('');
    }
    if(regularSeasonData && playoffsData) {
      resetChart();
    }
  }

  const handleChange = (value) => {
    dispatch(getRegularSeason(value));
    dispatch(getPlayoffs(value));
    switch (value){
      case 'score':
        setTitleText('场均得分数据');
        setYAxis('场均得分');
        break;
      case 'rebounds':
        setTitleText('场均篮板数据');
        setYAxis('场均篮板');
        break;
      case 'assists':
        setTitleText('场均助攻数据');
        setYAxis('场均助攻');
        break;
      case 'steals':
        setTitleText('场均抢断数据');
        setYAxis('场均抢断');
        break;
      case 'blocks':
        setTitleText('场均盖帽数据');
        setYAxis('场均盖帽');
        break;
      case 'miss':
        setTitleText('场均失误数据');
        setYAxis('场均失误');
        break;
      case 'foul':
        setTitleText('场均犯规数据');
        setYAxis('场均犯规');
        break;
      default:
        setTitleText('场均得分数据');
        setYAxis('场均得分');
        break;
    }
    if(regularSeasonData && playoffsData) {
      resetChart();
    }
  }

  const handleChartChange = (value) => {
    setChart(value);
    if(regularSeasonData && playoffsData) {
      resetChart();
    }
  }

  return (
    <div className={'home'}>
      <div className={'home_mode'}>
        <span>深色模式：</span>
        <Switch onChange={onSwitchChange} />
        <Select defaultValue={'score'} style={{ width: 120, marginLeft: 20 }} onChange={handleChange}>
          {
            selectHomeData && selectHomeData.length > 0 &&
            selectHomeData.map(v => (
              <Option value={v.value}>{v.name}</Option>
            ))
          }
        </Select>
        <Select defaultValue={'bar'} style={{ width: 120, marginLeft: 20 }} onChange={handleChartChange}>
          <Option value='bar'>柱状图</Option>
          <Option value='line'>折线图</Option>
          <Option value='scatter'>散点图</Option>
        </Select>
      </div>
      <div id={'regular'}/>
    </div>
  );
}
export default Home