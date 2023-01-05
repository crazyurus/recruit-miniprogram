const dayjs = require('dayjs');
const request = require('../../library/request/scc');
const ui = require('../../library/ui');
const location = require('../../library/location');
const utils = require('../../library/utils');
const store = require('../../store/index');

function unique(arr) {
  return Array.from(new Set(arr));
}

function hexToRgba(color, opacity) {
  return "rgba(" + parseInt("0x" + color.slice(1, 3)) + "," + parseInt("0x" + color.slice(3, 5)) + "," + parseInt("0x" + color.slice(5, 7)) + "," + opacity + ")";
}

Page({
  data: {
    backgroundColor: '#45c8dc',
    opacityColor: 'rgba(69,200,220,0.6)',
    loading: true,
    article: {
      source: '学生就业指导中心',
      university: '',
    },
    company: {},
    positions: [],
    title: false,
    isExpired: true,
    isQQ: false,
    contentStyle: {
      a: 'color: #45c8dc',
    },
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: ' '
    });
    this.onCache();

    request('/preach/detail', {
      id: options.id,
    }, false).then(result => {
      this.setData({
        loading: false,
        article: {
          id: result.id,
          title: result.title,
          university: result.school_id_name,
          address: result.address || result.tmp_field_name || '线上宣讲会',
          view: result.viewcount,
          content: result.remarks,
          tips: result.schoolwarn,
          poster: result.haibao_id_src ? utils.getCDNURL(result.haibao_id_src.linkpath) : '',
          time: result.hold_date + ' ' + result.hold_starttime + '-' + result.hold_endtime,
          timestamp: {
            start: dayjs(result.hold_date + ' ' + result.hold_starttime + ':00').unix(),
            end: dayjs(result.hold_date + ' ' + result.hold_endtime + ':00').unix(),
          },
          source: '学生就业指导中心',
        },
        positions: unique(result.ProfessionalList.map(item => item.professional_id_name)),
        company: {
          id: result.comInfo.id,
          name: result.comInfo.name,
          logo: utils.getCDNURL(result.comInfo.logo_src),
          description: (!result.comInfo.city_name || result.comInfo.city_name === '市辖区' ? result.comInfo.province_name : result.comInfo.city_name) + ' ' + result.comInfo.xingzhi_id_name + ' ' + result.comInfo.business_name,
        },
        contact: {
          email: result.email,
          telephone: result.phone,
        },
        isExpired: result.timestatus === 3,
        isQQ: utils.isQQ
      });
    });
  },
  onCache() {
    const { article } = store.getState();

    if (article) {
      const { backgroundColor } = article;
      this.setData({
        backgroundColor,
        opacityColor: hexToRgba(backgroundColor, 0.6),
        article: {
          ...this.data.article,
          ...article,
        },
        contentStyle: {
          a: 'color: ' + backgroundColor,
        },
      });
      wx.setNavigationBarColor({
        backgroundColor,
        frontColor: '#ffffff'
      });
      setTimeout(() => {
        wx.setBackgroundColor({
          backgroundColorTop: backgroundColor,
          backgroundColorBottom: '#efeff4',
        });
      }, 300);
    }
  },
  onUnload() {
    store.dispatch({
      type: 'CLEAR_ARTICLE',
    });
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
      imageUrl: this.data.company.logo,
    };
  },
  onAddToFavorites() {
    return {
      title: this.data.article.title,
      imageUrl: this.data.company.logo,
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
  showAddressMap() {
    if (this.data.article.address === '线上宣讲会') {
      return;
    }
    location.getAddress({
      name: this.data.article.university,
      description: this.data.article.address,
      address: this.data.article.university + ',' + this.data.article.address,
    });
  },
  addToCalendar() {
    wx.addPhoneCalendar({
      title: this.data.article.title,
      description: '来自就业招聘小程序',
      location: this.data.article.university + this.data.article.address,
      startTime: this.data.article.timestamp.start,
      endTime: this.data.article.timestamp.end,
      success() {
        ui.toast('添加成功', 'success');
      },
    });
  },
  openPoster() {
    wx.previewImage({
      urls: [this.data.article.poster],
    })
  }
});
