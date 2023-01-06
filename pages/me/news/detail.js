const articleBehavior = require('../../../behaviors/article');
const request = require('../../../libs/request/app');
const { openDocument } = require('../../../libs/file');

Page({
  behaviors: [articleBehavior],
  scrollTop: 200,
  data: {
    domain: 'https://app1.whut.edu.cn/news_static/',
  },
  async onLoad(options) {
    const result = await request('/news/get', {
      id: options.id,
    }, false);
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
  },
  openAttachment(e) {
    const { url } = e.currentTarget.dataset;

    openDocument(url);
  },
});
