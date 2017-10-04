var app = getApp();
Page({
  data: {
    list: [],
    page: 1,
    kind: 'after',
    loading: false,
    city: {
      index: 3,
      id: 'wh',
      name: '湖北'
    },
    university: {
      index: 3,
      id: 3,
      name: '武汉理工大学'
    },
    picker: {
      city: [],
      university: []
    },
    left: 0
  },
  onLoad() {
    const zoneArray = require('../../data/zone');
    this.setData({
      'picker.city': zoneArray
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
    app.getApiData('https://api.haitou.cc/xjh/list?client=wutnews&zone=' + this.data.city.id + '&page=' + this.data.page + '&kind=' + this.data.kind + (this.data.university.id == 0 ? '' : '&univ=' + this.data.university.id)).then((result) => {
      const colorArray = ['ed9d81', 'a7d59a', '8c88ff', '56b8a4', '60bfd8', 'c9759d'];
      const univArray = require('../../data/university');

      wx.stopPullDownRefresh();

      if (result.length == 0) {
        if (this.data.kind == 'after') {
          this.data.page = 1;
          this.data.kind = 'before';
          this.data.loading = false;
          this.loadNoticeList();
        }
        return;
      }

      result.map((item, i) => {
        item.backgroundColor = colorArray[(i + this.data.left) % colorArray.length];
        item.universityName = item.univ_id == 0 ? item.universityShortName : univArray[item.univ_id - 1].name;
        item.remain = (!item.isExpired && !item.is_cancel) ? calc_remain(item.holdtime) : false;
      });

      this.data.loading = false;
      this.data.left += result.length % colorArray.length;
      this.data.page++;

      this.setData({
        'list': this.data.list.concat(result)
      });
    });
  },
  changeFilterCity(e) {
    let index = e.detail.value;
    const zoneArray = require('../../data/zone');
    const univArray = require('../../data/university');

    let university = univArray.filter((item) => {
      return item.zone == zoneArray[index].id;
    });

    university.unshift({
      id: 0,
      name: '全部学校'
    });

    let data = {
      city: {
        id: zoneArray[index].id,
        name: zoneArray[index].name,
        index: index
      },
      'picker.university': university
    };

    if (!e.detail.flag) data['university'] = {
      index: 0,
      id: 0,
      name: '全部学校'
    }

    this.setData(data);
    this.reset();
    this.loadNoticeList();
  },
  changeFilterUniversity(e) {
    let index = e.detail.value;
    const univArray = this.data.picker.university;

    this.setData({
      university: {
        id: univArray[index].id,
        name: univArray[index].name,
        index: index
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
  }
});

function calc_remain(time) {
  let hold = new Date(Date.parse(time.split(' ')[0].replace(/-/g, "/") + ' 23:59:59')).getTime();
  return Math.ceil((hold - Date.now()) / 86400000);
}