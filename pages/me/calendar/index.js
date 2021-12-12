const app = getApp();

Page({
  data: {
    isQQ: app.isQQ,
    calendarURL: 'https://sf3-cn.feishucdn.com/obj/eden-cn/eseh7nupevhps/calendar/calendar.jpg',
  },
  previewCalendar() {
    wx.previewImage({
      urls: [this.data.calendarURL],
    });
  },
  async saveCalendar() {
    const result = await app.confirm({
      title: '提示',
      content: '确定要保存本学期校历到手机相册吗？',
      confirmText: '保存',
    });

    if (result.cancel) {
      return;
    }

    const hideLoading = app.loading('保存中');
    try {
      const { tempFilePath } = await wx.promises.downloadFile({
        url: this.data.calendarURL,
      });
      await wx.promises.saveImageToPhotosAlbum({
        filePath: tempFilePath,
      });

      hideLoading();
      app.toast('保存成功', 'success');
    } catch (error) {
      hideLoading();
      app.toast('校历保存失败');
      app.logger.error('[Download] calendar', error);
    }
  },
  openWUTGuide() {
    wx.navigateToMiniProgram({
      appId: this.data.isQQ ? '1109701341' : 'wx6e47fc71914f0254',
      envVersion: 'release',
    });
  },
  openNeteaseMusic() {
    wx.navigateToMiniProgram({
      appId: 'wx32431e4d2e38cc7b',
      path: 'pages/song/song?id=449577766',
      envVersion: 'release',
    });
  },
  openTimeTable() {
    app.openURL('https://mp.weixin.qq.com/s/tJPE98kpUcB4ZoacUcmWvw');
  },
});
