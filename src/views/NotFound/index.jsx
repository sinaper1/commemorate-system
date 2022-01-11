import React from 'react';
import { Link } from "react-router-dom";
import { Empty } from 'antd';
import './index.less';

const NotFound = (props) => {
  return (
    <div className={'empty'}>
      <Empty description={
        <div>
          <h2>页面貌似跑丢了...</h2>
          <p>
            <Link to="/">回到首页</Link>
          </p>
        </div>
      }/>
    </div>
  )
}

export default NotFound
