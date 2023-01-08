import { toast } from '../../libs/ui';

Page({
  data: {
    url: '',
  },
  onLoad(options) {
    this.setData({
      url: decodeURIComponent(options.url)
    });
  },
  onShareAppMessage() {
    return {
      success() {
        toast.success('分享成功');
      }
    };
  }
})