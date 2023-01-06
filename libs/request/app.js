import { axios, createRequest, responseFailInterceptor } from './common';

const instance = axios.create({
  baseURL: 'https://app1.whut.edu.cn/information/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

instance.interceptors.response.use(response => {
  if (response.status !== 200) {
    return Promise.reject('服务器错误 ' + result.status);
  }

  if (response.data.code === 0) {
    if (typeof response.data.total === 'number' && Array.isArray(response.data.data)) {
      return {
        list: response.data.data,
        total: response.data.total,
      };
    }

    return response.data.data;
  }

  return Promise.reject(response.data.msg);
}, responseFailInterceptor);

export default createRequest(instance);
