import { behavior as computedBehavior } from 'miniprogram-computed';
import schoolBehavior from '../../behaviors/school';
import { isQQ, openURL } from '../../libs/utils';
import { toast } from '../../libs/ui';
import { exist } from '../../libs/file';
import { WUTSchoolID } from '../../data/const';

const avatarFilePath = wx.env.USER_DATA_PATH + '/avatar.jpg';
const nickNameStorageKey = 'nickName';

Page({
  behaviors: [schoolBehavior, computedBehavior],
  data: {
    isQQ: isQQ(),
    isLogin: false,
    userInfo: {
      name: '',
      avatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    },
  },
  computed: {
    isWUT(data) {
      return data.school.id === WUTSchoolID;
    },
    enablePostModule(data) {
      return data.school.id === WUTSchoolID && data.isLogin;
    },
  },
  onLoad() {
    const self = this;

    if (exist(avatarFilePath)) {
      this.setData({
        'userInfo.avatar': avatarFilePath,
      });
    }

    wx.getStorage({
      key: nickNameStorageKey,
      success({ data }) {
        self.setData({
          'userInfo.name': data,
        });
      }
    })
  },
  tucao() {
    if (this.data.isQQ) {
      toast('QQ 小程序暂不支持此功能');
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
    openURL('https://mp.weixin.qq.com/s/HbXW7A87ilgW_CbEI-1ODQ');
  },
  getUserInfo(e) {
    const { errMsg } = e.detail;

    if (errMsg === 'getPhoneNumber:ok') {
      toast('登录成功', 'success');

      this.setData({
        isLogin: true,
      });
    }
  },
  changeNickName() {
    const self = this;

    wx.showModal({
      title: '修改昵称',
      content: this.data.userInfo.name,
      showCancel: true,
      confirmColor: '#45c8dc',
      confirmText: '保存',
      editable: true,
      placeholderText: '输入你的昵称',
      success({ content }) {
        if (!content) {
          return;
        }

        wx.setStorage({
          key: nickNameStorageKey,
          data: content,
        });

        self.setData({
          'userInfo.name': content,
        });
      }
    });
  },
  chooseAvatar(e) {
    const { avatarUrl } = e.detail;

    this.setData({
      'userInfo.avatar': avatarUrl,
    }, () => {
      wx.getFileSystemManager().saveFile({
        tempFilePath: avatarUrl,
        filePath: avatarFilePath,
      });
    });
  },
});
