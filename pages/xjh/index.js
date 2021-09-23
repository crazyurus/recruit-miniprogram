const app = getApp();
Page({
  data: {
    list: [],
    page: 1,
    loading: false,
    search: {
      show: false,
      keyword: ''
    },
    device: {},
    left: 0
  },
  onLoad() {
    this.loadNoticeList();
    this.setData({
      device: wx.getSystemInfoSync()
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
    app.request('https://a.jiuyeb.cn/mobile.php/preach/getlist', {
      page: this.data.page,
      size: 10,
      isunion: 2,
      laiyuan: 0,
      isair: 3,
      keywords: this.data.search.keyword,
    }).then(result => {
      const colorArray = ['ed9d81', 'a7d59a', '8c88ff', '56b8a4', '60bfd8', 'c9759d'];

      wx.stopPullDownRefresh();
      if (result.length === 0) return;

      const list = result.list.map((item, i) => {
        return {
          id: item.id,
          title: item.title,
          company: item.com_id_name,
          backgroundColor: colorArray[(i + this.data.left) % colorArray.length],
          universityName: item.school_id_name,
          place: item.address || item.tmp_field_name,
          view: item.viewcount,
          time: item.hold_date + ' ' + item.hold_starttime + '-' + item.hold_endtime,
          isExpired: item.timestatus === 3,
          isCancel: item.publish_status === 2,
          isOfficial: item.istop === 1,
          isInProgress: item.timestatus === 1,
        };
      });

      this.data.loading = false;
      this.data.left += list.length % colorArray.length;
      this.data.page++;

      this.setData({
        list: this.data.list.concat(list)
      });
    });
  },
  reset() {
    this.data.list = [];
    this.setData({
      page: 1,
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
});
