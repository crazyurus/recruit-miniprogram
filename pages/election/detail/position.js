const request = require('../../../libs/request/scc');

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
      loading: true,
    });
    this.data.list = [];
    this.loadNoticeList();
  },
  loadNoticeList() {
    request('/jobfair/getjoblist', {
      fair_id: this.options.id,
      page: this.data.page,
      size: 10,
      isunion: 2,
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
          id: item.job_id,
          name: item.work_name,
          company: item.com_id_info.name,
          degree: item.xueli_id_name,
          salary: [item.salary_floor, item.salay_ceil],
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
      loading: true,
    });
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },
});
