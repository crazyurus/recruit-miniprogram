import articleBehavior from '../../../behaviors/article';
import request from '../../../libs/request/scc';
import { getCDNURL, formatTimestamp } from '../../../libs/utils';

Page({
  behaviors: [articleBehavior],
  scrollTop: 60,
  data: {
    id: 0,
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
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: ' '
    });

    this.getDetail();
    this.getStatistics();
  },
  async getDetail() {
    const result = await request('/jobfair/detail', {
      id: this.options.id,
    }, false);

    this.icon = getCDNURL(result.image_id_src || '//s11.jiuyeb.cn/static/images/sxbanner2.png');
    this.setData({
      id: this.options.id,
      loading: false,
      article: {
        id: result.id,
        title: result.title,
        university: result.school_id_name,
        time: formatTimestamp(result.start_time) + ' 至 ' + formatTimestamp(result.end_time),
        poster: this.icon,
        view: result.view_count,
        content: result.remarks,
        source: '学生就业指导中心',
        telephone: result.phone,
      },
      'statistics.company': result.verify_count,
      'statistics.job': result.job_count,
      'statistics.recruit': result.recruit_count,
    });
  },
  async getStatistics() {
    const result = await request('/jobfair/online', {
      id: this.options.id,
    }, false);

    this.setData({
      'statistics.company': result.EnterpriseCount,
      'statistics.job': result.jobCount,
      'statistics.recruit': result.jobUserCount,
      'statistics.resume': result.resumeUserList.count,
      'statistics.invite': result.resumeUserListYy.yaoqingCount,
      'statistics.accept': result.resumeUserListYy.yixiangCount,
    });
  },
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.article.telephone,
    });
  },
});
