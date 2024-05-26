import { promisifyAll } from 'miniprogram-api-promise';
import { Provider } from 'miniprogram-redux';
import store from './store/index';
import { getDefaultSchool } from './store/school';
import { confirm } from './libs/ui';

wx.promises = {};
promisifyAll(wx, wx.promises);

App({
  onLaunch() {
    const updateManager = wx.getUpdateManager();

    Provider(store);

    if (!getDefaultSchool().id) {
      wx.redirectTo({
        url: '/pages/me/school/index'
      });
    }

    updateManager.onUpdateReady(async () => {
      const result = await confirm('新版本已经准备好，是否重启应用？');

      if (result.confirm) {
        updateManager.applyUpdate()
      }
    });
  },
});
