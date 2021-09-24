const app = getApp();
Page({
  data: {
    list: [],
    page: 1,
    loading: false,
    tab: '17c226b1-6fe3-8ea5-9a8d-6ecb2e89f70c',
    label: '公告'
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

    app.request('https://a.jiuyeb.cn/mobile.php/Article/getlist', {
      page: this.data.page,
      size: 10,
      show_type: 2,
      cate_id: this.data.tab,
    }).then(result => {
      if (this.data.page > 1 && result.list.length === 0) return;

      this.data.loading = false;
      this.data.page++;
      wx.stopPullDownRefresh();

      const list = result.list.map(item => {
        return {
          id: item.id,
          title: item.title,
          time: new Date(item.addtime * 1000).toLocaleDateString().replace(/\//g, '-'),
          view: item.views,
        };
      });

      this.setData({
        list: this.data.list.concat(list)
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
