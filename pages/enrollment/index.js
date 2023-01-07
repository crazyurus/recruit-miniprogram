import request from '../../libs/request/scc';
import { formatTimestamp } from '../../libs/utils';
import store from '../../store/index';
import schoolBehavior from '../../behaviors/school';

Page({
  behaviors: [schoolBehavior],
  data: {
    search: '',
  },
  async fetchData() {
    const result = await request('/enrollment/getlist', {
      page: this.data.page,
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

    this.data.page++;

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

    store.dispatch({
      type: 'SET_ARTICLE',
      payload: {
        id: item.id,
        title: item.title,
        source: '其它企业',
      },
    });
  },
});
