const request = require('../../libs/request/scc');
const utils = require('../../libs/utils');
const store = require('../../store/index');
const tabMap = require('../../data/notification');
const schoolBehavior = require('../../behaviors/school');

Page({
  behaviors: [schoolBehavior],
  data: {
    tabs: [],
    active: {},
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
        active: tabs.length > 0 ? tabs[0] : {},
      });

      if (tabs.length > 0) {
        this.loadList();
      }
    }
  },
  switchTabs(e) {
    const tab = this.data.tabs.find(tab => tab.id === e.currentTarget.dataset.tab);

    this.setData({
      active: tab,
    });
    this.reset();
    this.loadList();
  },
  async fetchData() {
    const result = await request('/Article/getlist', {
      page: this.data.page,
      size: 10,
      show_type: 2,
      cate_id: this.data.active.id,
    });

    this.data.page++;

    const list = result.list.map(item => {
      return {
        id: item.id,
        title: item.title,
        time: utils.formatTimestamp(item.addtime),
        view: item.views,
      };
    });

    return {
      list,
      total: result.count,
    };
  },
});
