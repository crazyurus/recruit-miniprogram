const app = getApp();
Page({
  data: {
    article: {},
  },
  onLoad(options) {
    app.getApiData(`https://api.haitou.cc/mjfx/view?client=m&encrypt=0&id=${options.id}`, {}, false).then((result) => {
      const position = [];

      for (const category of result.workCategorys) {
        position.push(category.name);
      }

      result.position = position.join(' ');
      result.info = result.info.replace(/(&ldquo;|&rdquo)/g, '"').replace(/&times;/g, '×').replace(/(&lsquo;|&rsquo;)/g, "'").replace('/&(.[2,6]);', '');

      this.setData({
        article: result,
      });
    });
  },
  onShareAppMessage(res) {
    return {
      title: this.data.article.title,
      path: `/pages/interview/detail?id=${this.data.article.id}`,
      imageUrl: this.data.article.image,
      success(res) {
        wx.showToast({
          title: '分享成功',
        });
      },
    };
  },
});
