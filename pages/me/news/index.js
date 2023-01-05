const request = require('../../../libs/request/app');
const utils = require('../../../libs/utils');

Page({
  data: {
    list: [],
    page: 1,
    loading: true,
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
  loadNoticeList() {
    request('/news/listTitles', {
      pageNumber: this.data.page,
      pageSize: 10,
    }).then(result => {
      if (result.length === 0) {
        this.setData({
          loading: false,
        });
        return;
      }

      this.data.page++;
      wx.stopPullDownRefresh();

      const list = result.map(item => {
        return {
          id: item.id,
          title: item.newsTitle.replace(/^【(.*?)】/, ''),
          time: utils.formatDateTime(item.date),
          source: item.dept.trim(),
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
  },
});
