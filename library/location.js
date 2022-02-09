const { alert, loading } = require('./ui');
const utils = require('./utils');

async function getAddress(options) {
  const { address, name, description, latitude, longitude } = options;
  let location;

  if (latitude && longitude) {
    location = {
      latitude,
      longitude,
    };
  } else {
    const QQMap = require('./qqmap');
    const SDK = new QQMap({
      key: 'BP7BZ-6FXRV-6CNP3-UDXK2-GJ36S-VFBN7',
    });
    const hideLoading = loading('获取地理位置中');

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
      alert(errMsg);
    });
  }

  openLocation({
    ...location,
    name,
    address: description || address,
  });
}

function openLocation(options) {
  if (utils.isQQ) {
    wx.navigateTo({
      url: utils.sharePath({
        route: 'pages/common/map',
        options,
      }),
    });
  } else {
    wx.openLocation(options);
  }
}

module.exports = {
  getAddress,
  openLocation,
};
