import dayjs from 'dayjs';

function sharePath(page) {
  const query = Object.entries(page.options).map(([key, value]) => {
    return `${key}=${value}`;
  });

  return '/' + page.route + '?' + query.join('&');
}

function formatTimestamp(timestamp) {
  return dayjs(timestamp * 1000).format('YYYY-M-D');
}

function formatDateTime(dateTime) {
  return dayjs(dateTime).format('YYYY-M-D');
}

function openURL(url) {
  const hostname = url.split('/', 3)[2];

  if (hostname === 'mp.weixin.qq.com') {
    wx.openOfficialAccountArticle({
      url,
    });
  } else {
    wx.navigateToMiniProgram({
      appId: 'wx282fc9c4183b714c',
      path: '/pages/common/webview',
      extraData: {
        url,
        navigationBarBackgroundColor: "#45c8dc",
        navigationBarTextStyle: "white"
      }
    });
  }
}

function mailTo(email) {
  wx.navigateTo({
    url: '/pages/common/webview?url=mailto:' + email,
  });
}

function getCDNURL(url) {
  if (!url) return '';
  if (url.startsWith('//')) url = 'https:' + url;
  return url + '!y';
}

export {
  sharePath,
  formatTimestamp,
  formatDateTime,
  openURL,
  getCDNURL,
  mailTo,
};
