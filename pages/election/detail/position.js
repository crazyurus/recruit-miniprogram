const request = require('../../../libs/request/scc');

Page({
  data: {
    list: [],
    page: 1,
    loading: true,
  },
  onLoad() {
    this.loadList();
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

    return request('/jobfair/getjoblist', {
      fair_id: this.options.id,
      page: this.data.page,
      size: 10,
      isunion: 2,
    }).then(result => {
      this.data.page++;

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
});
