const schools = require('../data/school');
const SET_SCHOOL = 'SET_SCHOOL';

function reducer(state = schools[0], action) {
  switch (action.type) {
    case SET_SCHOOL:
      return action.payload;
    default:
      return state;
  }
}

module.exports = reducer;
