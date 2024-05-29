import { mailTo } from '../../../libs/utils';

Page({
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
  openEmail(e) {
    const { value } = e.currentTarget.dataset;

    mailTo(value);
  },
});
