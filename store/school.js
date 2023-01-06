import { WUTSchoolID } from '../data/const';

const SET_SCHOOL = 'SET_SCHOOL';

function getDefaultSchool() {
  const school = wx.getStorageSync('school');

  if (school) {
    return school;
  }

  return {
    id: WUTSchoolID,
    name: '武汉理工大学',
  };
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
