const request = require('../../../libs/request/app');
const utils = require('../../../libs/utils');
const categories = require('../../../data/news');

Page({
  data: {
    list: [],
    page: 1,
    loading: true,
    category: {
      value: '',
      range: [[], []],
    },
  },
  onLoad() {
    this.loadNoticeList();
    this.calcCategory(0);
  },
  onReachBottom() {
    this.loadNoticeList();
  },
  onPullDownRefresh() {
    this.setData({
      page: 1,
      loading: true,
    });
    this.data.list = [];
    this.loadNoticeList();
  },
  calcCategory(index) {
    this.setData({
      'category.range': [
        categories.map(item => item.label),
        categories[index].children.map(item => item.label),
      ],
    });
  },
  loadNoticeList() {
    request('/news/listTitles', {
      pageNumber: this.data.page,
      pageSize: 10,
      newsType: this.data.category.value,
    }).then(result => {
      if (result.length === 0) {
        this.setData({
          loading: false,
        });
        return;
      }

      this.data.page++;
      wx.stopPullDownRefresh();

      const list = result.map(item => {
        return {
          id: item.id,
          title: item.newsTitle.replace(/^【(.*?)】/, ''),
          time: utils.formatDateTime(item.date),
          source: item.dept.trim(),
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
      loading: true,
    });
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },
  changeCategoryColumn(e) {
    const { column, value } = e.detail;

    if (column === 0) {
      this.calcCategory(value);
    }
  },
  changeCategory(e) {
    const { value } = e.detail;

    this.setData({
      'category.value': this.data.category.range[0][value[0]] + '-' + this.data.category.range[1][value[1]],
    });
    this.reset();
    this.loadNoticeList();
  },
});
