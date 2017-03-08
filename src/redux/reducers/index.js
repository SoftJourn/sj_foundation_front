import { combineReducers } from 'redux';
import form from './form';
import projects from './projects';
import user from './user';
import project from './project';
import pages from './pages';
import donation from './donation';
import admin from './admin';
import { routerReducer as routing } from 'react-router-redux';

// combine all reducers
const rootReducer = combineReducers({
  routing,
  form,
  projects,
  project,
  user,
  pages,
  donation,
  admin,
});

export default rootReducer;
