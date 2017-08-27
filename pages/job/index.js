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
  loadNoticeList() {
    if (this.data.loading) return;

    this.data.loading = true;
    app.getApiData('https://api.wutnews.net/recruit/dajie/progress/index/ajaxSearch?page=' + this.data.page).then((result) => {
      if (result.page >= result.pageTotal) return;

      this.data.loading = false;
      this.data.page++;

      this.setData({
        'list': this.data.list.concat(result.projectList)
      });
    });
  }
});