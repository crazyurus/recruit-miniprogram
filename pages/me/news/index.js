const computedBehavior = require('miniprogram-computed').behavior;
const request = require('../../../libs/request/app');
const utils = require('../../../libs/utils');
const categories = require('../../../data/news');

Page({
  behaviors: [computedBehavior],
  data: {
    list: [],
    page: 1,
    loading: true,
    category: {
      first: true,
      index: [0, 0],
      range: [[], []],
    },
  },
  computed: {
    categoryText(data) {
      if (data.category.first) {
        return '';
      }

      return data.category.range[0][data.category.index[0]] + '-' + data.category.range[1][data.category.index[1]];
    },
  },
  onLoad() {
    this.loadList();
    this.calcCategory();
  },
  onReachBottom() {
    this.loadList();
  },
  onPullDownRefresh() {
    this.reset();
    this.loadList().then(() => {
      wx.stopPullDownRefresh();
    });
  },
  calcCategory() {
    this.setData({
      'category.range': [
        categories.map(item => item.label),
        categories[this.data.category.index[0]].children.map(item => item.label),
      ],
    });
  },
  loadList() {
    if (!this.data.loading) {
      return;
    }

    return request('/news/listTitles', {
      pageNumber: this.data.page,
      pageSize: 10,
      newsType: this.data.categoryText,
    }).then(result => {
      this.data.page++;

      const list = result.list.map(item => {
        return {
          id: item.id,
          title: item.newsTitle.replace(/^【(.*?)】/, ''),
          time: utils.formatDateTime(item.date),
          source: item.dept.trim(),
        };
      });

      this.setData({
        loading: list.length > 0 && this.data.list.length <= result.total,
        list: this.data.list.concat(list),
      });
    });
  },
  reset() {
    this.setData({
      list: [],
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
      this.setData({
        'category.index[0]': value,
      });
      this.calcCategory();
    }
  },
  changeCategory(e) {
    const { value } = e.detail;

    this.setData({
      'category.first': false,
      'category.index': value,
    });
    this.reset();
    this.loadList();
  },
});
