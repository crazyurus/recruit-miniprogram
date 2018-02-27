const app = getApp();
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
    app.getApiData('https://api.haitou.cc/xjh/list?client=wutnews' + 
      '&zone=' + this.data.city.id + 
      '&page=' + this.data.page + 
      '&kind=' + this.data.kind + 
      (this.data.university.id === 0 ? '' : '&univ=' + this.data.university.id) +
      (this.data.search.keyword.trim() == '' ? '' : '&key=' + this.data.search.keyword.trim())
    ).then(result => {
      const colorArray = ['ed9d81', 'a7d59a', '8c88ff', '56b8a4', '60bfd8', 'c9759d'];
      const univArray = require('../../data/university');

      wx.stopPullDownRefresh();

      if (result.length === 0) {
        if (this.data.kind === 'after') {
          this.data.page = 1;
          this.data.kind = 'before';
          this.data.loading = false;
          this.loadNoticeList();
        }
        return;
      }

      result.map((item, i) => {
        item.backgroundColor = colorArray[(i + this.data.left) % colorArray.length];
        item.universityName = item.univ_id === 0 ? item.universityShortName : univArray[item.univ_id - 1].name;
        item.remain = item.isExpired || item.is_cancel ? false : this.remain(item.holdtime);

        // 类别处理
        if (item.univ_id === 3) {
          let temp = item.title.match(/\((\S+?)\)/);
          if (temp && temp.length > 1) {
            item.category = temp[1];
            item.title = item.title.replace(`(${item.category})`, '');
          }
        }
      });

      this.data.loading = false;
      this.data.left += result.length % colorArray.length;
      this.data.page++;

      this.setData({
        list: this.data.list.concat(result)
      });
    });
  },
  changeFilterCity(e) {
    const index = e.detail.value;
    const zoneArray = require('../../data/zone');
    const univArray = require('../../data/university');

    const university = univArray.filter(item => {
      return item.zone === zoneArray[index].id;
    });

    university.unshift({
      id: 0,
      name: '全部学校'
    });

    const data = {
      city: {
        id: zoneArray[index].id,
        name: zoneArray[index].name,
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
        index
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
    const hold = new Date(Date.parse(time.split(' ')[0].replace(/-/g, '/') + ' 23:59:59')).getTime();
    return Math.ceil((hold - Date.now()) / 86400000);
  }
});
