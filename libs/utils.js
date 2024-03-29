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
  wx.navigateTo({
    url: '/pages/common/webview?url=' + encodeURIComponent(url),
  });
}

function getCDNURL(url) {
  if (!url) return '';
  if (url.startsWith('//')) url = 'https:' + url;
  return url + '!y';
}

function isQQ() {
  return typeof qq !== 'undefined';
}

export {
  sharePath,
  formatTimestamp,
  formatDateTime,
  openURL,
  getCDNURL,
  isQQ,
};
