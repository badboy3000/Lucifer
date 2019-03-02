import { includes } from 'lodash'

export default new class {
  constructor() {
    this.all = {}
  }

  on(type, handler) {
    if (!this.all[type]) {
      this.all[type] = []
    }
    if (!includes(this.all[type], handler)) {
      this.all[type].push(handler)
    }
  }

  off(type, handler) {
    if (this.all[type]) {
      this.all[type].splice(this.all[type].indexOf(handler) >>> 0, 1)
    }
  }

  emit(type, ...args) {
    ;(this.all[type] || []).map(handler => {
      handler(...args)
    })
  }

  // 清除之前绑定的所有事件
  clear(type) {
    type ? (this.all[type] = []) : (this.all = {})
  }
}()
