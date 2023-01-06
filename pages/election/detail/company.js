const request = require('../../../libs/request/scc');
const utils = require('../../../libs/utils');
const listBehavior = require('../../../behaviors/list');

Page({
  behaviors: [listBehavior],
  async fetchData() {
    const result = await request('/jobfair/signenterprise', {
      id: this.options.id,
      page: this.data.page,
      size: 10,
      confirm_status: -1,
      allotstatus: 3,
      check_status: 3,
    });

    this.data.page++;

    const list = result.list.map(item => {
      return {
        id: item.com_id,
        name: item.com_id_info.name,
        logo: utils.getCDNURL(item.com_id_info.logo_src),
        count: {
          position: item.check_zhiwei_count,
          person: item.check_zhiwei_person,
        },
      };
    });

    return {
      list,
      total: result.count,
    };
  },
});
