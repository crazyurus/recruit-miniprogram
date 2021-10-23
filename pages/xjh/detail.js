const dayjs = require('dayjs');
const app = getApp();

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
      source: '武汉理工大学学生就业指导中心',
      universityName: '武汉理工大学',
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

    app.request('https://a.jiuyeb.cn/mobile.php/preach/detail', {
      id: options.id,
    }, false).then(result => {
      this.setData({
        loading: false,
        article: {
          ...this.data.article,
          title: result.title,
          time: result.hold_date + ' ' + result.hold_starttime + '-' + result.hold_endtime,
          startTime: dayjs(result.hold_date + ' ' + result.hold_starttime + ':00').unix(),
          endTime: dayjs(result.hold_date + ' ' + result.hold_endtime + ':00').unix(),
          universityName: result.school_id_name,
          place: result.address || result.tmp_field_name || '空中宣讲会',
          view: result.viewcount,
          content: result.remarks,
          tips: result.schoolwarn,
          poster: result.haibao_id_src ? 'https:' + result.haibao_id_src.linkpath + '!y' : '',
        },
        positions: unique(result.ProfessionalList.map(item => item.professional_id_name)),
        company: {
          id: result.comInfo.id,
          name: result.comInfo.name,
          logo: result.comInfo.logo_src + '!y',
          description: (!result.comInfo.city_name || result.comInfo.city_name === '市辖区' ? result.comInfo.province_name : result.comInfo.city_name) + ' ' + result.comInfo.xingzhi_id_name + ' ' + result.comInfo.business_name,
          email: result.email,
        },
        isExpired: result.timestatus === 3,
        isQQ: app.isQQ
      });
    });
  },
  onCache() {
    if (app.globalData.article) {
      const { backgroundColor } = app.globalData.article;
      this.setData({
        backgroundColor,
        opacityColor: hexToRgba(backgroundColor, 0.6),
        article: {
          ...this.data.article,
          ...app.globalData.article,
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
    app.globalData.article = null;
  },
  onShareAppMessage() {
    return {
      title: this.data.article.title,
      path: app.sharePath(this),
      success() {
        app.toast('分享成功');
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
        app.toast('收藏成功');
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
    if (this.data.article.place === '空中宣讲会') {
      return;
    }
    app.address({
      name: this.data.article.universityName, 
      description: this.data.article.place,
      address: this.data.article.universityName + ',' + this.data.article.place,
    });
  },
  addToCalendar() {
    wx.addPhoneCalendar({
      title: this.data.article.title,
      description: '来自武汉理工大学就业招聘小程序',
      location: this.data.article.universityName + this.data.article.place,
      startTime: this.data.article.startTime,
      endTime: this.data.article.endTime,
      success() {
        app.toast('添加成功');
      },
    });
  },
  openPoster() {
    wx.previewImage({
      urls: [this.data.article.poster],
    })
  }
});
