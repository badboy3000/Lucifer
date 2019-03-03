import cache from '~/utils/cache'
import event from '~/utils/event'
import toast from '~/utils/toast'
import { merge } from 'lodash'

export default new class {
  updateUserInfo(obj) {
    const user = cache.get('USER')
    if (!user) {
      return
    }
    cache.set('USER', merge(user, obj))
    event.emit('update-user')
  }

  updateUserExp({ exp, message }, info = {}) {
    const user = cache.get('USER')
    if (!user) {
      return
    }
    const { level, have_exp, next_level_exp } = user.exp
    let newLevel, newExp, newTotal
    if (have_exp + exp >= next_level_exp) {
      newLevel = level + 1
      newExp = have_exp + exp - next_level_exp
      newTotal = newLevel * (newLevel + 10)
    } else {
      newLevel = level
      newExp = have_exp + exp
      newTotal = next_level_exp
    }
    this.updateUserInfo({
      ...info,
      exp: {
        level: newLevel,
        have_exp: newExp,
        next_level_exp: newTotal
      }
    })
    toast.info(message)
  }
}()
