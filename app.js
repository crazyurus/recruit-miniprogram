const dayjs = require('dayjs');

App({
  globalData: {},
  onLaunch() {
    const updateManager = wx.getUpdateManager();
    this.logger = wx.getRealtimeLogManager();

    updateManager.onUpdateReady(async () => {
      const result = await this.confirm('新版本已经准备好，是否重启应用？');

      if (result.confirm) {
        updateManager.applyUpdate()
      }
    });

    this.request.scc = this.request.scc.bind(this);
    this.request.iwut = this.request.iwut.bind(this);
  },
  request: {
    scc(url, data = {}, loading = true) {
      if (loading) wx.showNavigationBarLoading();
      return new Promise(((resolve, reject) => {
        wx.request({
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
          },
          success(result) {
            if (result.statusCode !== 200) reject('服务器错误 ' + result.statusCode);
            else if (result.data.code === 0) resolve(result.data.data);
            else reject(result.msg);
          },
          fail(result) {
            if (reject) reject(result.errMsg);
          },
          complete() {
            if (loading) wx.hideNavigationBarLoading();
          }
        });
      })).catch(error => {
        this.logger.error('[Request] scc', url, error);
        this.toast('网络错误');
      });
    },
    iwut(url, loading = true) {
      if (loading) wx.showNavigationBarLoading();
      return new Promise(((resolve, reject) => {
        wx.request({
          url: 'https://test-api-iwut.itoken.team/v1/news' + url,
          method: 'GET',
          dataType: 'json',
          success(result) {
            if (result.statusCode !== 200) reject('服务器错误 ' + result.statusCode);
            else if (result.data.code === 0) resolve(result.data.data);
            else reject(result.message);
          },
          fail(result) {
            reject(result.errMsg);
          },
          complete() {
            if (loading) wx.hideNavigationBarLoading();
          }
        });
      })).catch(error => {
        this.logger.error('[Request] iwut', url, error);
        this.toast('网络错误');
      });
    }
  },
  alert(params) {
    if (typeof params === 'string') {
      params = {
        content: params
      };
    }

    return new Promise((resolve, reject) => {
      wx.showModal({
        title: params.title || '就业招聘',
        content: params.content,
        showCancel: params.showCancel || false,
        confirmColor: '#45c8dc',
        confirmText: params.confirmText || '确定',
        success: resolve,
        fail: reject,
      });
    });
  },
  confirm(params) {
    if (typeof params === 'string') {
      params = {
        content: params,
      };
    }

    params.showCancel = true;

    return this.alert(params);
  },
  toast(title, icon = 'none') {
    wx.showToast({
      title: title,
      icon,
      duration: 1500,
    });
  },
  loading(title) {
    wx.showLoading({ title });

    return wx.hideLoading;
  },
  about() {
    this.alert('Token团队出品\r\n产品&设计&开发：廖星');
  },
  async address(options) {
    const { address, name, description, latitude, longitude } = options;
    let location;

    if (latitude && longitude) {
      location = {
        latitude,
        longitude,
      };
    } else {
      const QQMap = require('./library/qqmap/jssdk.js');
      const SDK = new QQMap({
        key: 'BP7BZ-6FXRV-6CNP3-UDXK2-GJ36S-VFBN7',
      });
      const hideLoading = this.loading('获取地理位置中');

      location = await new Promise((resolve, reject) => {
        SDK.geocoder({
          address,
          success(res) {
            resolve({
              latitude: res.result.location.lat,
              longitude: res.result.location.lng,
            });
          },
          fail(res) {
            reject(res.message);
          },
          complete() {
            hideLoading();
          }
        });
      }).catch(errMsg => {
        this.alert(errMsg);
      });
    }

    this.openLocation({
      ...location,
      name,
      address: description || address,
    });
  },
  openLocation(options) {
    if (this.isQQ) {
      wx.navigateTo({
        url: this.sharePath({
          route: 'pages/common/map',
          options,
        }),
      });
    } else {
      wx.openLocation(options);
    }
  },
  get isQQ() {
    return typeof qq !== 'undefined';
  },
  sharePath(page) {
    const query = Object.entries(page.options).map(([key, value]) => {
      return `${key}=${value}`;
    });

    return '/' + page.route + '?' + query.join('&');
  },
  formatTimestamp(timestamp) {
    return dayjs(timestamp * 1000).format('YYYY-M-D');
  },
  logger() {
    return this.logger;
  },
  openURL(url) {
    wx.navigateTo({
      url: '/pages/common/webview?url=' + encodeURIComponent(url),
    });
  },
});
