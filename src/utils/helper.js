import { format } from 'timeago.js'
import cache from '~/utils/cache'

export default new class {
  resize(url, options = {}) {
    if (!url) {
      return ''
    }

    if (/imageMogr2/.test(url)) {
      return url
    }

    const link = /^http/.test(url) ? url : `https://image.calibur.tv/${url}`

    const format = '/format/png'
    const mode = options.mode === undefined ? 1 : options.mode

    if ((mode === 1 && !options.width) || (!options.width && !options.height)) {
      return `${link}?imageMogr2/auto-orient/strip${format}`
    }

    let width
    let height

    if (mode === 1) {
      width = `/w/${options.width}`
      height = options.height ? `/h/${options.height}` : `/h/${options.width}`
    } else {
      width = options.width ? `/w/${options.width}` : ''
      height = options.height ? `/h/${options.height}` : ''
    }

    return `${link}?imageMogr2/auto-orient/strip|imageView2/${mode}${width}${height}${format}`
  }

  number(num) {
    return num > 1000 ? `${Math.floor((num / 1000) * 10) / 10}k` : num
  }

  time(time) {
    const formatTime = /^\d+$/.test(time)
      ? time.toString().length === 13
        ? parseInt((time - 0) / 1000, 10)
        : time * 1000
      : time.replace(/-/g, '/')
    const date = new Date(formatTime)
    return `${date.getFullYear()}-${`0${date.getMonth() + 1}`.substr(
      -2
    )}-${`0${date.getDate()}`.substr(-2)} ${`0${date.getHours()}`.substr(
      -2
    )}:${`0${date.getMinutes()}`.substr(-2)}:${`0${date.getSeconds()}`.substr(
      -2
    )}`
  }

  ago(time) {
    return format(time, 'zh_CN')
  }

  share({ title, desc, link, image } = {}) {
    const getQueryString = (url, params = {}) => {
      const arr = []
      Object.keys(params).forEach(key => {
        arr.push(`${key}=${params[key]}`)
      })
      return arr.length > 0 ? `${url}?${arr.join('&')}` : url
    }

    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    let path = getQueryString(page.route, page.options)
    if (link && /\?/.test(link)) {
      const tail = link.split('?')[1]
      if (/\?/.test(path)) {
        path = `${path}&${tail}`
      } else {
        path = `${path}?${tail}`
      }
    }

    const imageUrl = image
      ? image.replace('share120jpg', 'sharewxapp')
      : 'https://image.calibur.tv/owner/image/icon-1024.png-sharewxapp'

    return {
      title: title || '二次元股市',
      path,
      imageUrl
    }
  }

  webview(url) {
    let result
    const user = cache.get('USER', null)
    const token = !user ? '' : cache.get('JWT-TOKEN', '')
    const link = /\?/.test(url) ? '&' : '?'
    result = `${url}${link}token=${token}&from=wxapp`
    const isProd = process.env.NODE_ENV === 'production'

    if (!/^http/.test(url)) {
      result = `${
        isProd ? 'https://m.calibur.tv' : 'http://localhost:3001'
      }/${result}`
    }

    return result
  }
}()
