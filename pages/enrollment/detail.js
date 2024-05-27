import articleBehavior from '../../behaviors/article';
import request from '../../libs/request/scc';
import { getCDNURL, openURL } from '../../libs/utils';
import { getAddress } from '../../libs/location';

Page({
  behaviors: [articleBehavior],
  scrollTop: 60,
  data: {
    loading: true,
    company: {},
    positions: [],
  },
  async onLoad(options) {
    wx.setNavigationBarColor({
      backgroundColor: '#45c8dc',
      frontColor: '#ffffff'
    });
    wx.setNavigationBarTitle({
      title: ' '
    });

    const result = await request('/enrollment/detail', {
      id: options.id,
    }, false);

    this.icon = getCDNURL(result.comInfo.logo_src);
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
        logo: this.icon,
        description: (result.city_id_name === '市辖区' ? result.province_id_name : result.city_id_name) + ' ' + result.comInfo.xingzhi_id_name + ' ' + result.comInfo.business_name,
        telephone: result.tel,
      },
    });
  },
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.company.telephone,
    });
  },
  showAddressMap() {
    getAddress({
      name: this.data.company.name,
      address: this.data.company.address,
    });
  },
  handleLink(e) {
    const { href } = e.detail;

    openURL(href);
  }
});
