const request = require('../../../libs/request/scc');
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
      loading: true,
    });
    this.data.list = [];
    this.loadNoticeList();
  },
  loadNoticeList() {
    request('/jobfair/signenterprise', {
      id: this.options.id,
      page: this.data.page,
      size: 10,
      confirm_status: -1,
      allotstatus: 3,
      check_status: 3,
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
          id: item.com_id,
          name: item.com_id_info.name,
          logo: utils.getCDNURL(item.com_id_info.logo_src),
          count: {
            position: item.check_zhiwei_count,
            person: item.check_zhiwei_person,
          },
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
