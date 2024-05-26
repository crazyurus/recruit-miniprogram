const SET_SCHOOL = 'SET_SCHOOL';

export function getDefaultSchool() {
  const school = wx.getStorageSync('school');

  if (school) {
    return school;
  }

  return {};
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

export default reducer;
