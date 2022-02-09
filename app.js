const { promisifyAll } = require('miniprogram-api-promise');
const { confirm } = require('./library/ui');

wx.promises = {};
promisifyAll(wx, wx.promises);

App({
  onLaunch() {
    const updateManager = wx.getUpdateManager();

    updateManager.onUpdateReady(async () => {
      const result = await confirm('新版本已经准备好，是否重启应用？');

      if (result.confirm) {
        updateManager.applyUpdate()
      }
    });
  },
});
