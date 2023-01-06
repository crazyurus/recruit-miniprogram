import articleBehavior from '../../behaviors/article';
import request from '../../libs/request/scc';
import { openDocument } from '../../libs/file';

Page({
  behaviors: [articleBehavior],
  scrollTop: 200,
  async onLoad(options) {
    const result = await request('/Article/detail', {
      id: options.id,
      show_type: 2
    }, false);

    this.setData({
      article: {
        title: result.title,
        content: result.content.replace(/font/g, 'f'),
        attachments: (result.attInfo || []).map(item => ({
          name: item.fujian_des,
          url: 'https:' + item.fujian_name,
        })),
      },
    });
  },
  openAttachment(e) {
    const { url } = e.currentTarget.dataset;

    openDocument(url);
  },
});
