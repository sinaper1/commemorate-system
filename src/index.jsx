import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import App from './router/index';
import store from './store/index';
import './assets/css/reset';
import './index.less';

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