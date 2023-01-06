const request = require('../../../libs/request/scc');
const listBehavior = require('../../../behaviors/list');

Page({
  behaviors: [listBehavior],
  data: {
    search: '',
  },
  async fetchData() {
    const result = await request('/jobfair/getjoblist', {
      fair_id: this.options.id,
      page: this.data.page,
      size: 10,
      keywords: this.data.search,
      isunion: 2,
    });

    this.data.page++;

    const list = result.list.map(item => {
      return {
        id: item.job_id,
        name: item.work_name,
        company: item.com_id_info.name,
        degree: item.xueli_id_name,
        salary: [item.salary_floor, item.salay_ceil],
      };
    });

    return {
      list,
      total: result.count,
    };
  },
  search(e) {
    this.reset();
    this.setData({
      search: e.detail.value,
    });
    this.loadList();
  },
});
