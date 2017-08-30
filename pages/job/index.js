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
    app.getApiData('https://api.wutnews.net/recruit/dajie/campus.dajie.com/progress/index/ajaxSearch?page=' + this.data.page).then((result) => {
      if (result.page >= result.pageTotal) return;

      result.projectList.map((item) => {
        let arr = item.projectUrl.split('/');
        if (arr[4] == 'catch') {
          item.id = arr[5];
          item.corp_id = 0;
        } else {
          item.id = arr[6];
          item.corp_id = arr[4];
        }
      });

      this.data.loading = false;
      this.data.page++;
      wx.stopPullDownRefresh();

      this.setData({
        'list': this.data.list.concat(result.projectList)
      });
    });
  }
});