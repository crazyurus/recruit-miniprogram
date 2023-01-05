const store = require('../../store/index');
const utils = require('../../libs/utils');
const ui = require('../../libs/ui');
const { WUTSchoolID } = require('../../libs/const');

Page({
  data: {
    isQQ: utils.isQQ,
    userInfo: null,
    school: {},
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
    if (this.data.userInfo) {
      return;
    }

    const self = this;
    wx.getUserProfile({
      desc: '用于在界面中展示用户头像和昵称',
      success(res) {
        self.setData({
          enablePostModule: self.data.school.id === WUTSchoolID,
          userInfo: {
            name: res.userInfo.nickName,
            avatar: res.userInfo.avatarUrl,
          },
        });
      },
    });
  },
});
