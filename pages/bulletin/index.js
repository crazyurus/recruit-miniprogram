const app = getApp();
Page({
  data: {
    list: [],
    page: 1,
    loading: false,
    tab: 'jiuye',
    label: '资讯'
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
      loading: false
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
    if (this.data.loading) return;
    this.data.loading = true;

    app.getApiData('https://api.wutnews.net/recruit/whut/index', {
      type: this.data.tab,
      page: this.data.page
    }).then(result => {
      if (result.length === 0) return;

      this.data.loading = false;
      this.data.page++;
      wx.stopPullDownRefresh();

      this.setData({
        list: this.data.list.concat(result)
      });
    });
  },
  reset() {
    this.data.list = [];
    this.setData({
      page: 1,
      loading: false
    });
  }
});
