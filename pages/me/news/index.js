const computedBehavior = require('miniprogram-computed').behavior;
const request = require('../../../libs/request/app');
const utils = require('../../../libs/utils');
const categories = require('../../../data/news');
const listBehavior = require('../../../behaviors/list');

Page({
  behaviors: [listBehavior, computedBehavior],
  data: {
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
  onReady() {
    this.calcCategory();
  },
  calcCategory() {
    this.setData({
      'category.range': [
        categories.map(item => item.label),
        categories[this.data.category.index[0]].children.map(item => item.label),
      ],
    });
  },
  async fetchData() {
    const result = await request('/news/listTitles', {
      pageNumber: this.data.page,
      pageSize: 10,
      newsType: this.data.categoryText,
    });

    this.data.page++;

    const list = result.list.map(item => {
      return {
        id: item.id,
        title: item.newsTitle.replace(/^【(.*?)】/, ''),
        time: utils.formatDateTime(item.date),
        source: item.dept.trim(),
      };
    });

    return {
      list,
      total: result.total,
    };
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
