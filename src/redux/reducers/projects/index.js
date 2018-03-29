import { combineReducers } from 'redux';
import categories from './categories';
import list from './list';

const projects =  combineReducers({
    categories,
    list
});

export default projects;