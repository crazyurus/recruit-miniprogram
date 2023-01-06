const store = require('../store/index');
const listBehavior = require('./list');

module.exports = Behavior({
  behaviors: [listBehavior],
  data: {
    school: {},
  },
  methods: {
    onLoad() {},
    onShow() {
      const { school } = store.getState();

      if (school.id !== this.data.school.id) {
        this.reset();
        this.loadList();
        this.setData({
          school,
        });
      }
    },
  },
});
