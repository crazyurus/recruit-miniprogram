const app = getApp();
Page({
  data: {
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
          description: (result.city_id_name === '市辖区' ? result.province_id_name : result.city_id_name) + ' ' + result.comInfo.xingzhi_id_name + ' ' + result.comInfo.business_name,
          telephone: result.tel,
        },
      });
    });
  },
  onShareAppMessage() {
    return {
      title: this.data.article.title,
      path: app.sharePath(this),
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
    app.address(this.data.company.address, this.data.company.name, this.data.company.address);
  },
});
