import React, {lazy} from "react";
import {useRoutes} from 'react-router';
import SuspenseCpn from "../components/SuspenseCpn";
import HomeLayout from '../components/Layout'
import Home from '../views/Home/index';

const NotFound = SuspenseCpn(
  lazy(() => import('../views/NotFound/index'))
)

const Comic = SuspenseCpn(
  lazy(() => import('../views/Comic/index'))
)

const Origin = SuspenseCpn(
  lazy(() => import('../views/Origin/index'))
)

const App = () => {
  return useRoutes([
    { path: '/',
      element: <HomeLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'comic', element: <Comic /> },
        { path: 'origin', element: <Origin /> }
      ]
    },
    // 重定向
    // {path: 'home', redirectTo: '/'},
    // 404找不到
    { path: '*', element: <NotFound /> }
  ])
}

export default App;