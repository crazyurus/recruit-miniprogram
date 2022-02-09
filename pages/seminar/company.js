const request = require('../../library/request');
const ui = require('../../library/ui');
const location = require('../../library/location');
const utils = require('../../library/utils');

Page({
  data: {
    company: {},
  },
  onLoad(options) {
    request('/com/detail', {
      id: options.id,
    }).then(result => {
      this.setData({
        company: {
          ...result,
          start_time: utils.formatTimestamp(result.start_time),
          verify_time: result.verify_time === 0 ? '' : utils.formatTimestamp(result.verify_time),
        }
      });
    });
  },
  openLocation() {
    let options;
    if (this.data.company.latitude) {
      options = {
        name: this.data.company.name,
        address: this.data.company.address,
        latitude: Number.parseFloat(this.data.company.latitude),
        longitude: Number.parseFloat(this.data.company.longitude),
      };
    } else {
      options = {
        name: this.data.company.name,
        address: this.data.company.address,
      };
    }
    location.getAddress(options);
  },
  onShareAppMessage() {
    return {
      title: this.data.company.name,
      path: utils.sharePath(this),
      success() {
        ui.toast('分享成功', 'success');
      }
    };
  },
});