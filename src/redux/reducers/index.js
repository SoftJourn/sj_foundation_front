import { combineReducers } from 'redux';
import projects from './projects';
import header from './header';
import alert from './alertReducer';
import authentication from './authenticationReducer';

const rootReducer =  combineReducers({
    alert,
    authentication,
    header,
    projects
});

export default rootReducer;
