import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/LoginPage';
import ProjectListPage from './pages/ProjectListPage';
import ProjectPage from './pages/ProjectPage';
import TransactionPage from './pages/TransactionPage';
import AdminPage from './pages/AdminPage';
import HowItWorksPage from './pages/HowItWorksPage';
import StartProjectPage from './pages/StartProjectPage';

export default (
  <Switch path="/" component={App}>
    <Route path="/" component={ProjectListPage} />
    <Route path="/search" component={ProjectListPage} />
    <Route path="/project" component={ProjectListPage} />
    <Route path="/category/:category" component={ProjectListPage} />
    <Route path="/signin" component={LoginPage} />
    <Route path="/transactions" component={TransactionPage} />
    <Route path="/project/:slug(/:tab)" preview={false} component={ProjectPage} />
    <Route path="/preview/:slug(/:tab)" preview={true} component={ProjectPage} />
    <Route path="/admin" component={AdminPage} />
    <Route path="/how-it-works" component={HowItWorksPage} />
    <Route path="/start" component={StartProjectPage} />
  </Switch>
);
