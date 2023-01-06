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
    this.loadList();
    this.calcCategory(0);
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
  calcCategory(index) {
    this.setData({
      'category.range': [
        categories.map(item => item.label),
        categories[index].children.map(item => item.label),
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
      newsType: this.data.category.value,
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
      this.calcCategory(value);
    }
  },
  changeCategory(e) {
    const { value } = e.detail;

    this.setData({
      'category.value': this.data.category.range[0][value[0]] + '-' + this.data.category.range[1][value[1]],
    });
    this.reset();
    this.loadList();
  },
});
