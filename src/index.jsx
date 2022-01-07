import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import App from './router';
import store from './store';
import './assets/style/reset.less';
import './index.less';
import '@assets/index.js';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Router basename="/">
        <App />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)