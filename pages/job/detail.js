var app = getApp();
Page({
  data: {
    article: {},
    position: [],
    tab: {
      active: [true, false],
      disabled: [false, false]
    }
  },
  onLoad(options) {
    app.getApiData('https://api.wutnews.net/recruit/dajie/detail', {
      id: options.id,
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
      path: '/pages/job/detail?id=' + this.data.article.id + '&logo=' + this.data.article.logo,
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
  }
});