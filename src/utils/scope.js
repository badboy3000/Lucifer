export default new class {
  has(scope) {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          if (res.authSetting[`scope.${scope}`]) {
            resolve()
          } else {
            reject()
          }
        },
        fail() {
          return reject()
        }
      })
    })
  }

  get(scope) {
    return new Promise((resolve, reject) => {
      this.has(scope)
        .then(() => resolve())
        .catch(() => {
          wx.authorize({
            scope: `scope.${scope}`,
            success() {
              resolve()
            },
            fail() {
              reject()
            }
          })
        })
    })
  }
}()
