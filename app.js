App({
  globalData: {},
  getApiData(url, data, loading = true) {
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
          if (result.data.errCode == 0) resolve(result.data.data);
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
  }
});