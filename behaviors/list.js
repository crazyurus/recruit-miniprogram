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
      const startIndex = this.data.list.length;
      const newList = {};

      if (startIndex === 0) {
        newList.list = list;
      } else {
        list.forEach((item, index) => {
          const key = `list[${startIndex + index}]`;

          newList[key] = item;
        });
      }

      this.lock = false;

      this.setData({
        loading: list.length > 0 && (list.length + startIndex) < total,
        ...newList,
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

      if (typeof this.customReset === 'function') {
        this.customReset();
      }
    },
  },
});
