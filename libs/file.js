const ui = require('./ui');

async function openDocument(url) {
  const hideLoading = ui.loading('下载中');

  try {
    const { tempFilePath } = await wx.promises.downloadFile({ url });
    await wx.promises.openDocument({
      filePath: tempFilePath,
      showMenu: true,
    });
  } catch (error) {
    ui.toast('打开失败');
  }

  hideLoading();
}

module.exports = {
  openDocument,
};
