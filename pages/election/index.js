import { dispatch } from 'miniprogram-redux';
import schoolBehavior from '../../behaviors/school';
import listBehavior from '../../behaviors/list';
import request from '../../libs/request/scc';
import { getCDNURL, formatTimestamp, openURL } from '../../libs/utils';

Page({
  behaviors: [listBehavior, schoolBehavior],
  data: {
    carousel: [],
  },
  onShow() {
    if (this.school.id !== this.data.school.id) {
      this.loadCarousel();
      this.loadList();
      this.school = this.data.school;
    }
  },
  async loadCarousel() {
    const result = await request('/phone/index', {
      cate_id: 2,
      show_type: 2
    })
    const list = result.lunbo.list.map((item, i) => {
      return {
        id: item.id,
        image: getCDNURL(item.pic_url_name),
        link: item.link,
      };
    });

    this.setData({
      carousel: list,
    });
  },
  async loadList() {
    const result = await request('/jobfair/getlist', {
      page: this.data.page,
      size: 1000,
      isunion: 2,
      laiyuan: 0,
      keywords: '',
      type: 3,
    });
    const list = result.list.map((item, i) => {
      return {
        id: item.id,
        title: item.title,
        university: item.school_id_name,
        poster: getCDNURL(item.image_id_src || '//s11.jiuyeb.cn/static/images/sxbanner2.png'),
        view: item.view_count,
        time: formatTimestamp(item.start_time) + ' 至 ' + formatTimestamp(item.end_time),
        statistics: {
          company: item.verify_count,
          job: item.job_count,
          recruit: item.recruit_count,
        },
        isExpired: item.status_id === 3,
        isInProgress: item.status_id === 1,
      };
    });

    this.setData({
      list,
    });
  },
  openCarousel(e) {
    const { link } = e.currentTarget.dataset;

    openURL(link);
  },
  openDetail(e) {
    const { index } = e.currentTarget.dataset;
    const item = this.data.list[index];

    dispatch({
      type: 'SET_ARTICLE',
      payload: item,
    });
  },
});
