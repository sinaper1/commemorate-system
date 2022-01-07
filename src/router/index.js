import React, {lazy} from "react";
import {useRoutes} from 'react-router-dom';
import SuspenseCpn from "../components/suspenseCpn";
import Home from '../views/Home/index';

const About = SuspenseCpn(
  lazy(() => import('../views/About/index'))
)

const App = () => {
  return useRoutes([
    {path: '/', element: <Home/>},
    {path: 'about', element: <About/>},
    // { path: 'invoices',
    //   element: <Invoices />,
    //   children: [
    //     { path: ':id', element: <Invoice /> },
    //     { path: 'sent', element: <SentInvoices /> }
    //   ]
    // },
    // 重定向
    {path: 'home', redirectTo: '/'},
    // 404找不到
    // { path: '*', element: <NotFound /> }

    // { path: 'usluge', element: <Services /> },
    // { path: 'galerija', element: <Gallery /> },
    // { path: 'cjenovnik', element: <Prices /> },
    // { path: 'kontakt', element: <Contact /> }
  ])
}

export default App;