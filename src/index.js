import React from 'react';
import ReactDOM from 'react-dom';
import Root from './pages/Root';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './redux/store/configureStore';
import { IntlProvider } from 'react-intl';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <IntlProvider locale="en"><Root store={store} history={history} /></IntlProvider>,
  document.getElementById('root')
);
