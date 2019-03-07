export default new class {
  info(tips) {
    this.stop()
    wx.showToast({
      title: tips,
      icon: 'none',
      duration: 2000
    })
  }

  success(tips) {
    this.stop()
    wx.showToast({
      title: tips,
      icon: 'success',
      duration: 2000
    })
  }

  loading(tips = '加载中…') {
    this.stop()
    wx.showLoading({
      title: tips
    })
  }

  stop() {
    wx.hideLoading()
    wx.hideToast()
  }
}()
