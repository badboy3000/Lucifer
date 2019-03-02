export default new class {
  resize(url, options = {}){
    if (!url) {
      return ''
    }

    if (/imageMogr2/.test(url)) {
      return url
    }

    const link = /^http/.test(url) ? url : `https://image.calibur.tv/${url}`

    const format = '/format/png'
    const mode = options.mode === undefined ? 1 : options.mode

    if (
      (mode === 1 && !options.width) ||
      (!options.width && !options.height)
    ) {
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
}()
