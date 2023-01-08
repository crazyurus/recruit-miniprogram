import { dispatch } from 'miniprogram-redux';
import request from '../../libs/request/scc';
import { formatTimestamp } from '../../libs/utils';
import schoolBehavior from '../../behaviors/school';
import listBehavior from '../../behaviors/list';

Page({
  behaviors: [listBehavior, schoolBehavior],
  data: {
    search: '',
  },
  async fetchData() {
    const result = await request('/enrollment/getlist', {
      page: this.currentPage,
      size: 10,
      keywords: this.data.search,
      isben: 1,
      day: 0,
      type: 0,
      province_id: 0,
    });
    const list = result.list.map(item => {
      return {
        id: item.id,
        title: item.title,
        time: formatTimestamp(item.addtime),
        view: item.viewcount,
      };
    });

    this.currentPage++;

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
  openDetail(e) {
    const { index } = e.currentTarget.dataset;
    const item = this.data.list[index];

    dispatch({
      type: 'SET_ARTICLE',
      payload: {
        id: item.id,
        title: item.title,
        source: '其它企业',
      },
    });
  },
});
