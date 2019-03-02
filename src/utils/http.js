import Fly from 'flyio/dist/npm/wx'
import cache from '~/utils/cache'

const isProd = process.env.NODE_ENV === 'production'
const fly = new Fly()

fly.interceptors.request.use(request => {
  request.baseURL = isProd ? 'https://api.calibur.tv/' : 'http://localhost:3099/'
  request.headers['Accept'] = 'application/x.api.latest+json'
  request.headers['Authorization'] = `Bearer ${cache.get('JWT_TOKEN')}`
  request.timeout = 10000
  return request
})

fly.interceptors.response.use(
  res => {
    if (res.request.url === 'door/refresh_token') {
      const token = res.headers.authorization[0].split(' ')[1]
      cache.set('JWT-TOKEN', token)
    }
    return res.data.data
  },
  err => {
    const code = err.status
    if (!err.response) {
      return Promise.reject({
        code,
        message: `网路请求失败！${err.message}`
      })
    }
    if (code === 0) {
      return Promise.reject({
        code,
        message: '网络错误，请刷新网页重试！'
      })
    }
    if (code === 1) {
      return Promise.reject({
        code,
        message: '网路请求超时，请稍候再试！'
      })
    }
    const { message } = err.response.data
    if (typeof message === 'string') {
      return Promise.reject({
        code,
        message
      })
    }
    return Promise.reject({
      code,
      message: message[Object.keys(message)[0]][0]
    })
  }
)

export default fly
