const app = getApp();

Page({
  data: {},
  tucao() {
    if (app.isQQ) {
      this.openURL('https://support.qq.com/products/23796');
    } else {
      wx.navigateToMiniProgram({
        appId: 'wx8abaf00ee8c3202e',
        extraData: {
          id: 23796,
        },
        envVersion: 'release',
      })
    }
  },
  about() {
    this.openURL('https://mp.weixin.qq.com/s/HbXW7A87ilgW_CbEI-1ODQ');
  },
  openURL(url) {
    wx.navigateTo({
      url: '/pages/common/webview?url=' + encodeURIComponent(url),
    });
  }
})