const utils = require('../../library/utils');

Page({
  data: {
    isQQ: utils.isQQ,
  },
  tucao() {
    if (this.data.isQQ) {
      utils.openURL('https://support.qq.com/products/23796');
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
    wx.navigateToMiniProgram({
      appId: this.data.isQQ ? '1108338344' : 'wxd45c635d754dbf59',
      path: 'pages/detail/detail?url=' + encodeURIComponent('https://docs.qq.com/doc/DRVRrVFZpZllsWU9k'),
    });
  },
  about() {
    utils.openURL('https://mp.weixin.qq.com/s/HbXW7A87ilgW_CbEI-1ODQ');
  },
});
