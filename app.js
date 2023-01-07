import { promisifyAll } from 'miniprogram-api-promise';
import { Provider } from 'miniprogram-redux';
import store from './store/index';
import { confirm } from './libs/ui';

wx.promises = {};
promisifyAll(wx, wx.promises);

App({
  onLaunch() {
    const updateManager = wx.getUpdateManager();

    Provider(store);

    updateManager.onUpdateReady(async () => {
      const result = await confirm('新版本已经准备好，是否重启应用？');

      if (result.confirm) {
        updateManager.applyUpdate()
      }
    });
  },
});
