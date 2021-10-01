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
    app.request('https://a.jiuyeb.cn/mobile.php/Article/detail', {
      id: options.id,
      show_type: 2
    }, false).then(result => {
      this.setData({
        article: {
          title: result.title,
          content: result.content.replace(/font/g, 'f'),
          attachments: (result.attInfo || []).map(item => ({
            name: item.fujian_des,
            url: 'https:' + item.fujian_name,
          })),
        },
      });
    });
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
  openAttachment(e) {
    const { url } = e.currentTarget.dataset;

    wx.downloadFile({
      url,
      success(res) {
        wx.openDocument({
          filePath: res.tempFilePath,
          showMenu: true,
          fail() {
            app.toast('打开失败');
          }
        });
      },
      fail() {
        app.toast('下载失败');
      }
    });
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
