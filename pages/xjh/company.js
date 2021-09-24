const app = getApp();
Page({
  data: {
    company: {},
  },
  onLoad(options) {
    app.request('https://a.jiuyeb.cn/mobile.php/com/detail', {
      id: options.id,
    }).then(result => {
      this.setData({
        company: {
          ...result,
          start_time: new Date(result.start_time * 1000).toLocaleDateString().replace(/\//g, '-'),
          verify_time: new Date(result.verify_time * 1000).toLocaleDateString().replace(/\//g, '-'),
        }
      });
    });
  },
  openLocation() {
    wx.openLocation({
      name: this.data.company.name,
      address: this.data.company.address,
      latitude: Number.parseFloat(this.data.company.latitude),
      longitude: Number.parseFloat(this.data.company.longitude),
    });
  },
  onShareAppMessage() {
    return {
      title: this.data.company.name,
      success() {
        app.toast('分享成功');
      }
    };
  },
});