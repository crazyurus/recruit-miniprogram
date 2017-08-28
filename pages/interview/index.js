var app = getApp();
Page({
  data: {
    list: [],
    page: 1,
    loading: false
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
  loadNoticeList() {
    if (this.data.loading) return;

    this.data.loading = true;
    app.getApiData('https://api.wutnews.net/recruit/haitou/mjfx/list?client=wutnews&page=' + this.data.page).then((result) => {
      if (result.length == 0) return;

      this.data.loading = false;
      this.data.page++;
      wx.stopPullDownRefresh();      

      this.setData({
        'list': this.data.list.concat(result)
      });
    });
  }
});