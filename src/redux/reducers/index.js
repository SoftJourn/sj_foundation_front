import { combineReducers } from 'redux';
import projects from './projects';
import header from './header';

const rootReducer =  combineReducers({
    header,
    projects
});

export default rootReducer;
