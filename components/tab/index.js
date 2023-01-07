Component({
  properties: {
    range: {
      type: Array,
      value: [],
    },
    value: {
      type: Number,
      value: 0,
    },
  },
  methods: {
    switchTab(e) {
      const { index } = e.currentTarget.dataset;

      this.triggerEvent('change', {
        value: index,
      });
    },
  },
});
