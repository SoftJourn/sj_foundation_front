import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/Home';
import LoginForm from 'components/Login/LoginForm';

const Main = () => (
    <main>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={LoginForm} />
        </Switch>
    </main>
);

export default Main
