import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './redux/store/configureStore';
import Root from './containers/Root';
import './styles/core.scss';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
