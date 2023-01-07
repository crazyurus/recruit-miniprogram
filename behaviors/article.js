import { selector as selectorBehavior, dispatch } from 'miniprogram-redux';

export default Behavior({
  behaviors: [selectorBehavior],
  selector(state, data) {
    if (state.article) {
      return {
        article: {
          ...data.article,
          ...state.article,
        },
      };
    }
  },
  data: {
    title: false,
    article: {},
    contentStyle: {
      a: 'color: #45c8dc',
    },
  },
  methods: {
    onPageScroll(e) {
      if (e.scrollTop <= this.scrollTop && this.data.title) {
        this.data.title = false;
        wx.setNavigationBarTitle({
          title: ' '
        });
      }
      if (e.scrollTop > this.scrollTop && !this.data.title) {
        this.data.title = true;
        wx.setNavigationBarTitle({
          title: this.data.article.title
        });
      }
    },
    onShareAppMessage() {
      return {
        title: this.data.article.title,
      };
    },
    onShareTimeline() {
      return this.onShareAppMessage();
    },
    onAddToFavorites() {
      return {
        title: this.data.article.title,
        imageUrl: this.icon,
      };
    },
    onUnload() {
      dispatch({
        type: 'CLEAR_ARTICLE',
      });
    },
  },
});
