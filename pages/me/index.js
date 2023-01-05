const store = require('../../store/index');
const utils = require('../../libs/utils');
const ui = require('../../libs/ui');
const { WUTSchoolID } = require('../../libs/const');

Page({
  data: {
    isQQ: utils.isQQ,
    isLogin: false,
    school: {},
    avatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    enablePostModule: false,
  },
  onShow() {
    const { school } = store.getState();
    let { enablePostModule } = this.data;

    if (school.id !== WUTSchoolID) {
      enablePostModule = false;
    }

    this.setData({
      school,
      enablePostModule,
    });
  },
  tucao() {
    if (this.data.isQQ) {
      ui.toast('QQ 小程序暂不支持此功能');
    } else {
      wx.openEmbeddedMiniProgram({
        appId: 'wx8abaf00ee8c3202e',
        extraData: {
          id: 23796,
        },
      });
    }
  },
  privacy() {
    wx[this.data.isQQ ? 'navigateToMiniProgram' : 'openEmbeddedMiniProgram']({
      appId: this.data.isQQ ? '1108338344' : 'wxd45c635d754dbf59',
      path: 'pages/detail/detail?url=' + encodeURIComponent('https://docs.qq.com/doc/DRVRrVFZpZllsWU9k'),
    });
  },
  about() {
    utils.openURL('https://mp.weixin.qq.com/s/HbXW7A87ilgW_CbEI-1ODQ');
  },
  getUserInfo() {
    ui.toast('登录成功', 'success');

    this.setData({
      enablePostModule: this.data.school.id === WUTSchoolID,
      isLogin: true,
    });
  },
  chooseAvatar(e) {
    const { avatarUrl } = e.detail;

    this.setData({
      avatar: avatarUrl,
    });
  },
});
