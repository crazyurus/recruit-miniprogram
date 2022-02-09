const { toast } = require('./ui');
const logger = require('./logger');

function request(url, data = {}, loading = true) {
  if (loading) wx.showNavigationBarLoading();
  return wx.promises.request({
    url: 'https://a.jiuyeb.cn/mobile.php' + url,
    method: 'POST',
    dataType: 'json',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Auth: 'Baisc MTAyNDY6MTAyNDY=',
    },
    data: {
      school_id: 'b525083d-b83c-4c7e-892f-29909421d961',
      login_user_id: 1,
      login_admin_school_code: '',
      login_admin_school_id: 'b525083d-b83c-4c7e-892f-29909421d961',
      ...data,
    }
  }).then(result => {
    if (result.statusCode !== 200) return Promise.reject('服务器错误 ' + result.statusCode);
    else if (result.data.code === 0) return result.data.data;
    else Promise.reject(result.msg);
  }, result => {
    return Promise.reject(result.errMsg);
  }).catch(error => {
    logger.error('[Request] scc', url, error);
    toast('网络错误');
  }).finally(() => {
    if (loading) wx.hideNavigationBarLoading();
  });
}

module.exports = request;
