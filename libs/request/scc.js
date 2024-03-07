import store from '../../store/index';
import { axios, createRequest, responseSuccessInterceptor, responseFailInterceptor } from './common';
import { WUTSchoolID } from '../../data/const';

const instance = axios.create({
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

  config.baseURL = schoolID === WUTSchoolID ? 'https://scc.whut.edu.cn/mobile.php' : 'https://a.jiuyeb.cn/mobile.php';

  return config;
});

instance.interceptors.response.use(responseSuccessInterceptor, responseFailInterceptor);

export default createRequest(instance);
