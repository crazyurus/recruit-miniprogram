const app = getApp();
Page({
  data: {
    article: {},
    bgcolor: '45c8dc',
    tab: {
      active: [true, false, false, false],
      disabled: [false, true, false, false]
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

    app.getApiData('https://api.haitou.cc/xjh/view?client=wutnews&id=' + options.id, {}, false).then(result => {
      result.isUniversityLogo = result.logoUrl.indexOf('/university') > -1;
      result.content = result.content.replace(/<table border=1 cellspacing=0 cellpadding=0>/g, '<table style="border: 1px solid #c8c7cc">').replace(/src="/g, 'style="max-width: 100%" src="');

      if (result.univ_id === 3) {
        const pos = result.content.indexOf('</b></p> <div> <div> <p>');
        if (pos > -1) result.content = result.content.substring(pos + 9);
      }

      this.setData({
        article: result,
        child: getCurrentPages().length === 10,
        bgcolor: options.bgcolor,
        'tab.disabled': [result.content == '', result.albums.length == 0, result.positions.length == 0, result.xjhs.length == 0]
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
    };
  },
  clickTabContent() {
    if (this.data.tab.disabled[0]) return;

    this.setData({
      'tab.active': [true, false, false, false],
    });
  },
  clickTabAlbum() {
    if (this.data.tab.disabled[1]) return;

    this.setData({
      'tab.active': [false, true, false, false]
    });
  },
  clickTabPosition() {
    if (this.data.tab.disabled[2]) return;

    this.setData({
      'tab.active': [false, false, true, false]
    });
  },
  clickTabXjh() {
    if (this.data.tab.disabled[3]) return;

    this.setData({
      'tab.active': [false, false, false, true]
    });
  },
  showImagePreview(e) {
    let imgArray = this.data.article.albums.map(item => {
      return item.originalUrl;
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
  },
  showApplyWebsite() {
    const self = this;
    wx.showModal({
      title: self.data.article.company,
      content: '请在浏览器粘贴以下网址访问：' + self.data.article.apply_url,
      showCancel: true,
      confirmText: '复制网址',
      confirmColor: '#' + self.data.bgcolor,
      cancelText: '关闭',
      success() {
        wx.setClipboardData({
          data: self.data.article.apply_url,
          success() {
            app.toast('复制成功');
          }
        });
      }
    });
  },
  showAddressMap() {
    const self = this;
    const QQMap = require('../../library/qqmap/jssdk.js');
    const sdk = new QQMap({
      key: 'BP7BZ-6FXRV-6CNP3-UDXK2-GJ36S-VFBN7',
    });

    app.loading('获取地理位置中');
    sdk.geocoder({
      address: self.data.article.universityName + ',' + self.data.article.address,
      success(res) {
        wx.openLocation({
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          name: self.data.article.universityName,
          address: self.data.article.address + '（位置仅供参考）'
        });
      },
      fail(res) {
        app.alert(res.message);
      },
      complete() {
        wx.hideLoading();
      }
    });
  },
  about() {
    app.about();
  }
});
