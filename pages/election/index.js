const request = require('../../library/request');
const { getCDNURL, formatTimestamp, openURL } = require('../../library/utils');

Page({
  data: {
    list: [],
    carousel: [],
  },
  onLoad() {
    this.loadList();
    this.loadCarousel();
  },
  loadCarousel() {
    request('/phone/index', {
      cate_id: 2,
      show_type: 2
    }).then(result => {
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
    });
  },
  loadList() {
    request('/jobfair/getlist', {
      page: 1,
      size: 1000,
      isunion: 2,
      laiyuan: 0,
      keywords: '',
      type: 3,
    }).then(result => {
      const list = result.list.map((item, i) => {
        return {
          id: item.id,
          title: item.title,
          university: item.school_id_name,
          backgroundImage: getCDNURL(item.image_id_src || '//s11.jiuyeb.cn/static/images/sxbanner2.png'),
          view: item.view_count,
          time: formatTimestamp(item.start_time) + ' 至 ' + formatTimestamp(item.end_time),
          statistics: {
            company: item.verify_count,
            enroll: item.enroll_count,
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
    });
  },
  openCarousel(e) {
    const { link } = e.currentTarget.dataset;

    openURL(link);
  }
});
