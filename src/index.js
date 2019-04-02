import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'babel-polyfill';
import configureStore from './redux/store/configureStore';
import Root from './components/Root/Root';

const userFromStorage = sessionStorage.getItem('user');
const authentication = {
    isLoggedIn: userFromStorage != null || false,
    user: userFromStorage
}
const initialState = {
    authentication
}

const store = configureStore(initialState);

render(
    <BrowserRouter>
        <Root store={store}/>
    </BrowserRouter>,
    document.getElementById('root')
);
