import { Redux } from 'miniprogram-redux';
import article from './article';
import school from './school';

const { createStore, combineReducers } = Redux;

export default createStore(combineReducers({
  article,
  school,
}));
