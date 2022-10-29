const { Redux } = require('miniprogram-redux');
const { createStore, combineReducers } = Redux;
const article = require('./article');
const school = require('./school');

module.exports = createStore(combineReducers({
  article,
  school,
}));
