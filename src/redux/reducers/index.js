import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import form from './form';
import projects from './projects';
import project from './project';
import user from './user';
import pages from './pages';
import donation from './donation';
import auth from './auth';

// combine all reducers
const rootReducer = combineReducers({
  routing,
  form,
  projects,
  project,
  user,
  pages,
  donation,
  auth,
});

export default rootReducer;
