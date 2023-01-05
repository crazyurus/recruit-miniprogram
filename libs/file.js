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

function exist(filePath) {
  const fs = wx.getFileSystemManager();

  try {
    fs.accessSync(filePath);

    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  openDocument,
  exist,
};
