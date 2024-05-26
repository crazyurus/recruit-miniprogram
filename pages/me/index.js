import { behavior as computedBehavior } from 'miniprogram-computed';
import schoolBehavior from '../../behaviors/school';
import { openURL } from '../../libs/utils';
import { toast } from '../../libs/ui';
import { exist } from '../../libs/file';

const avatarFilePath = wx.env.USER_DATA_PATH + '/avatar.jpg';
const nickNameStorageKey = 'nickName';

Page({
  behaviors: [schoolBehavior, computedBehavior],
  data: {
    isLogin: false,
    userInfo: {
      name: '',
      avatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
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
  async tucao() {
    const { tapIndex } = await wx.promises.showActionSheet({
      itemList: ['提缺陷', '提建议'],
    });
    const params = tapIndex === 0 ? {
      appId: 'wx8abaf00ee8c3202e',
      extraData: {
        id: 23796,
      },
    } : {
      appId: 'wxebadf544ddae62cb',
      path: 'pages/survey/index?sid=11501833&hash=89c8&navigateBackMiniProgram=true',
    };

    wx.openEmbeddedMiniProgram(params);

  },
  privacy() {
    wx.openEmbeddedMiniProgram({
      appId: 'wxd45c635d754dbf59',
      path: 'pages/detail/detail?url=' + encodeURIComponent('https://docs.qq.com/doc/DRVRrVFZpZllsWU9k'),
    });
  },
  about() {
    openURL('https://mp.weixin.qq.com/s/HbXW7A87ilgW_CbEI-1ODQ');
  },
  getUserInfo(e) {
    const { errMsg } = e.detail;

    if (errMsg === 'getPhoneNumber:ok') {
      toast.success('登录成功');

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
