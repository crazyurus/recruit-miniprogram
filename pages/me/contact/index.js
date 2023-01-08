import { isQQ } from '../../../libs/utils';

Page({
  data: {
    isQQ: isQQ(),
  },
  openCustomerChat() {
    wx.openCustomerServiceChat({
      extInfo: {
        url: 'https://work.weixin.qq.com/kfid/kfc87dc64d44c7caad5'
      },
      corpId: 'wwbdabc7d0777cceaf',
    });
  },
  copy(e) {
    const { value } = e.currentTarget.dataset;

    wx.setClipboardData({
      data: value,
    });
  },
  makePhoneCall(e) {
    const { value } = e.currentTarget.dataset;

    wx.makePhoneCall({
      phoneNumber: value,
    });
  },
});
