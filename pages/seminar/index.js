const dayjs = require('dayjs');
const request = require('../../libs/request/scc');
const store = require('../../store/index');
const schoolBehavior = require('../../behaviors/school');

Page({
  behaviors: [schoolBehavior],
  data: {
    left: 0,
    calendar: {},
  },
  onLoad() {
    this.calcCalendar();
  },
  calcCalendar() {
    const now = dayjs();
    const weekday = now.day();
    const weekCount = 12;
    const dates = new Array(weekCount * 2 - 1);
    let group = 0;

    for (let i = 0; i < dates.length; i++) {
      dates[i] = [];
    }

    for (let i = (weekCount - 1) * -7; i < weekCount * 7; i++) {
      const isToday = i - (weekday + 6) % 7;
      const day = now.add(isToday, 'day');

      if (dates[group].length === 7) {
        group++;
      }

      dates[group].push({
        display: isToday === 0 ? '今' : day.date(),
        value: day.valueOf(),
      });
    }

    this.setData({
      calendar: {
        list: dates,
        current: weekday === 0 ? 6 : weekday - 1,
        group: weekCount - 1,
        today: now.format('M 月 D 日')
      },
    });
  },
  async fetchData() {
    const result = await request('/preach/getlist', {
      page: this.data.page,
      size: 10,
      isunion: 2,
      laiyuan: 0,
      keywords: '',
      hold_date: this.data.calendar.current === 7 ? '' : dayjs(this.data.calendar.list[this.data.calendar.group][this.data.calendar.current].value).format('YYYY-M-D'),
    });
    const colorArray = ['#ed9d81', '#a7d59a', '#8c88ff', '#56b8a4', '#60bfd8', '#c9759d'];
    const list = result.list.map((item, i) => {
      return {
        id: item.id,
        title: item.title,
        company: item.com_id_name,
        backgroundColor: colorArray[(i + this.data.left) % colorArray.length],
        university: item.school_id_name,
        address: item.address || item.tmp_field_name || '线上宣讲会',
        view: item.viewcount,
        time: item.hold_date + ' ' + item.hold_starttime + '-' + item.hold_endtime,
        isExpired: item.timestatus === 3,
        isCancel: item.publish_status === 2,
        isOfficial: item.istop === 1,
        isInProgress: item.timestatus === 1,
      };
    });

    this.data.left += list.length % colorArray.length;
    this.data.page++;

    return {
      loading: list.length > 0 && this.data.page <= result.allpage,
      list,
      total: result.count,
    };
  },
  changeDay(e) {
    const { index, group } = e.currentTarget.dataset;
    const now = dayjs(this.data.calendar.list[group][index].value);

    this.reset();
    this.setData({
      'calendar.current': index,
      'calendar.group': group,
      'calendar.today': now.format('M 月 D 日'),
    });
    this.loadList();
  },
  onCalendarChange(e) {
    const { current } = e.detail;
    const day = this.data.calendar.list[current][0].value;
    const month = dayjs(day).month() + 1;

    wx.setNavigationBarTitle({
      title: month + ' 月',
    })
  },
  openDetail(e) {
    const { index } = e.currentTarget.dataset;
    const item = this.data.list[index];

    store.dispatch({
      type: 'SET_ARTICLE',
      payload: {
        id: item.id,
        title: item.title,
        time: item.time,
        address: item.address,
        university: item.university,
        backgroundColor: item.backgroundColor,
      },
    });
  },
  showMore() {
    this.reset();
    this.setData({
      'calendar.current': 7,
    });
    this.loadList();
  },
});
