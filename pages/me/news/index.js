import { behavior as computedBehavior } from 'miniprogram-computed';
import request from '../../../libs/request/app';
import { formatDateTime } from '../../../libs/utils';
import categories from '../../../data/news';
import listBehavior from '../../../behaviors/list';

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
    const list = result.list.map(item => {
      return {
        id: item.id,
        title: item.newsTitle.replace(/^【(.*?)】/, ''),
        time: formatDateTime(item.date),
        source: item.dept.trim(),
      };
    });

    this.data.page++;

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
