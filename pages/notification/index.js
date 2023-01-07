import { behavior as computedBehavior } from 'miniprogram-computed';
import request from '../../libs/request/scc';
import { formatTimestamp } from '../../libs/utils';
import store from '../../store/index';
import tabMap from '../../data/notification';
import schoolBehavior from '../../behaviors/school';

Page({
  behaviors: [computedBehavior, schoolBehavior],
  data: {
    tabs: [],
    active: 0,
  },
  computed: {
    range(data) {
      return data.tabs.map(item => item.name);
    },
  },
  onShow() {
    const { school } = store.getState();
    const colorArray = ['green', 'purple', 'pink', 'orange', 'red'];

    if (school.id !== this.data.school.id) {
      const tabs = (tabMap[school.id] || []).map((tab, index) => ({
        ...tab,
        color: colorArray[index],
      }));

      this.reset();
      this.setData({
        school,
        tabs,
      });

      if (tabs.length > 0) {
        this.loadList();
      }
    }
  },
  switchTab(e) {
    const { value } = e.detail;

    this.setData({
      active: value,
    });
    this.reset();
    this.loadList();
  },
  async fetchData() {
    const result = await request('/Article/getlist', {
      page: this.data.page,
      size: 10,
      show_type: 2,
      cate_id: this.data.tabs[this.data.active].id,
    });
    const list = result.list.map(item => {
      return {
        id: item.id,
        title: item.title,
        time: formatTimestamp(item.addtime),
        view: item.views,
      };
    });

    this.data.page++;

    return {
      list,
      total: result.count,
    };
  },
});
