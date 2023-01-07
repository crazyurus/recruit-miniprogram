import { selector as selectorBehavior } from 'miniprogram-redux';

export default Behavior({
  behaviors: [selectorBehavior],
  selector(state) {
    return {
      school: state.school,
    };
  },
  methods: {
    onLoad() {
      this.school = {};
    },
    onShow() {
      if (this.school && this.school.id !== this.data.school.id) {
        if (this.reset) this.reset();
        if (this.loadList) this.loadList();

        this.school = this.data.school;
      }
    },
  },
});
