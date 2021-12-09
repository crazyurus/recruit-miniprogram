const app = getApp();

Page({
  data: {
    isQQ: app.isQQ,
    enablePostModule: false,
  },
  showPostModule() {
    if (this.data.enablePostModule) {
      return;
    }

    wx.vibrateShort({
      type: 'heavy',
    });
    this.setData({
      enablePostModule: true,
    });
  },
  tucao() {
    if (this.data.isQQ) {
      this.openURL('https://support.qq.com/products/23796');
    } else {
      wx.navigateToMiniProgram({
        appId: 'wx8abaf00ee8c3202e',
        extraData: {
          id: 23796,
        },
        envVersion: 'release',
      });
    }
  },
  privacy() {
    this.openURL('https://mp.weixin.qq.com/wxawap/waprivacyinfo?action=show&appid=wx21545de6d74f4b0b&uin=MjE3MjA3MzcyMQ%3D%3D&key=58032826474225cbdd777f132abf3616d0431c9e8ded5daffea7ac9a2c53a6dd3cd690621dc75d14fba5de56f17c3071a21cc04ab19e2a8e84c14f8a9d72f4891b1efdedc61142d2564a4915b7102538c32d0174f069bd6efc250ed12c10be4be5fd0a4df352050c2dc1e3985fdd70fffbac723d08174cd0b5eafe96d38a4ca9');
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