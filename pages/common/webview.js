const { toast } = require('../../libs/ui');

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
        toast('分享成功', 'success');
      }
    };
  }
})