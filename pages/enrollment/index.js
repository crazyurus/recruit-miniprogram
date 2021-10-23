const app = getApp();

Page({
  data: {
    list: [],
    page: 1,
    loading: true,
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
    app.request('https://a.jiuyeb.cn/mobile.php/enrollment/getlist', {
      page: this.data.page,
      size: 10,
      keywords: this.data.search.keyword,
      isben: 1,
      day: 0,
      type: 0,
      province_id: 0,
    }).then(result => {
      if (this.data.page > 1 && result.list.length === 0) return;

      this.data.page++;
      wx.stopPullDownRefresh();

      const list = result.list.map(item => {
        return {
          id: item.id,
          title: item.title,
          time: app.formatTimestamp(item.addtime),
          view: item.viewcount,
        };
      });

      this.setData({
        loading: list.length > 0,
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
  searchNoticeList(e) {
    this.reset();
    this.setData({
      search: {
        show: false,
        keyword: e.detail.value
      }
    });
    this.loadNoticeList();
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

    app.globalData.article = {
      id: item.id,
      title: item.title,
      source: '其它企业',
    };
  },
});
