const app = getApp();

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
    app.request.iwut('/list?page=' + this.data.page + '&pagesize=10').then(result => {
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
          id: item.postId,
          title: item.title.replace(/^【(\S+)】/, ''),
          time: app.formatTimestamp(item.publishDate),
          source: item.source,
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
  openDetail(e) {
    const { index } = e.currentTarget.dataset;
    const item = this.data.list[index];

    app.globalData.post = {
      title: item.title,
    };
  },
});
