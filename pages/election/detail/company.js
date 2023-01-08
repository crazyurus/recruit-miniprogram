import request from '../../../libs/request/scc';
import { getCDNURL } from '../../../libs/utils';
import listBehavior from '../../../behaviors/list';

Page({
  behaviors: [listBehavior],
  async fetchData() {
    const result = await request('/jobfair/signenterprise', {
      id: this.options.id,
      page: this.currentPage,
      size: 10,
      confirm_status: -1,
      allotstatus: 3,
      check_status: 3,
    });
    const list = result.list.map(item => {
      return {
        id: item.com_id,
        name: item.com_id_info.name,
        logo: getCDNURL(item.com_id_info.logo_src),
        count: {
          position: item.check_zhiwei_count,
          person: item.check_zhiwei_person,
        },
      };
    });

    this.currentPage++;

    return {
      list,
      total: result.count,
    };
  },
});
