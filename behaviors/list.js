module.exports = Behavior({
  lock: false,
  data: {
    list: [],
    page: 1,
    loading: true,
  },
  methods: {
    onLoad() {
      this.loadList();
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
    async loadList() {
      if (!this.data.loading || this.lock) {
        return;
      }

      this.lock = true;

      const { list, total } = await this.fetchData();
      const newList = this.data.list.concat(list);

      this.lock = false;

      this.setData({
        loading: list.length > 0 && newList.length < total,
        list: newList,
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
  },
});
