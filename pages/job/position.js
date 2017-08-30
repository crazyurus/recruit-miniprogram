var app = getApp();
Page({
  data: {
    article: {}
  },
  onLoad(options) {
    app.getApiData('https://api.wutnews.net/recruit/dajie/position', {
      link: options.link
    }, false).then((result) => {
      this.setData({
        article: result
      });
    });
  },
  onShareAppMessage(res) {
    return {
      title: this.data.article.title,
      path: '/pages/job/position?link=' + this.data.article.link,
      success(res) {
        wx.showToast({
          title: '分享成功'
        });
      }
    }
  }
});