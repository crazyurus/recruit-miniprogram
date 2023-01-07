import QQMap from './map';
import { alert, loading } from './ui';
import { isQQ, sharePath } from './utils';

async function getAddress(options) {
  const { address, name, description, latitude, longitude } = options;
  let location;

  if (latitude && longitude) {
    location = {
      latitude,
      longitude,
    };
  } else {
    const SDK = new QQMap({
      key: 'BP7BZ-6FXRV-6CNP3-UDXK2-GJ36S-VFBN7',
    });
    const hideLoading = loading('获取地理位置中');

    try {
      const response = await SDK.geocoder({
        address,
      });

      location = {
        latitude: response.result.location.lat,
        longitude: response.result.location.lng,
      };

    } catch (error) {
      alert(error.message);
    }

  hideLoading();
  }

  if (location) {
    openLocation({
      ...location,
      name,
      address: description || address,
    });
  }
}

function openLocation(options) {
  if (isQQ()) {
    wx.navigateTo({
      url: sharePath({
        route: 'pages/common/map',
        options,
      }),
    });
  } else {
    wx.openLocation(options);
  }
}

export {
  getAddress,
  openLocation,
};
