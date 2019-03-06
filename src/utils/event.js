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
      this.all[type].splice(this.all[type].indexOf(handler) >>> 0, 1)
    }
  }

  emit(type, ...args) {
    console.log('[event bus emit]', type)
    ;(this.all[type] || []).map(handler => {
      handler(...args)
    })
  }

  // 清除之前绑定的所有事件
  clear(type) {
    console.log('[event bus clear]', type || 'ALL EVENTS')
    type ? (this.all[type] = []) : (this.all = {})
  }
}()
