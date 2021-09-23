const app = getApp();
Page({
  data: {
    article: {},
    company: {},
    positions: [],
    title: false,
  },
  onLoad(options) {
    wx.setNavigationBarColor({
      backgroundColor: '#45c8dc',
      frontColor: '#ffffff'
    });
    wx.setNavigationBarTitle({
      title: ' '
    });

    app.request('https://a.jiuyeb.cn/mobile.php/preach/detail', {
      id: options.id,
    }, false).then(result => {
      this.setData({
        article: {
          title: result.title,
          source: '武汉理工大学学生就业指导中心',
          time: result.hold_date + ' ' + result.hold_starttime + '-' + result.hold_endtime,
          universityName: result.school_id_name,
          place: result.address || result.tmp_field_name,
          view: result.viewcount,
          content: result.remarks,
          tips: result.schoolwarn,
        },
        positions: result.ProfessionalList.map(item => item.professional_id_name),
        company: {
          id: result.comInfo.id,
          name: result.comInfo.name,
          logo: result.comInfo.logo_src,
          description: result.comInfo.city_name + ' ' + result.comInfo.xingzhi_id_name + ' ' + result.comInfo.business_name,
        },
      });
    });
  },
  onShareAppMessage(res) {
    return {
      title: this.data.article.title,
      path: '/pages/xjh/detail?id=' + this.data.article.id,
      success(res) {
        wx.showToast({
          title: '分享成功'
        });
      }
    };
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
        title: this.data.article.title
      });
    }
  },
  showAddressMap() {
    const self = this;
    const QQMap = require('../../library/qqmap/jssdk.js');
    const sdk = new QQMap({
      key: 'BP7BZ-6FXRV-6CNP3-UDXK2-GJ36S-VFBN7',
    });

    app.loading('获取地理位置中');
    sdk.geocoder({
      address: self.data.article.universityName + ',' + self.data.article.place,
      success(res) {
        wx.openLocation({
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          name: self.data.article.universityName,
          address: self.data.article.place
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
});
