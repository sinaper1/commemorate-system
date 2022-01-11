import React from 'react';
import './index.less'
import {Route, Routes, Outlet} from "react-router-dom";
import HomeLayout from '../../components/Layout/index';
// import RouterList, {secroutes} from '../../router';
// import { connect } from 'react-redux';
// import Comic from "../Comic";
// import { increment } from '../../actions/index.jsx';
// import { Link } from "react-router-dom";


const Home = (props) => {
  return (
    <div className={'home'}>
      <div>react-router 测试</div>
      <div>redux & redux-saga测试</div>
    </div>
  );
}
export default Home