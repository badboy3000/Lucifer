export default new class {
  info(tips) {
    this.hide()
    wx.showToast({
      title: tips,
      icon: 'none',
      duration: 2000
    })
  }

  success(tips) {
    this.hide()
    wx.showToast({
      title: tips,
      icon: 'success',
      duration: 2000
    })
  }

  loading(tips = '加载中…') {
    this.hide()
    wx.showLoading({
      title: tips
    })
  }

  hide() {
    wx.hideLoading()
    wx.hideToast()
  }
}()
