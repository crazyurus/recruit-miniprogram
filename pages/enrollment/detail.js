const request = require('../../library/request');
const utils = require('../../library/utils');
const location = require('../../library/location');
const store = require('../../store/index');

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

    request('/enrollment/detail', {
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
          logo: utils.getCDNURL(result.comInfo.logo_src),
          description: (result.city_id_name === '市辖区' ? result.province_id_name : result.city_id_name) + ' ' + result.comInfo.xingzhi_id_name + ' ' + result.comInfo.business_name,
          telephone: result.tel,
        },
      });
    });
  },
  onReady() {
    const { article } = store.getState();

    if (article) {
      this.setData({
        article: {
          ...this.data.article,
          ...article,
        },
      });
    }
  },
  onUnload() {
    store.dispatch({
      type: 'CLEAR_ARTICLE',
    });
  },
  onShareAppMessage() {
    return {
      title: this.data.article.title,
      path: utils.sharePath(this),
      success() {
        ui.toast('分享成功', 'success');
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
    location.getAddress({
      name: this.data.company.name,
      address: this.data.company.address,
    });
  },
});
