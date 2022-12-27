import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import { browserHistory, useRouterHistory } from 'react-router';
import {createHistory} from 'history';
import { Provider } from 'react-redux'
import App from './router';
// import {routes} from './router';
import store from './store';
import './assets/style/reset.less';
import './index.less';
import '@assets/index';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Router basename="/home">
        <App />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)