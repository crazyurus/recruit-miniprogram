const request = require('../../library/request');
const utils = require('../../library/utils');

Page({
  data: {
    list: [],
    page: 1,
    loading: true,
    tab: '17c226b1-6fe3-8ea5-9a8d-6ecb2e89f70c',
    label: '公告'
  },
  onLoad() {
    this.loadNoticeList();
  },
  onReachBottom() {
    this.loadNoticeList();
  },
  onPullDownRefresh() {
    this.setData({
      page: 1,
      loading: true
    });
    this.data.list = [];
    this.loadNoticeList();
  },
  switchTabs(e) {
    this.setData({
      tab: e.currentTarget.dataset.tab,
      label: e.currentTarget.dataset.label
    });
    this.reset();
    this.loadNoticeList();
  },
  loadNoticeList() {
    request('/Article/getlist', {
      page: this.data.page,
      size: 10,
      show_type: 2,
      cate_id: this.data.tab,
    }).then(result => {
      if (result.list.length === 0) {
        this.setData({
          loading: false,
        });
        return;
      }

      this.data.page++;
      wx.stopPullDownRefresh();

      const list = result.list.map(item => {
        return {
          id: item.id,
          title: item.title,
          time: utils.formatTimestamp(item.addtime),
          view: item.views,
        };
      });

      this.setData({
        loading: list.length >= 10,
        list: this.data.list.concat(list)
      });
    });
  },
  reset() {
    this.data.list = [];
    this.setData({
      page: 1,
      loading: true
    });
    wx.pageScrollTo({
      scrollTop: 0,
    });
  }
});
