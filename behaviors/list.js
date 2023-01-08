export default Behavior({
  lock: false,
  currentPage: 1,
  data: {
    list: [],
    loading: true,
  },
  methods: {
    onLoad() {
      this.currentPage = 1;
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
      this.currentPage = 1;
      this.setData({
        list: [],
        loading: true,
      });
      wx.pageScrollTo({
        scrollTop: 0,
      });
    },
  },
});
