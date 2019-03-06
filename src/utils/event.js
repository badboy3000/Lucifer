export default new class {
  constructor() {
    this.all = {}
  }

  on(type, handler) {
    console.log('[event bus on]', type)
    if (!this.all[type]) {
      this.all[type] = []
    }
    this.all[type].push(handler)
  }

  off(type, handler) {
    console.log('[event bus off]', type)
    if (this.all[type]) {
      if (handler) {
        this.all[type].splice(this.all[type].indexOf(handler) >>> 0, 1)
      } else {
        this.all[type] = []
      }
    }
  }

  emit(type, ...args) {
    console.log('[event bus emit]', type)
    ;(this.all[type] || []).map(handler => {
      handler(...args)
    })
  }
}()
