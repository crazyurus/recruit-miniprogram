const axios = require('axios');
const adapter = require('axios-miniprogram-adapter');
const store = require('../store/index');
const { toast } = require('./ui');
const logger = require('./logger');

axios.defaults.adapter = adapter;

const instance = axios.create({
  baseURL: 'https://a.jiuyeb.cn/mobile.php',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Auth: 'Baisc MTAyNDY6MTAyNDY=',
  },
});

instance.interceptors.request.use(config => {
  const { school } = store.getState();

  Object.assign(config.data, {
    school_id: school.id,
    login_user_id: 1,
    login_admin_school_code: '',
    login_admin_school_id: school.id,
  });

  return config;
});

instance.interceptors.response.use(response => {
  if (response.status !== 200) {
    return Promise.reject('服务器错误 ' + result.status);
  }

  if (response.data.code === 0) {
    return response.data.data;
  }

  return Promise.reject(response.data.msg);
}, error => {
  return Promise.reject(error);
});

function request(url, data = {}, loading = true) {
  if (loading) wx.showNavigationBarLoading();
  return instance({
    url,
    data,
  }).catch(error => {
    logger.error('[Request] scc', url, error.message);
    toast(error.message);
  }).finally(() => {
    if (loading) wx.hideNavigationBarLoading();
  });
}

module.exports = request;
