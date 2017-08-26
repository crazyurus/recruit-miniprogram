var app = getApp();
Page({
  data: {
    list: [],
    page: 1,
    kind: 'after',
    loading: false
  },
  onLoad() {
    this.loadNoticeList();
  },
  onReachBottom() {
    this.loadNoticeList();
  },
  loadNoticeList() {
    if (this.data.loading) return;

    this.data.loading = true;
    app.getApiData('https://api.wutnews.net/recruit/haitou/xjh/list?client=wutnews&zone=wh&page=' + this.data.page + '&kind=' + this.data.kind, {}).then((result) => {
      const colorArray = ['ed9d81', 'a7d59a', '8c88ff', '56b8a4', '60bfd8', 'c9759d'];
      const univArray = require('../..//data/university');

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
        item.backgroundColor = colorArray[i % colorArray.length];
        item.universityName = item.univ_id == 0 ? item.universityShortName : univArray[item.univ_id - 1].name;
        item.remain = (!item.isExpired && !item.is_cancel) ? calc_remain(item.holdtime) : false;
      });

      console.log(result);

      this.data.loading = false;
      this.data.page++;

      this.setData({
        'list': this.data.list.concat(result)
      });
    });
  }
});

function calc_remain(time) {
  let hold = new Date(Date.parse(time.replace(/-/g, "/"))).getTime();
  return Math.ceil((hold - Date.now()) / 86400000);
}