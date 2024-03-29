import * as cheerio from 'miniprogram-cheerio';
import articleBehavior from '../../../behaviors/article';
import request from '../../../libs/request/app';
import { openDocument } from '../../../libs/file';

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
    const $ = cheerio.load(html);

    this.setData({
      article: {
        title: result.newsTitle,
        content: $('.TRS_Editor').html(),
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
