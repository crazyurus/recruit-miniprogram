const app = getApp();

Page({
  data: {
    tocaoExtraData: {
      id: 23796,
    },
  },
  about() {
    const url = 'https://mp.weixin.qq.com/s/HbXW7A87ilgW_CbEI-1ODQ';

    wx.navigateTo({
      url: '/pages/common/webview?url=' + encodeURIComponent(url),
    })
  },
})