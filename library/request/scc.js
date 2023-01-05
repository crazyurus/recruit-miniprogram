const store = require('../../store/index');
const { axios, createRequest, responseSuccessInterceptor, responseFailInterceptor } = require('./common');

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
  const schoolID = config.url === '/School/getlistName' ? '' : school.id;

  Object.assign(config.data, {
    school_id: schoolID,
    login_user_id: 1,
    login_admin_school_code: '',
    login_admin_school_id: schoolID,
  });

  return config;
});

instance.interceptors.response.use(responseSuccessInterceptor, responseFailInterceptor);

module.exports = createRequest(instance);
