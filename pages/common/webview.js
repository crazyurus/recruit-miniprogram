const app = getApp();

Page({
  data: {
    url: '',
  },
  onLoad(options) {
    this.setData({
      url: decodeURIComponent(options.url)
    });
  },
  onShareAppMessage() {
    return {
      success() {
        app.toast('分享成功', 'success');
      }
    };
  }
})