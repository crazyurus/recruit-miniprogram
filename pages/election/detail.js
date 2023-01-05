const request = require('../../libs/request/scc');
const ui = require('../../libs/ui');
const utils = require('../../libs/utils');
const store = require('../../store/index');

Page({
  data: {
    loading: true,
    article: {
      source: '学生就业指导中心',
      university: '',
    },
    statistics: {
      company: 0,
      job: 0,
      recruit: 0,
      resume: 0,
      invite: 0,
      accept: 0,
    },
    company: [],
    title: false,
    contentStyle: {
      a: 'color: #45c8dc',
    },
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: ' '
    });

    this.getDetail();
    this.getStatistics();
  },
  onReady() {
    const { article } = store.getState();
    const { statistics, ...item } = article;

    if (article) {
      this.setData({
        article: {
          ...this.data.article,
          ...item,
        },
        statistics: {
          ...this.data.statistics,
          ...statistics,
        },
      });
    }
  },
  getDetail() {
    request('/jobfair/detail', {
      id: this.options.id,
    }, false).then(result => {
      this.setData({
        loading: false,
        article: {
          id: result.id,
          title: result.title,
          university: result.school_id_name,
          time: utils.formatTimestamp(result.start_time) + ' 至 ' + utils.formatTimestamp(result.end_time),
          poster: utils.getCDNURL(result.image_id_src || '//s11.jiuyeb.cn/static/images/sxbanner2.png'),
          view: result.view_count,
          content: result.remarks,
          source: '学生就业指导中心',
          telephone: result.phone,
        },
        'statistics.company': result.verify_count,
        'statistics.job': result.job_count,
        'statistics.recruit': result.recruit_count,
      });
    });
  },
  getStatistics() {
    request('/jobfair/online', {
      id: this.options.id,
    }, false).then(result => {
      this.setData({
        'statistics.company': result.EnterpriseCount,
        'statistics.job': result.jobCount,
        'statistics.recruit': result.jobUserCount,
        'statistics.resume': result.resumeUserList.count,
        'statistics.invite': result.resumeUserListYy.yaoqingCount,
        'statistics.accept': result.resumeUserListYy.yixiangCount,
      });
    });
  },
  onUnload() {
    store.dispatch({
      type: 'CLEAR_ARTICLE',
    });
  },
  onShareAppMessage() {
    return {
      title: this.data.article.title,
      imageUrl: this.data.article.poster,
      path: utils.sharePath(this),
      success() {
        ui.toast('分享成功', 'success');
      }
    };
  },
  onShareTimeline() {
    return {
      title: this.data.article.title,
      imageUrl: this.data.article.poster,
    };
  },
  onAddToFavorites() {
    return {
      title: this.data.article.title,
      imageUrl: this.data.article.poster,
      success() {
        ui.toast('收藏成功', 'success');
      }
    };
  },
  onPageScroll(e) {
    if (e.scrollTop <= 60 && this.data.title) {
      this.data.title = false;
      wx.setNavigationBarTitle({
        title: ' '
      });
    }
    if (e.scrollTop > 60 && !this.data.title) {
      this.data.title = true;
      wx.setNavigationBarTitle({
        title: this.data.article.title
      });
    }
  },
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.article.telephone,
    });
  },
});
