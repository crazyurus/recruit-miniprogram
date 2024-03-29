import axios from 'axios';
import adapter from 'axios-miniprogram-adapter';
import { toast } from '../ui';

axios.defaults.adapter = adapter;

const responseSuccessInterceptor = response => {
  if (response.status !== 200) {
    return Promise.reject('服务器错误 ' + result.status);
  }

  if (response.data.code === 0) {
    return response.data.data;
  }

  return Promise.reject(response.data.msg);
};

const responseFailInterceptor = error => {
  return Promise.reject(error);
};

function createRequest(instance) {
  return function request(url, data = {}, loading = true) {
    if (loading) wx.showNavigationBarLoading();
    return instance({
      url,
      data,
    }).catch(error => {
      toast(error.message);
    }).finally(() => {
      if (loading) wx.hideNavigationBarLoading();
    });
  }
}

export {
  axios,
  createRequest,
  responseSuccessInterceptor,
  responseFailInterceptor,
};
