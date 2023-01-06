const request = require('../../libs/request/scc');
const utils = require('../../libs/utils');
const store = require('../../store/index');

Page({
  data: {
    list: [],
    page: 1,
    loading: true,
    school: {},
    device: {},
    search: {
      show: false,
      keyword: ''
    },
  },
  onShow() {
    const { school } = store.getState();

    if (school.id !== this.data.school.id) {
      this.reset();
      this.loadList();
      this.setData({
        school,
      });
    }
  },
  onLoad() {
    this.setData({
      device: wx.getSystemInfoSync()
    });
  },
  onReachBottom() {
    this.loadList();
  },
  onPullDownRefresh() {
    this.reset();
    this.loadList().then(() => {
      wx.stopPullDownRefresh();
    });
  },
  loadList() {
    if (!this.data.loading) {
      return;
    }

    return request('/enrollment/getlist', {
      page: this.data.page,
      size: 10,
      keywords: this.data.search.keyword,
      isben: 1,
      day: 0,
      type: 0,
      province_id: 0,
    }).then(result => {
      this.data.page++;

      const list = result.list.map(item => {
        return {
          id: item.id,
          title: item.title,
          time: utils.formatTimestamp(item.addtime),
          view: item.viewcount,
        };
      });

      this.setData({
        loading: list.length > 0 && this.data.page <= result.allpage,
        list: this.data.list.concat(list),
      });
    });
  },
  reset() {
    this.setData({
      list: [],
      page: 1,
      loading: true,
    });
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },
  searchNoticeList(e) {
    this.reset();
    this.setData({
      search: {
        show: false,
        keyword: e.detail.value
      }
    });
    this.loadList();
  },
  setSearchFocus() {
    this.setData({
      'search.show': true
    });
  },
  lostSearchFocus() {
    this.setData({
      'search.show': false
    });
  },
  openDetail(e) {
    const { index } = e.currentTarget.dataset;
    const item = this.data.list[index];

    store.dispatch({
      type: 'SET_ARTICLE',
      payload: {
        id: item.id,
        title: item.title,
        source: '其它企业',
      },
    });
  },
});
