import { toast, confirm, loading } from '../../../libs/ui';
import { isQQ, openURL } from '../../../libs/utils';

Page({
  data: {
    isQQ: isQQ(),
    calendarURL: 'https://wx.whut.edu.cn/img/pic.0465e666.jpg',
  },
  previewCalendar() {
    wx.previewImage({
      urls: [this.data.calendarURL],
    });
  },
  async saveCalendar() {
    const result = await confirm({
      title: '提示',
      content: '确定要保存本学期校历到手机相册吗？',
      confirmText: '保存',
    });

    if (result.cancel) {
      return;
    }

    const hideLoading = loading('保存中');
    try {
      const { tempFilePath } = await wx.promises.downloadFile({
        url: this.data.calendarURL,
      });
      await wx.promises.saveImageToPhotosAlbum({
        filePath: tempFilePath,
      });

      hideLoading();
      toast.success('保存成功');
    } catch (error) {
      hideLoading();
      toast.fail('保存失败');
    }
  },
  openWUTGuide() {
    wx.navigateToMiniProgram({
      appId: this.data.isQQ ? '1109701341' : 'wx6e47fc71914f0254',
    });
  },
  openNeteaseMusic() {
    wx.navigateToMiniProgram({
      appId: 'wx32431e4d2e38cc7b',
      path: 'pages/song/song?id=449577766',
    });
  },
  openTimeTable() {
    openURL('https://mp.weixin.qq.com/s/tJPE98kpUcB4ZoacUcmWvw');
  },
});
