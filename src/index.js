import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './pages/Root';
// import { browserHistory } from 'react-router-dom';
import configureStore from './redux/store/configureStore';
import 'babel-polyfill';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();
// const history = syncHistoryWithStore(browserHistory, store);

render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
);
