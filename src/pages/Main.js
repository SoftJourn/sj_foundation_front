import React from 'react'
import { Switch, Route } from 'react-router-dom'
import App from '../App';
import LoginPage from './LoginPage';
import ProjectListPage from './ProjectListPage';
import MainPage from './_MainPage';
import ProjectPage from './ProjectPage';
import TransactionPage from './TransactionPage';
import AdminPage from './AdminPage';
import HowItWorksPage from './HowItWorksPage';
import StartProjectPage from './StartProjectPage';

const Main = () => (
  <main>
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/search" component={ProjectListPage} />
      <Route path="/category/:category" component={ProjectListPage} />
      <Route path="/signin" component={LoginPage} />
      <Route path="/transactions" component={TransactionPage} />
      <Route path="/project/:slug" preview={false} component={ProjectPage} />
      <Route path="/preview/:slug(/:tab)" preview={true} component={ProjectPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/start" component={StartProjectPage} />
    </Switch>
  </main>
);

export default Main