var app = getApp();
Page({
  data: {
    article: {},
    position: [],
    tab: {
      active: [true, false],
      disabled: [false, false]
    },
    page: 1,
    loading: false
  },
  onLoad(options) {
    app.getApiData('https://api.wutnews.net/recruit/dajie/detail', {
      id: options.id,
      corp: options.corp,
      logo: options.logo
    }, false).then((result) => {

      result.logo = 'https://api.wutnews.net/recruit/dajie/image?url=' + result.logo;

      this.setData({
        article: result,
      });
    });
  },
  onShareAppMessage(res) {
    return {
      title: this.data.article.title,
      path: '/pages/job/detail?id=' + this.data.article.id + '&corp=' + this.data.article.corp + '&logo=' + this.data.article.logo,
      success(res) {
        wx.showToast({
          title: '分享成功'
        });
      }
    }
  },
  clickTabContent() {
    if (this.data.tab.disabled[0]) return;

    this.setData({
      'tab.active': [true, false]
    });
  },
  clickTabPosition() {
    if (this.data.tab.disabled[1]) return;

    this.setData({
      'tab.active': [false, true]
    });

    if (this.data.position.length > 0) return;
    this.loadPositionList();
  },
  loadPositionList() {
    if (this.data.loading) return;

    this.data.loading = true;
    app.getApiData('https://api.wutnews.net/recruit/dajie/m.dajie.com/corp/' + this.data.article.corp + '/onlineapply/more?page=' + this.data.page).then((result) => {
      result = result.data;

      if (!result.hasMore) this.data.loading = false;
      this.data.page++;
      wx.stopPullDownRefresh();

      this.setData({
        'position': this.data.position.concat(result.list)
      });
    });
  }
});