const request = require('../../library/request');
const ui = require('../../library/ui');
const utils = require('../../library/utils');

Page({
  data: {
    title: false,
    article: {},
    contentStyle: {
      a: 'color: #45c8dc',
    },
  },
  onLoad(options) {
    request('/Article/detail', {
      id: options.id,
      show_type: 2
    }, false).then(result => {
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
  async openAttachment(e) {
    const { url } = e.currentTarget.dataset;
    const hideLoading = ui.loading('下载中');

    try {
      const { tempFilePath } = await wx.promises.downloadFile({ url });
      await wx.promises.openDocument({
        filePath: tempFilePath,
        showMenu: true,
      });
    } catch (error) {
      ui.toast('打开失败');
    }

    hideLoading();
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
