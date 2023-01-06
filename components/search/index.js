Component({
  properties: {
    placeholder: {
      type: String,
      value: '搜索',
    },
  },
  data: {
    showCancelButton: false,
    deviceWidth: wx.getSystemInfoSync().windowWidth,
  },
  methods: {
    setSearchFocus() {
      this.setData({
        showCancelButton: true,
      });
    },
    lostSearchFocus() {
      this.setData({
        showCancelButton: false,
      });
    },
    onSearch(e) {
      const { value } = e.detail;

      this.triggerEvent('search', { value });
    },
  },
});
