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

    app.request('https://a.jiuyeb.cn/mobile.php/enrollment/detail', {
      id: options.id,
    }, false).then(result => {
      this.setData({
        article: {
          title: result.title,
          source: result.comInfo.tag || '其它企业',
          view: result.viewcount,
          content: result.remarks,
          tips: result.schoolwarn,
        },
        positions: result.ProfessionalList.map(item => item.professional_id_name),
        company: {
          id: result.com_id,
          name: result.comInfo.name,
          address: result.address,
          logo: result.comInfo.logo_src + '!y',
          description: (result.comInfo.city_name === '市辖区' ? result.comInfo.province_name : result.comInfo.city_name) + ' ' + result.comInfo.xingzhi_id_name + ' ' + result.comInfo.business_name,
          telephone: result.tel,
        },
      });
    });
  },
  onShareAppMessage() {
    return {
      title: this.data.article.title,
      success() {
        app.toast('分享成功');
      }
    };
  },
  onShareTimeline() {
    return {
      title: this.data.article.title,
      imageUrl: this.data.company.logo,
    };
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
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.company.telephone,
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
      address: self.data.company.address,
      success(res) {
        wx.openLocation({
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          name: self.data.company.name,
          address: self.data.company.address
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
