const app = getApp();
Page({
  data: {
    list: [],
    page: 1,
    loading: false,
    city: {
      index: 3,
      id: 'wh',
      name: '湖北'
    },
    university: {
      short: 'wut',
      id: 3,
      name: '武汉理工大学'
    },
    picker: {
      city: [],
      university: []
    },
    search: {
      show: false,
      keyword: ''
    },
    device: {},
    left: 0
  },
  onLoad() {
    const zoneArray = require('../../data/zone');
    this.setData({
      'picker.city': zoneArray,
      device: wx.getSystemInfoSync()
    });
    this.changeFilterCity({
      detail: {
        value: this.data.city.index,
        flag: true
      }
    });
  },
  onReachBottom() {
    this.loadNoticeList();
  },
  onPullDownRefresh() {
    this.reset();
    this.loadNoticeList();
  },
  loadNoticeList() {
    if (this.data.loading) return;

    this.data.loading = true;
    app.getApiData(`https://api-iwut.wutnews.net/recruit/recruit/${this.data.search.keyword ? 'search_recruit' : 'get_recruit'}`, {
      page: this.data.page,
      order_type: 'time',
      source: this.data.university.short,
      keyword: this.data.search.keyword,
    }).then(result => {
      const colorArray = ['ed9d81', 'a7d59a', '8c88ff', '56b8a4', '60bfd8', 'c9759d'];
      const univArray = require('../../data/university');

      wx.stopPullDownRefresh();
      if (result.length === 0) return;

      result.forEach((item, i) => {
        item.backgroundColor = colorArray[(i + this.data.left) % colorArray.length];
        item.university = univArray.find(u => u.short === item.source);
        item.universityName = item.university ? item.university.name : item.source;
        item.remain = this.remain(item.time);
        item.time = new Date(item.time * 1000).toLocaleString();
      });

      this.data.loading = false;
      this.data.left += result.length % colorArray.length;
      this.data.page++;

      this.setData({
        list: this.data.list.concat(result)
      });
    }).catch(msg => {
      console.log(msg);
    });
  },
  changeFilterCity(e) {
    const index = e.detail.value;
    const zoneArray = require('../../data/zone');
    const university = require('../../data/university');

    university.unshift({
      id: 0,
      name: '全部学校'
    });

    const data = {
      city: {
        id: zoneArray[0].id,
        name: zoneArray[0].name,
        index
      },
      'picker.university': university
    };

    if (!e.detail.flag) {
      data.university = {
        index: 0,
        id: 0,
        name: '全部学校'
      };
    }

    this.setData(data);
    this.reset();
    this.loadNoticeList();
  },
  changeFilterUniversity(e) {
    const index = e.detail.value;
    const univArray = this.data.picker.university;

    this.setData({
      university: {
        id: univArray[index].id,
        name: univArray[index].name,
        short: univArray[index].short || ''
      }
    });

    this.reset();
    this.loadNoticeList();
  },
  reset() {
    this.data.list = [];
    this.setData({
      page: 1,
      kind: 'after',
      loading: false,
      left: 0
    });
  },
  searchNoticeList(e) {
    this.reset();
    this.setData({
      search: {
        show: false,
        keyword: e.detail.value
      }
    });
    this.loadNoticeList();
  },
  setSearchFocus() {
    this.setData({
      'search.show': true
    });
  },
  lostSearchFocus() {
    this.setData({
      'search.show': false
    });
  },
  remain(time) {
    const hold = new Date(time * 1000).getTime();
    return Math.ceil((hold - Date.now()) / 86400000);
  }
});
