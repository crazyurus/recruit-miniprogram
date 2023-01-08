import { loading, toast } from './ui';

async function openDocument(url) {
  const hideLoading = loading('下载中');

  try {
    const { tempFilePath } = await wx.promises.downloadFile({ url });
    await wx.promises.openDocument({
      filePath: tempFilePath,
      showMenu: true,
    });
  } catch (error) {
    toast.fail('打开失败');
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

export {
  openDocument,
  exist,
};
