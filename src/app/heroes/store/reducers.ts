import { combineReducers } from 'redux';
import { heroesListReducer } from './list/reducers';
import { heroesDetailReducer } from './detail/reducers';

export const heroesReducers = combineReducers({
  list: heroesListReducer,
  detail: heroesDetailReducer,
});
