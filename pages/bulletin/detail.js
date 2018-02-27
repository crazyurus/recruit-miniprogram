const app = getApp();
Page({
  data: {
    article: {}
  },
  onLoad(options) {
    app.getApiData('https://api.wutnews.net/recruit/whut/detail', {
      id: options.id
    }, false).then(result => {
      this.setData({
        article: result
      });
    });
  },
  onShareAppMessage(res) {
    return {
      title: this.data.article.title,
      path: '/pages/bulletin/detail?id=' + this.data.article.id,
      imageUrl: this.data.article.image,
      success(res) {
        wx.showToast({
          title: '分享成功',
        });
      }
    };
  }
});
