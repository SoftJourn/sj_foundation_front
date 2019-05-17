import { combineReducers } from 'redux';
import categories from './categories';
import list from './list';
import project from './project';

const projects =  combineReducers({
    categories,
    list,
    project
});

export default projects;
