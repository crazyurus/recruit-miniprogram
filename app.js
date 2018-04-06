App({
  globalData: {},
  getApiData(url, data = {}, loading = true) {
    if (loading) wx.showNavigationBarLoading();
    return new Promise(((resolve, reject) => {
      wx.request({
        url,
        method: data ? 'POST' : 'GET',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data,
        success(result) {
          if (url.indexOf('api.haitou.cc') > -1) resolve(result.data.state ? result.data.info : result.data.data);
          else if (result.data.errCode == 0) resolve(result.data.data);
          else if (reject) reject(result.data);
        },
        fail(result) {
          wx.toast('网络错误');
          if (reject) reject(result);
        },
        complete() {
          if (loading) wx.hideNavigationBarLoading();
        }
      });
    }));
  },
  alert(param) {
    if (typeof param === 'string') {
      param = {
        content: param
      };
    }

    wx.showModal({
      title: param.title || '就业招聘',
      content: param.content,
      showCancel: false,
      confirmColor: param.color || '#45c8dc',
      success: param.success || undefined
    });
  },
  toast(title) {
    wx.showToast({
      title: title,
      icon: 'none'
    });
  },
  loading(title) {
    wx.showLoading({ title });
  },
  about() {
    this.alert('Token团队出品\r\n产品&设计&开发：廖星');
  }
});
