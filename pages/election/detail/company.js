const request = require('../../../libs/request/scc');
const utils = require('../../../libs/utils');

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

    return request('/jobfair/signenterprise', {
      id: this.options.id,
      page: this.data.page,
      size: 10,
      confirm_status: -1,
      allotstatus: 3,
      check_status: 3,
    }).then(result => {
      this.data.page++;

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
