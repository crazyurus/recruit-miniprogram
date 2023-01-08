function alert(params) {
  if (typeof params === 'string') {
    params = {
      content: params
    };
  }

  return wx.promises.showModal({
    title: params.title || '就业招聘',
    content: params.content,
    showCancel: params.showCancel || false,
    confirmColor: '#45c8dc',
    confirmText: params.confirmText || '确定',
  });
}

function confirm(params) {
  if (typeof params === 'string') {
    params = {
      content: params,
    };
  }

  params.showCancel = true;

  return alert(params);
}

function toast(title, icon = 'none') {
  wx.showToast({
    title: title,
    icon,
    duration: 1500,
  });

  return wx.hideToast;
}

function toastSuccess(title) {
  return toast(title, 'success');
}

function toastFail(title) {
  return toast(title, 'error');
}

toast.success = toastSuccess;
toast.fail = toastFail;

function loading(title) {
  wx.showLoading({ title });

  return wx.hideLoading;
}

export {
  alert,
  confirm,
  toast,
  loading,
};
