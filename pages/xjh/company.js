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
          start_time: app.formatTimestamp(result.start_time),
          verify_time: result.verify_time === 0 ? '' : app.formatTimestamp(result.verify_time),
        }
      });
    });
  },
  openLocation() {
    if (this.data.company.latitude) {
      app.openLocation({
        name: this.data.company.name,
        address: this.data.company.address,
        latitude: Number.parseFloat(this.data.company.latitude),
        longitude: Number.parseFloat(this.data.company.longitude),
      });
    } else {
      app.address({
        name: this.data.company.name,
        address: this.data.company.address,
      });
    }
  },
  onShareAppMessage() {
    return {
      title: this.data.company.name,
      path: app.sharePath(this),
      success() {
        app.toast('分享成功');
      }
    };
  },
});