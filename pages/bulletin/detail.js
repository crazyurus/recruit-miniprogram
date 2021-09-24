const app = getApp();
Page({
  data: {
    article: {}
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
