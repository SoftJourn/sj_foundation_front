import { combineReducers } from 'redux';
import form from './form';
import projects from './projects';
import user from './user';
import project from './project';
import { routerReducer as routing } from 'react-router-redux';
import {intlReducer} from 'react-intl-redux'

// combine all reducers
const rootReducer = combineReducers({
  routing,
  form,
  projects,
  project,
  user,
  intl: intlReducer,
});

export default rootReducer;
