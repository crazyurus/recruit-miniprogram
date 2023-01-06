import request from '../../libs/request/scc';
import { getAddress } from '../../libs/location';
import { getCDNURL, formatTimestamp, sharePath } from '../../libs/utils';

Page({
  data: {
    company: {
      position: {},
    },
  },
  async onLoad(options) {
    const result = await request('/com/detail', {
      id: options.id,
    });

    this.setData({
      company: {
        id: result.id,
        name: result.name,
        logo: getCDNURL(result.logo_src),
        description: (!result.city_name || result.city_name === '市辖区' ? result.province_name : result.city_name) + ' ' + result.xingzhi_id_name + ' ' + result.business_name,
        type: result.xingzhi_id_name,
        region: result.province_name + (result.city_name === '市辖区' ? '' : result.city_name || '') + (result.region_name || ''),
        industry: result.business_name,
        scale: result.guimo_id_name,
        registeredCapital: result.catype_name,
        website: result.weburl,
        address: result.address,
        createTime: formatTimestamp(result.start_time),
        verifyTime: result.verify_time === 0 ? '' : formatTimestamp(result.verify_time),
        license: result.license,
        position: {
          latitude: Number.parseFloat(result.latitude),
          longitude: Number.parseFloat(result.longitude),
        },
      },
    });
  },
  openLocation() {
    let options;
    if (this.data.company.position.latitude) {
      options = {
        name: this.data.company.name,
        address: this.data.company.address,
        latitude: this.data.company.position.latitude,
        longitude: this.data.company.position.longitude,
      };
    } else {
      options = {
        name: this.data.company.name,
        address: this.data.company.address,
      };
    }

    getAddress(options);
  },
  onShareAppMessage() {
    return {
      title: this.data.company.name,
      path: sharePath(this),
    };
  },
});