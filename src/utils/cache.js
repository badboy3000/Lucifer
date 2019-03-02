const globalData = {};

export default new class {
  set(key, data) {
    try {
      wx.setStorageSync(key, data);
    } catch (e) {
      wx.setStorage({ key, data });
    }
    globalData[key] = data;
  };

  get(key, def = undefined) {
    const result = globalData[key];
    if (result !== undefined) {
      return result;
    }
    try {
      const value = wx.getStorageSync(key);
      if (value === '') {
        return def;
      }
      return value;
    } catch (e) {
      return def;
    }
  };

  remove(key) {
    try {
      wx.removeStorageSync(key);
    } catch (e) {
      wx.removeStorage({ key });
    }
    delete globalData[key];
  };

  clear() {
    try {
      wx.clearStorageSync();
    } catch (e) {
      wx.clearStorage();
    }
    Object.keys(globalData).forEach(key => {
      delete globalData[key];
    });
  };
}()
