const app = getApp();
Page({
  data: {
    loading: true,
    article: {},
    company: {},
    positions: [],
    title: false,
    contentStyle: {
      a: 'color: #45c8dc',
    },
  },
  onLoad(options) {
    wx.setNavigationBarColor({
      backgroundColor: '#45c8dc',
      frontColor: '#ffffff'
    });
    wx.setNavigationBarTitle({
      title: ' '
    });

    app.request('/enrollment/detail', {
      id: options.id,
    }, false).then(result => {
      this.setData({
        loading: false,
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
          description: (result.city_id_name === '市辖区' ? result.province_id_name : result.city_id_name) + ' ' + result.comInfo.xingzhi_id_name + ' ' + result.comInfo.business_name,
          telephone: result.tel,
        },
      });
    });
  },
  onReady() {
    if (app.globalData.article) {
      this.setData({
        article: {
          ...this.data.article,
          ...app.globalData.article,
        },
      });
    }
  },
  onUnload() {
    app.globalData.article = null;
  },
  onShareAppMessage() {
    return {
      title: this.data.article.title,
      path: app.sharePath(this),
      success() {
        app.toast('分享成功', 'success');
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
    app.address({
      name: this.data.company.name,
      address: this.data.company.address,
    });
  },
});
