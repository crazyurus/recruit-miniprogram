Component({
  properties: {
    range: {
      type: Object,
      value: {}
    },
    value: {
      type: Array,
      value: []
    }
  },
  methods: {
    change(e) {
      this.triggerEvent('change', e.detail);
    }
  }
})