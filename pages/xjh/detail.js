var app = getApp();
Page({
  data: {
    article: {},
    bgcolor: '45c8dc',
    tab: {
      active: [true, false, false],
      disabled: [false, true, false]
    },
    title: false,
    child: false
  },
  onLoad(options) {
    wx.setNavigationBarColor({
      backgroundColor: '#' + options.bgcolor,
      frontColor: '#ffffff'
    });
    wx.setNavigationBarTitle({
      title: ' '
    });

    app.getApiData('https://api.haitou.cc/xjh/view?client=wutnews&id=' + options.id, {}, false).then((result) => {
      result.isUniversityLogo = result.logoUrl.indexOf('/university') > -1;
      result.content = result.content.replace(/<table border=1 cellspacing=0 cellpadding=0>/g, '<table style="border: 1px solid #c8c7cc">').replace(/src="http/g, 'style="max-width: 100%" src="http');

      if (result.univ_id == 3) {
        let pos = result.content.indexOf('</b></p> <div> <div> <p>');
        if (pos > -1) result.content = result.content.substring(pos + 9);
      }

      this.setData({
        article: result,
        child: getCurrentPages().length == 5,
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
  },
  onPageScroll(e) {
    if (e.scrollTop <= 60 && this.data.title) {
      this.data.title = false;
      wx.setNavigationBarTitle({
        title: ' '
      });
    }
    if (e.scrollTop > 60 && !this.data.title) {
      this.data.title = true;
      wx.setNavigationBarTitle({
        title: this.data.article.company
      });
    }
  }
});