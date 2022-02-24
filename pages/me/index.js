const utils = require('../../library/utils');

Page({
  data: {
    isQQ: utils.isQQ,
    userInfo: null,
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
  getUserInfo() {
    if (this.data.userInfo) {
      return;
    }

    const self = this;
    wx.getUserProfile({
      desc: '用于在界面中展示用户头像和昵称',
      success(res) {
        self.setData({
          userInfo: {
            name: res.userInfo.nickName,
            avatar: res.userInfo.avatarUrl,
          },
        });
      },
    });
  },
});
