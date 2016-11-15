import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import LoginPage from './pages/LoginPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectPage from './pages/ProjectPage';
import TransactionPage from './pages/TransactionPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ProjectsPage} />
    <Route path="/cat/:category" component={ProjectsPage} />
    <Route path="/signin" component={LoginPage} />
    <Route path="/transactions" component={TransactionPage} />
    <Route path="/project/:slug(/:tab)" component={ProjectPage} />
  </Route>
);
