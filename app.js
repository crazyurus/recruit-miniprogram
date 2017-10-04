App({
  globalData: {},
  getApiData(url, data = {}, loading = true) {
    if (loading) wx.showNavigationBarLoading();
    return new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        method: data ? 'POST' : 'GET',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
        success(result) {
          if (url.indexOf('api.haitou.cc') > -1) resolve(result.data.data);
          else if (result.data.errCode == 0) resolve(result.data.data);
          else if (reject) reject(result.data);
        },
        fail(result) {
          wx.showToast({
            title: '网络错误'
          });
          if (reject) reject(result);
        },
        complete() {
          if (loading) wx.hideNavigationBarLoading();
        }
      });
    });
  },
  showAlertModal(param) {
    wx.showModal({
      title: param.title || '就业招聘',
      content: param.content,
      showCancel: false,
      confirmColor: param.color || '#45c8dc',
      success: param.success || undefined
    });
  }
});