import { behavior as computedBehavior } from 'miniprogram-computed';
import schoolBehavior from '../../behaviors/school';
import listBehavior from '../../behaviors/list';
import request from '../../libs/request/scc';
import { formatTimestamp } from '../../libs/utils';
import tabMap from '../../data/notification';

Page({
  behaviors: [computedBehavior, listBehavior, schoolBehavior],
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
    const colorArray = ['green', 'purple', 'pink', 'orange', 'red'];

    if (this.school.id !== this.data.school.id) {
      const tabs = (tabMap[this.data.school.id] || []).map((tab, index) => ({
        ...tab,
        color: colorArray[index],
      }));

      this.reset();
      this.setData({
        tabs,
      });
      this.school = this.data.school;

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
