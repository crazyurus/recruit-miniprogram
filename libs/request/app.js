const { axios, createRequest, responseSuccessInterceptor, responseFailInterceptor } = require('./common');

const instance = axios.create({
  baseURL: 'https://app1.whut.edu.cn/information/news/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

instance.interceptors.response.use(responseSuccessInterceptor, responseFailInterceptor);

module.exports = createRequest(instance);
