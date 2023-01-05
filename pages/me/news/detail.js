const request = require('../../../libs/request/app');
const ui = require('../../../libs/ui');
const { openDocument } = require('../../../libs/file');
const utils = require('../../../libs/utils');

Page({
  data: {
    title: false,
    article: {},
    contentStyle: {
      a: 'color: #45c8dc',
    },
    domain: 'https://app1.whut.edu.cn/news_static/',
  },
  onLoad(options) {
    request('/news/get', {
      id: options.id,
    }, false).then(result => {
      const href = result.newsHref.split(',');
      const html = result.html.replace(/font/g, 'f');

      this.setData({
        article: {
          title: result.newsTitle,
          content: html.slice(html.indexOf('<div class=\"TRS_Editor\">'), html.indexOf('<div class=\"file_box\">')),
          attachments: (result.fileName.split(',') || []).map((item, index) => ({
            name: item,
            url: this.data.domain + href[index],
          })),
        },
      });
    });
  },
  onPageScroll(e) {
    if (e.scrollTop <= 200 && this.data.title) {
      this.data.title = false;
      wx.setNavigationBarTitle({
        title: ' '
      });
    }
    if (e.scrollTop > 200 && !this.data.title) {
      this.data.title = true;
      wx.setNavigationBarTitle({
        title: this.data.article.title
      });
    }
  },
  openAttachment(e) {
    const { url } = e.currentTarget.dataset;

    openDocument(url);
  },
  onShareAppMessage() {
    return {
      title: this.data.article.title,
      path: utils.sharePath(this),
      success() {
        ui.toast('分享成功', 'success');
      }
    };
  },
  onShareTimeline() {
    return {
      title: this.data.article.title,
    };
  },
});
