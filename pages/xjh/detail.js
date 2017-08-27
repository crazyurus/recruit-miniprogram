var app = getApp();
Page({
  data: {
    article: {},
    bgcolor: '45c8dc',
    tab: {
      active: [true, false, false],
      disabled: [false, true, false]
    }
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
      result.content = result.content.replace(/<table border=1 cellspacing=0 cellpadding=0>/g, '<table style="border: 1px solid #c8c7cc">');

      this.setData({
        article: result,
        bgcolor: options.bgcolor,
        'tab.disabled': [result.content == '', result.albums.length == 0, result.xjhs.length == 0]
      });
    });
  },
  onShareAppMessage(res) {
    return {
      title: this.data.article.company,
      path: '/pages/xjh/detail?id=' + this.data.article.id + '&bgcolor=' + this.data.bgcolor,
      success(res) {
        wx.showToast({
          title: '分享成功'
        });
      },
      fail(res) {
        wx.showToast({
          title: '分享失败'
        });
      }
    }
  },
  clickTabContent() {
    if (this.data.tab.disabled[0]) return;

    this.setData({
      'tab.active': [true, false, false]
    });
  },
  clickTabAlbum() {
    if (this.data.tab.disabled[1]) return;

    this.setData({
      'tab.active': [false, true, false]
    });
  },
  clickTabXjh() {
    if (this.data.tab.disabled[2]) return;

    this.setData({
      'tab.active': [false, false, true]
    });
  },
  showImagePreview(e) {
    let imgArray = [];

    this.data.article.albums.map((item) => {
      imgArray.push(item.originalUrl);
    });

    wx.previewImage({
      current: e.target.dataset.src,
      urls: imgArray
    });
  }
});