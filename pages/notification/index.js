const request = require('../../library/request/scc');
const utils = require('../../library/utils');
const store = require('../../store/index');
const tabMap = require('../../data/notification');

Page({
  data: {
    list: [],
    page: 1,
    loading: true,
    school: {},
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
        this.loadNoticeList();
      }
    }
  },
  onReachBottom() {
    this.loadNoticeList();
  },
  onPullDownRefresh() {
    this.setData({
      page: 1,
      loading: true
    });
    this.data.list = [];
    this.loadNoticeList();
  },
  switchTabs(e) {
    const tab = this.data.tabs.find(tab => tab.id === e.currentTarget.dataset.tab);

    this.setData({
      active: tab,
    });
    this.reset();
    this.loadNoticeList();
  },
  loadNoticeList() {
    request('/Article/getlist', {
      page: this.data.page,
      size: 10,
      show_type: 2,
      cate_id: this.data.active.id,
    }).then(result => {
      if (result.list.length === 0) {
        this.setData({
          loading: false,
        });
        return;
      }

      this.data.page++;
      wx.stopPullDownRefresh();

      const list = result.list.map(item => {
        return {
          id: item.id,
          title: item.title,
          time: utils.formatTimestamp(item.addtime),
          view: item.views,
        };
      });

      this.setData({
        loading: list.length >= 10,
        list: this.data.list.concat(list)
      });
    });
  },
  reset() {
    this.data.list = [];
    this.setData({
      page: 1,
      loading: true
    });
    wx.pageScrollTo({
      scrollTop: 0,
    });
  }
});
