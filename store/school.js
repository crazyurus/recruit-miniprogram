const schools = require('../data/school');
const SET_SCHOOL = 'SET_SCHOOL';

function getDefaultSchool() {
  const school = wx.getStorageSync('school');

  if (school) {
    return school;
  }

  return schools[0];
}

function reducer(state = getDefaultSchool(), action) {
  switch (action.type) {
    case SET_SCHOOL:
      wx.setStorage({
        key: 'school',
        data: action.payload,
      });

      return action.payload;
    default:
      return state;
  }
}

module.exports = reducer;
