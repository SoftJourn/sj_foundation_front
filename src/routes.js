import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import LoginPage from './pages/LoginPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectPage from './pages/ProjectPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ProjectsPage} />
    <Route path="login" component={LoginPage} />
    <Route path="/project/:slug" component={ProjectPage} />
  </Route>
);
