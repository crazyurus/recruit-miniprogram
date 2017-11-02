var app = getApp();
Page({
  data: {
    url: ''
  },
  onLoad(options) {
      this.setData({
        url: 'https://web.wutnews.net/recruit/index/wechat?url=' + encodeURIComponent(options.url)
      });
  }
});