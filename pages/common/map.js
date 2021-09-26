Page({
  data: {
    name: '',
    address: '',
    longitude: 0,
    latitude: 0
  },
  onLoad(options) {
    this.setData(options);
  },
  navigateBack() {
    wx.navigateBack();
  },
});
