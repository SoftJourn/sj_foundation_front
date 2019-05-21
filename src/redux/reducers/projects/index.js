import { combineReducers } from 'redux';
import categories from './categories';
import list from './list';
import project from './project';
import newProject from './newProject';

const projects =  combineReducers({
    categories,
    list,
    project,
    newProject
});

export default projects;
