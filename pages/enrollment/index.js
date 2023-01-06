const request = require('../../libs/request/scc');
const utils = require('../../libs/utils');
const store = require('../../store/index');
const schoolBehavior = require('../../behaviors/school');

Page({
  behaviors: [schoolBehavior],
  data: {
    device: {},
    search: {
      show: false,
      keyword: ''
    },
  },
  onLoad() {
    this.setData({
      device: wx.getSystemInfoSync()
    });
  },
  async fetchData() {
    const result = await request('/enrollment/getlist', {
      page: this.data.page,
      size: 10,
      keywords: this.data.search.keyword,
      isben: 1,
      day: 0,
      type: 0,
      province_id: 0,
    });

    this.data.page++;

    const list = result.list.map(item => {
      return {
        id: item.id,
        title: item.title,
        time: utils.formatTimestamp(item.addtime),
        view: item.viewcount,
      };
    });

    return {
      list,
      total: result.count,
    };
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
