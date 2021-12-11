Page({
  data: {
    calendarURL: 'https://sf3-cn.feishucdn.com/obj/eden-cn/eseh7nupevhps/calendar/calendar.jpg',
  },
  previewCalendar() {
    wx.previewImage({
      urls: [this.data.calendarURL],
    });
  }
})