import { dispatch } from 'miniprogram-redux';
import schoolBehavior from '../../../behaviors/school';
import request from '../../../libs/request/scc';

Page({
  behaviors: [schoolBehavior],
  data: {
    list: [],
    search: '',
  },
  onLoad() {
    this.loadList();
  },
  async loadList() {
    const result = await request('/School/getlistName', {
      is_vip: 1,
    });
    const list = result.list.filter(item => item.id !== '03697650-72ef-d353-1e69-b4c86f150f54');

    this.setData({
      originList: list,
      list,
    });
  },
  search(e) {
    this.setData({
      list: this.data.originList.filter(school => school.name.includes(e.detail.value)),
      search: {
        show: false,
        keyword: e.detail.value,
      },
    });
  },
  choose(e) {
    const { id } = e.currentTarget.dataset;
    const school = this.data.originList.find(school => school.id === id);

    dispatch({
      type: 'SET_SCHOOL',
      payload: school,
    });

    wx.navigateBack();
  },
});
