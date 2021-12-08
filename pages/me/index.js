const app = getApp();

Page({
  data: {
    list: [
      {
        name: '就业指导',
        children: [
          {
            name: '求职攻略',
            url: app.isQQ ? '' : 'https://mp.weixin.qq.com/mp/homepage?__biz=MjM5MjgwMDkzNQ==&hid=13&sn=bb51034acd78f19ae7a5e67ffe34ebab&scene=18',
          },
          {
            name: '职业咨询',
            url: 'https://mp.weixin.qq.com/mp/homepage?__biz=MjM5MjgwMDkzNQ==&hid=13&sn=bb51034acd78f19ae7a5e67ffe34ebab&scene=18',
          }
        ]
      },
      {
        name: '就业资讯',
        children: [
          {
            name: '军队文职招聘',
            url: app.isQQ ? '' : 'https://mp.weixin.qq.com/mp/homepage?__biz=MjM5MjgwMDkzNQ==&hid=13&sn=bb51034acd78f19ae7a5e67ffe34ebab&scene=18',
          },
          {
            name: '国际组织实习',
            url: 'https://mp.weixin.qq.com/mp/homepage?__biz=MjM5MjgwMDkzNQ==&hid=13&sn=bb51034acd78f19ae7a5e67ffe34ebab&scene=18',
          },
          {
            name: '就业服务清单',
            url: 'https://mp.weixin.qq.com/mp/homepage?__biz=MjM5MjgwMDkzNQ==&hid=13&sn=bb51034acd78f19ae7a5e67ffe34ebab&scene=18',
          },
          {
            name: '企业介绍',
            url: 'https://mp.weixin.qq.com/mp/homepage?__biz=MjM5MjgwMDkzNQ==&hid=13&sn=bb51034acd78f19ae7a5e67ffe34ebab&scene=18',
          }
        ]
      },
      {
        name: '企业服务',
        children: [
          {
            name: '毕业生生源',
            url: 'https://mp.weixin.qq.com/s/iTGigDYwZAAcC3cLwl4fDw',
          },
          {
            name: '帮推须知',
            url: 'https://mp.weixin.qq.com/s/sWw23DzbA_jbIrxhHwlbRw',
          }
        ]
      },
    ]
  },
  openUrl(e) {
    const { url } = e.currentTarget.dataset;

    wx.navigateTo({
      url: '/pages/common/webview?url=' + encodeURIComponent(url),
    })
  },
})