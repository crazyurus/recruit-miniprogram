const app = getApp();
Page({
  data: {
    url: '',
  },
  onLoad(options) {
    this.setData({
      url: `https://web.wutnews.net/recruit/index/wechat?url=${encodeURIComponent(options.url)}`,
    });
  },
  onShareAppMessage(options) {
    return {
      title: '武汉理工大学就业招聘',
      path: '/pages/common/webview?url=' + encodeURIComponent('https://web.wutnews.net/recruit/index/wechat?url=' + encodeURIComponent(options.webViewUrl)),
      success(res) {
        wx.showToast({
          title: '分享成功',
        });
      },
    };
  },
});
