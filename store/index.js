const { Redux } = require('miniprogram-redux');
const { createStore, combineReducers } = Redux;
const article = require('./article');

module.exports = createStore(combineReducers({
  article,
}));
