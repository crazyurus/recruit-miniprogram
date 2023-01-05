const request = require('../../../libs/request/scc');
const store = require('../../../store/index');

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

    this.loadSchoolList();
    this.setData({
      active: school,
      device: wx.getSystemInfoSync(),
    });
  },
  loadSchoolList() {
    request('/School/getlistName', {
      is_vip: 1,
    }).then(result => {
      if (result.list.length === 0) {
        return;
      }

      const list = result.list.filter(item => item.id !== '03697650-72ef-d353-1e69-b4c86f150f54');

      this.setData({
        originList: list,
        list,
      });
    });
  },
  searchNoticeList(e) {
    this.setData({
      list: this.data.originList.filter(school => school.name.includes(e.detail.value)),
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
    const school = this.data.originList.find(school => school.id === id);

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
