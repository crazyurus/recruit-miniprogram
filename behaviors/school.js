import store from '../store/index';
import listBehavior from './list';

export default Behavior({
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
