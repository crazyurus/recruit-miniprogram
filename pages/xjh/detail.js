var app = getApp();
Page({
  data: {
    article: {},
    bgcolor: '45c8dc'
  },
  onLoad(options) {
    wx.setNavigationBarColor({
      backgroundColor: '#' + options.bgcolor,
      frontColor: '#ffffff'
    });
    wx.setNavigationBarTitle({
      title: ' '
    });

    app.getApiData('https://api.wutnews.net/recruit/haitou/xjh/view?client=wutnews&id=' + options.id, {}, false).then((result) => {
      result.isUniversityLogo = result.logoUrl.indexOf('/university') > -1;

      this.setData({
        article: result,
        bgcolor: options.bgcolor
      });
    });
  }
});