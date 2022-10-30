const store = require('../../../store/index');
const schools = require('../../../data/school');

Page({
  data: {
    list: [],
    active: {},
    device: {},
    search: {
      show: false,
      keyword: '',
    },
  },
  onLoad() {
    const { school } = store.getState();

    this.setData({
      list: schools,
      active: school,
      device: wx.getSystemInfoSync(),
    });
  },
  searchNoticeList(e) {
    this.setData({
      list: schools.filter(school => school.name.includes(e.detail.value)),
      search: {
        show: false,
        keyword: e.detail.value,
      },
    });
  },
  setSearchFocus() {
    this.setData({
      'search.show': true,
    });
  },
  lostSearchFocus() {
    this.setData({
      'search.show': false,
    });
  },
  choose(e) {
    const { id } = e.currentTarget.dataset;
    const school = schools.find(school => school.id === id);

    this.setData({
      active: school,
    });

    store.dispatch({
      type: 'SET_SCHOOL',
      payload: school,
    });

    wx.navigateBack();
  },
});
