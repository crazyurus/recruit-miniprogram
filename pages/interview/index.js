var app = getApp();
Page({
  data: {
    list: [],
    page: 1,
    loading: false,
    tab: 0
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
      tab: e.currentTarget.dataset.tab
    });
    this.reset();
    this.loadNoticeList();
  },
  openWechatUrl(e) {
    let url = e.currentTarget.dataset.url;

    /* 
    wx.openUrl({
      url: url
    }); 
    */

    wx.showModal({
      title: '就业招聘',
      content: '请在浏览器粘贴以下网址阅读面试经验：' + url,
      showCancel: true,
      confirmText: '复制网址',
      confirmColor: '#45c8dc',
      cancelText: '关闭',
      success() {
        wx.setClipboardData({
          data: url
        });
      }
    });
  },
  loadNoticeList() {
    if (this.data.loading) return;
    this.data.loading = true;

    let url = '';
    if (this.data.tab == 0) url = 'https://api.haitou.cc/mjfx/list';
    else url = 'https://api.haitou.cc/mjfx/wechat-article';

    app.getApiData(url + '?client=wutnews&page=' + this.data.page + '&type=' + this.data.tab).then((result) => {
      if (result.length == 0) return;

      this.data.loading = false;
      this.data.page++;
      wx.stopPullDownRefresh();

      this.setData({
        'list': this.data.list.concat(result)
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