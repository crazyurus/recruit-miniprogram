const app = getApp();

Page({
  data: {
    title: false,
    article: {},
    contentStyle: {
      a: 'color: #45c8dc',
    },
  },
  onLoad(options) {
    if (app.globalData.post) {
      this.setData({
        'article.title': app.globalData.post.title,
      });
    }

    app.request.iwut('/content?postId=' + options.id, false).then(article => {
      this.setData({
        'article.content':  article.content.replace(/font/g, 'f').replace('<div class="art_tit">', '<div class="art_tit" style="display: none">').replace('<title>新闻详情</title>', ''),
      });
    });
  },
  onUnload() {
    app.globalData.post = null;
  },
  onPageScroll(e) {
    if (e.scrollTop <= 200 && this.data.title) {
      this.data.title = false;
      wx.setNavigationBarTitle({
        title: ' '
      });
    }
    if (e.scrollTop > 200 && !this.data.title) {
      this.data.title = true;
      wx.setNavigationBarTitle({
        title: this.data.article.title
      });
    }
  },
  onShareAppMessage() {
    return {
      title: this.data.article.title,
      path: app.sharePath(this),
      success() {
        wx.showToast({
          title: '分享成功',
        });
      }
    };
  },
  onShareTimeline() {
    return {
      title: this.data.article.title,
    };
  },
});
