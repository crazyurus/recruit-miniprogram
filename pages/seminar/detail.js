import dayjs from 'dayjs';
import articleBehavior from '../../behaviors/article';
import request from '../../libs/request/scc';
import { toast } from '../../libs/ui';
import { getAddress } from '../../libs/location';
import { getCDNURL, openURL } from '../../libs/utils';

function unique(arr) {
  return Array.from(new Set(arr));
}

function hexToRgba(color, opacity) {
  return "rgba(" + parseInt("0x" + color.slice(1, 3)) + "," + parseInt("0x" + color.slice(3, 5)) + "," + parseInt("0x" + color.slice(5, 7)) + "," + opacity + ")";
}

Page({
  behaviors: [articleBehavior],
  scrollTop: 60,
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
    isExpired: true,
    contentStyle: {
      a: 'color: #45c8dc',
    },
  },
  async onLoad(options) {
    wx.setNavigationBarTitle({
      title: ' '
    });
    this.onCache();

    const result = await request('/preach/detail', {
      id: options.id,
    }, false);

    this.icon = getCDNURL(result.comInfo.logo_src);
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
        poster: result.haibao_id_src ? getCDNURL(result.haibao_id_src.linkpath) : '',
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
        logo: this.icon,
        description: (!result.comInfo.city_name || result.comInfo.city_name === '市辖区' ? result.comInfo.province_name : result.comInfo.city_name) + ' ' + result.comInfo.xingzhi_id_name + ' ' + result.comInfo.business_name,
      },
      contact: {
        email: result.email,
        telephone: result.phone,
      },
      isExpired: result.timestatus === 3,
    });
  },
  onCache() {
    const { backgroundColor } = this.data.article;

    if (backgroundColor) {
      this.setData({
        backgroundColor,
        opacityColor: hexToRgba(backgroundColor, 0.6),
        contentStyle: {
          a: 'color: ' + backgroundColor,
        },
      });

      wx.setNavigationBarColor({
        backgroundColor,
        frontColor: '#ffffff'
      });
      wx.setBackgroundColor({
        backgroundColorTop: backgroundColor,
        backgroundColorBottom: '#efeff4',
      });
    }
  },
  showAddressMap() {
    if (this.data.article.address === '线上宣讲会') {
      return;
    }

    getAddress({
      name: this.data.article.university,
      description: this.data.article.address,
      address: this.data.article.university + ',' + this.data.article.address,
    });
  },
  addToCalendar() {
    wx.addPhoneCalendar({
      title: this.data.article.title,
      description: '来自校园宣讲汇小程序',
      location: this.data.article.university + this.data.article.address,
      startTime: this.data.article.timestamp.start,
      endTime: this.data.article.timestamp.end,
      success() {
        toast.success('添加成功');
      },
    });
  },
  openPoster() {
    wx.previewImage({
      urls: [this.data.article.poster],
    });
  },
  handleLink(e) {
    const { href } = e.detail;

    openURL(href);
  }
});
